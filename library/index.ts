import { AllDom, DomItem, Rule, Callback } from "./index-type";
import { DirectiveOptions, DirectiveFunction } from "vue";
import { isEmpty, addErrorDom, removeErrorDom } from './utils'
const allDom: AllDom = {
  default: [],
};
/**
 * 查找元素的数据
 * @param element 
 * @param prop 储存的字段
 * @returns index索引 data指令bind的内容
 */
const findElement = (
  element: Element,
  prop = "default"
): { index: number; data?: DomItem } => {
  let index = -1;
  let data;
  if (allDom[prop] === undefined) return { index: -1 };
  allDom[prop].some((item, inx) => {
    if (item.element === element) {
      index = inx;
      data = item;
      return true;
    }
    return false;
  });
  return { index, data };
};


/**
 * 规则验证
 * @param rule 规则
 * @param value 值
 * @returns 
 */
const ruleFn = (rule: Rule, value: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    // debugger
    if (rule.required) {
      if (isEmpty(value)) {
        reject(rule.message || "");
      }
    } else if (rule.max || rule.min) {
      if (rule.min && value.length < rule.min) {
        reject(rule.message || "");
      }
      if (rule.max && value.length > rule.max) {
        reject(rule.message || "");
      }
    } else if (rule.validator) {
      const callback: Callback = (error) => {
        if (Object.prototype.toString.call(error) === "[object Error]") {
          reject((error as Error).message);
        } else if (typeof error === "string" && error.length) {
          reject(error || "");
        } else {
          reject('');
        }
      };
      rule.validator(rule, value, callback);
    }
    resolve();
  });
};

/**
 * 多规则验证
 * @param rules 
 * @param value 
 * @returns 
 */
const rulesForEach = async (rules: Rule[], value: any) => {
  let errorMessage = "";

  for (const rule of rules) {
    try {
      await ruleFn(rule, value);
    } catch (error) {
      errorMessage = error;
      break;
    }
  }

  return {
    valid: !errorMessage,
    message: errorMessage,
  };
};

const validateItem = async (el: Element, rules: Rule[], value: any) => {
  const { valid, message } = await rulesForEach(rules, value);
  if (valid) {
    removeErrorDom(el);
  } else {
    addErrorDom(el, message);
  }
  return valid;
};

/**
 * 触发验证方式
 * @param el 
 * @param prop 
 * @param triggerEvent blur change
 */
export const triggerFn = async (
  el: Element,
  prop: string,
  triggerEvent: string
) => {
  const { data } = findElement(el, prop);
  if (data) {
    const { value, rules } = data;
    for (const rule of rules) {
      let { trigger = "blur" } = rule;
      if (typeof trigger === "string") {
        trigger = [trigger];
      }

      if (Array.isArray(trigger) && trigger.includes(triggerEvent)) {
        const valid = await validateItem(el, [rule], value);
        if (!valid) break;
      }
    }
  }
};

const bindEvent = (
  el: Element,
  fn: (...all: any[]) => any,
  trigger = "blur"
) => {
  if (typeof trigger === "string") {
    el.addEventListener(trigger, fn, true);
  }
};

const unbindEvent = (
  el: Element,
  fn: (...all: any[]) => any,
  trigger = "blur"
) => {
  if (typeof trigger === "string") {
    el.removeEventListener(trigger, fn, true);
  }
};

const bind: DirectiveFunction = (element, binding) => {
  const bindValue = binding.value;
  const prop = bindValue.prop || "default";
  const rules = bindValue.rules || [];
  const value = bindValue.value;

  if (allDom[prop] === undefined) allDom[prop] = [];
  allDom[prop].push({ element, rules, value });

  bindEvent(element, triggerFn.bind(this, element, prop, "blur"), "blur");
};
const unbind: DirectiveFunction = (element, binding) => {
  const bindValue = binding.value;
  const prop = bindValue.prop || "default";
  if (allDom[prop] === undefined) return;
  const { index } = findElement(element, prop);
  if (index !== -1) {
    allDom[prop].splice(index, 1);
  }

  unbindEvent(element, triggerFn, "blur");
};

const update: DirectiveFunction = async (el, binding) => {
  /**
   * 所在组件的 VNode 更新时调用，
   * 但是可能发生在其子 VNode 更新之前。
   * 指令的值可能发生了改变，也可能没有。
   * 但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
   */
  const bindValue = binding.value;
  const value = bindValue.value;
  const prop = bindValue.prop || "default";

  const oldBindValue = binding.oldValue;
  const oldValue = oldBindValue.value;

  if (JSON.stringify(oldValue) !== JSON.stringify(value)) {
    // 更新数据
    const { data } = findElement(el, prop);
    if (data) {
      data.value = value;
    }
    try {
      await triggerFn(el, prop, "change");
    } catch (error) {
      console.error(error);
    }
  }
};

export const validateDirective: DirectiveOptions = {
  bind,
  update,
  unbind,
};

export const validate = async (prop = "default", el = ".el-main") => {
  if (!(allDom[prop] && Array.isArray(allDom[prop]))) return true;
  let validRes = true;
  let firstErrDom: Element | null = null;
  const proArr: Promise<void>[] = [];

  const proFn = async (item: DomItem) => {
    const { rules, value, element } = item;
    const { valid, message } = await rulesForEach(rules, value);
    
    if (valid) {
      removeErrorDom(element);
    } else {
      if (firstErrDom === null) {
        validRes = false;
        firstErrDom = element;
      }
      addErrorDom(element, message);
    }
  };
  allDom[prop].forEach((item) => {
    proArr.push(proFn(item));
  });
  try {
    await Promise.all(proArr);
    if (firstErrDom) {
      const scrollBox = document.querySelector(el);
      if (scrollBox && (firstErrDom as Element).getBoundingClientRect) {
        const {
          top,
          height,
        } = (firstErrDom as Element).getBoundingClientRect();
        scrollBox.scrollTop = scrollBox.scrollTop + top - height - 260;
      }
    }
  } catch (error) {
    // error
  }

  return {valid: validRes};
};

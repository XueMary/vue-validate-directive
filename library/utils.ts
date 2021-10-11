export const isEmpty = (value: any) => {
  return (
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "number" && Number.isNaN(value)) ||
    value === "" ||
    value === null ||
    value === undefined
  );
};


const getErrorDom = (el: Element):Element|null => {
  const errorDoms = el.getElementsByClassName("validate-error-tip-text");
  if (errorDoms.length) {
    return errorDoms[0];
  }
  return null;
};

export const addErrorDom = (el: Element, message: string) => {
  el.classList.add("validate-error-tip");
  const errDom = getErrorDom(el)
  if (errDom === null) {
    const errorDom = document.createElement("div");
    errorDom.textContent = message;
    errorDom.classList.add("validate-error-tip-text");
    el.append(errorDom);
  } else {
    errDom.textContent = message
  }
};

export const removeErrorDom = (el: Element) => {
  el.classList.remove("validate-error-tip");
  const errorDoms = el.getElementsByClassName("validate-error-tip-text");
  if (errorDoms.length) {
    for (let i = 0; i < errorDoms.length; i++) {
      const dom = errorDoms[i];
      el.removeChild(dom);
    }
  }
};
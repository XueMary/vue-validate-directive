<template>
  <div>
    <span
      style="position: relative"
      v-validate="{
        value: inputValue,
        rules: [
          { required: true, message: '请输入活动名称', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] },
          { validator: validatePass, trigger: ['blur', 'change'] },
        ],
      }"
    >
      <input class="input" type="text" v-model="inputValue" />
    </span>
    <button class="btn" @click="validateFn">validate</button>
  </div>
</template>

<script>
import {validateDirective,validate} from '../../library/index'
import '../../library/validate.css'
export default {
  directives: {
    validate: validateDirective
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    validateFn() {
      validate()
    },
    validatePass(rule, value, callback) {
      if(Number.isNaN(Number(value))) {
        callback('请输入数字类型');
      } else {
        callback()
      }
    },
  },
};
</script>

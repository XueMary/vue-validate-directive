<template>
  <div>
    <span
      class="form1"
      style="position: relative"
      v-validate="{
        value: inputValue,
        rules: [
          { required: true, message: '请输入活动名称', trigger: ['blur', 'change'] },
        ],
      }"
    >
      <input class="input" type="text" v-model="inputValue" />
    </span>
    <button class="btn" @click="validateFn('default')">validate</button>
    <span
      class="form2"
      style="position: relative"
      v-validate="{
        value: inputValue2,
        prop: 'tow',
        rules: [
          { required: true, message: '请输入活动名称2', trigger: ['blur', 'change'] },
        ],
      }"
    >
      <input class="input2" type="text" v-model="inputValue2" />
    </span>
    <button class="btn2" @click="validateFn('tow')">validate</button>
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
      inputValue2: "",
    };
  },
  methods: {
    validateFn(prop) {
      validate({prop})
    },
  },
};
</script>

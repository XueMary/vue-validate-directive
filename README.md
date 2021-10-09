# vue-validate-directive

## 描述

vue 自定义指令 数据验证 

## 为什么选择指令, 而不是组件库的form

- 在实际开发中有可能遇到 table中需要带输入框， 这时候form难以与table很好的融合

- 遇到长编辑列表， 比如商品编辑， 商品编辑这样长编辑列表，element的组件库， 报错并不提供定位服务， 如果报错在视图外， 就让人很懵逼。于是我们添加了自动滚动定位


## 使用use

1. 引入
```
// main.js

import {validateDirective, validateSubmit} from 'vue-validate-directive'
import 'vue-validate-directive/dist/validate.css'
Vue.directive('validate', validateDirective)
Vue.prototype.$validate = validateSubmit
```

2. 基础示例 
``` 
// index.vue

<template>
  <input v-model="a" v-validate="{value: a, rules: [
    { required: true, message: '请输入活动名称'},
    { min: 3, max: 5, message: '长度在 3 到 5 个字', trigger: 'change' },
    { validator: validatePass, trigger: ['blur', 'change'] },
  ] }">
</template>

<script>
export default {
  data() {
    return {
      a: ''
    }
  },
  methods: {
    validatePass(rule, value, callback) {
      if(Number.isNaN(Number(value))) {
        callback('请输入数字类型');
      } else {
        callback()
      }
    },
  }
}
</script>
```


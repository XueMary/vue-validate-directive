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

import {validateDirective, validate} from 'vue-validate-directive'
import 'vue-validate-directive/dist/validate.css'
Vue.directive('validate', validateDirective)
Vue.prototype.$validate = validate
```

2. 基础示例 
``` 
// index.vue

<template>
  <div>
    <div style="position: relative;" v-validate="{value: a, rules: [
        { required: true, message: '请输入活动名称'},
        { min: 3, max: 5, message: '长度在 3 到 5 个字', trigger: 'change' },
        { validator: validatePass, trigger: ['blur', 'change'] },
      ] }">
      <input v-model="a">
    </div>
    <button @click="handleValidate">验证</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      a: ''
    }
  },
  methods: {
    handleValidate() {
      this.$validate().then({valid}=>{
        if(valid){
          console.log('成功')
        } else {
          console.log('失败')
        }
      })
    },
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

## 多表单示例
```
<div>
  <div style="position: relative;" v-validate="{value: a, rules: [
      { required: true, message: '请输入活动名称'},
    ] }">
    <input v-model="a">
  </div>
  <button @click="handleValidate('default')">验证</button>

  <div style="position: relative;" v-validate="{value: a, prop: 'two' rules: [
      { required: true, message: '请输入活动名称'},
    ] }">
    <input v-model="a">
  </div>
  <button @click="handleValidate('two')">验证</button>
</div>


handleValidate(prop) {
  this.$validate({prop}).then({valid}=>{
    if(valid){
      console.log('成功')
    } else {
      console.log('失败')
    }
  })
},
```

## 注意事项

1. 验证后错误信息会存放在当前元素的子级中， input元素不能有子元素。 所以v-validate不能直接绑定在不能创建子元素的element上， 一些组件库的 el-input是可以直接绑定的， 因为他们已经自带包了一层了

2. 验证错误信息是通过定位来确定位置的， 所以需要给v-validate的元素添加定位使错误信息在正确的位置


### validate 介绍


1. 入参 {prop, el}
    - prop: 默认值default，用于区分单个页面有多个表单
    - el: 默认值el-main，错误滚动定位容器



import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Form from '@/components/Form.vue'

describe('validate blur', () => {
  it('blur', async() => {
    const wrapper = shallowMount(Form)
    const vm = wrapper.vm

    vm.$data.inputValue = 'xx'
    await flushPromises()
    let errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('长度在 3 到 5 个字符')


    vm.$data.inputValue = 'xxx'
    await flushPromises()
    errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('请输入数字类型')

    vm.$destroy()
  })
})

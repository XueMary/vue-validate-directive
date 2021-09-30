import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Form from '@/components/Form.vue'

describe('validate blur', () => {
  it('blur', async() => {
    const wrapper = shallowMount(Form)
    const vm = wrapper.vm
    const input = wrapper.find('.input')

    input.trigger('blur')
    await flushPromises()
    let errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('请输入活动名称')

    vm.$data.inputValue = 'xx'
    await flushPromises()
    
    input.trigger('blur')
    await flushPromises()
    errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('长度在 3 到 5 个字符')


    vm.$data.inputValue = 'xxx'
    await flushPromises()
    input.trigger('blur')
    await flushPromises()
    errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('请输入数字类型')

    vm.$destroy()
  })
})

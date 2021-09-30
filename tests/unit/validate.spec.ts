import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Form from '@/components/Form.vue'

describe('validate submit', () => {
  it('required', async() => {
    const wrapper = shallowMount(Form)
    const btn = wrapper.find('.btn')
    btn.trigger('click')
    await flushPromises()
    const errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('请输入活动名称')
    wrapper.vm.$destroy()
  })
  it('min max', async() => {
    const wrapper = shallowMount(Form)
    const vm = wrapper.vm
    vm.$data.inputValue = '2'
    await flushPromises()
    const btn = wrapper.find('.btn')
    btn.trigger('click')
    await flushPromises()
    let errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('长度在 3 到 5 个字符')


    vm.$data.inputValue = '222'
    await flushPromises()
    btn.trigger('click')
    await flushPromises()
    errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.exists()).toBe(false)


    vm.$data.inputValue = '22233333'
    await flushPromises()
    btn.trigger('click')
    await flushPromises()
    errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('长度在 3 到 5 个字符')

    vm.$data.inputValue = '22233'
    await flushPromises()
    btn.trigger('click')
    await flushPromises()
    errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.exists()).toBe(false)

    vm.$destroy()
  })

  it('validator', async() => {
    const wrapper = shallowMount(Form)
    const vm = wrapper.vm
    vm.$data.inputValue = 'xx'
    await flushPromises()
    const btn = wrapper.find('.btn')
    btn.trigger('click')
    await flushPromises()
    let errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('长度在 3 到 5 个字符')


    vm.$data.inputValue = 'xxx'
    await flushPromises()
    btn.trigger('click')
    await flushPromises()
    errWrap = wrapper.find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('请输入数字类型')

    vm.$destroy()
  })
})

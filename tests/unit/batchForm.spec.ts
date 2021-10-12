import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Form from '@/components/Batch.vue'

describe('validate submit', () => {
  it('required', async() => {
    const wrapper = shallowMount(Form)
    const btn = wrapper.find('.btn')
    btn.trigger('click')
    await flushPromises()
    const errWrap = wrapper.find('.form1').find('.validate-error-tip-text')
    expect(errWrap.text()).toMatch('请输入活动名称')

    let errWrap2 = wrapper.find('.form2').find('.validate-error-tip-text')
    expect(errWrap2.exists()).toBe(false)

    const btn2 = wrapper.find('.btn2')
    btn2.trigger('click')
    await flushPromises()
    errWrap2 = wrapper.find('.form2').find('.validate-error-tip-text')
    expect(errWrap2.text()).toMatch('请输入活动名称2')
    wrapper.vm.$destroy()
  })
})

import { shallowMount } from '@vue/test-utils'
import LText from '../../src/components/LText'
import { textDefaultProps } from '@/defaultProps'

describe('LText.vue', () => {
  const { location } = window
  // location是浏览器原生属性，jsdom中不存在，需要手动mock
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' }
    })
  })
  afterEach(() => {
    window.location = location
  })
  it('default LText render', () => {
    const msg = 'test'
    const props = {
      ...textDefaultProps,
      text: msg
    }
    const wrapper = shallowMount(LText, { props })
    // 展示文字应该正确
    expect(wrapper.text()).toBe(msg)
    // 标签应该为div
    expect(wrapper.element.tagName).toBe('DIV')
    // 应该存在部分css属性，如：font-size
    const style = wrapper.attributes().style
    expect(style.includes('font-size')).toBeTruthy()
    // 部分属性应该被过滤，如：actionType
    expect(style.includes('actionType')).toBeFalsy()
  })
  it('LText with actionType and URL should trigger location href change', async () => {
    const props = {
      ...textDefaultProps,
      actionType: 'url',
      url: 'http://dummy.url',
      tag: 'h2'
    }
    const wrapper = shallowMount(LText, { props })
    // 标签应该为 h2
    expect(wrapper.element.tagName).toBe('H2')
    await wrapper.trigger('click')
    // 调整链接应该被修改
    expect(window.location.href).toBe('http://dummy.url')
  })
  it('LText with isEditing should not trigger location change', async () => {
    const props = {
      ...textDefaultProps,
      actionType: 'url',
      url: 'http://dummy.url',
      tag: 'h2',
      isEditing: true
    }
    const wrapper = shallowMount(LText, { props })
    await wrapper.trigger('click')
    // 设置了isEditing，调整链接不应该被修改
    expect(window.location.href).not.toBe('http://dummy.url')
  })
})

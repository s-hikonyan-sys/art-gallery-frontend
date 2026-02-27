import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../../src/components/Footer.vue'

describe('Footer', () => {
  it('renders footer content', () => {
    const wrapper = mount(Footer)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('has correct component name', () => {
    const wrapper = mount(Footer)
    expect(wrapper.vm.$options.name).toBe('Footer')
  })
})


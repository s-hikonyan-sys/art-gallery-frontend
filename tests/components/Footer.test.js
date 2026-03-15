import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from '../../src/components/Footer.vue'

describe('AppFooter', () => {
  it('renders footer content', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('has correct component name', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.vm.$options.name).toBe('AppFooter')
  })
})

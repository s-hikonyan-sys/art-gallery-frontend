import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Header from '../../src/components/Header.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/gallery', component: { template: '<div>Gallery</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } },
    { path: '/contact', component: { template: '<div>Contact</div>' } }
  ]
})

describe('Header', () => {
  it('renders the logo', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.text()).toContain('油絵ギャラリー')
  })

  it('renders navigation links', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.text()).toContain('ホーム')
    expect(wrapper.text()).toContain('作品一覧')
    expect(wrapper.text()).toContain('アーティストについて')
    expect(wrapper.text()).toContain('お問い合わせ')
  })

  it('has correct component name', () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.vm.$options.name).toBe('Header')
  })
})


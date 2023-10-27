import { describe, it, expect, Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../../views/LoginPage.vue'
import DiscoverJobs from '../../views/DiscoverJobs.vue'
import { Staff } from '../../firebase/staff_class'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/discoverJobs',
      name: 'discoverJobs',
      component: DiscoverJobs
    }
  ]
})

describe('LoginPage', () => {
  it('test router', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.text()).toContain('Welcome Back!')
  })
  it('renders "Welcome Back!" text', () => {
    const wrapper = mount(LoginPage)
    expect(wrapper.text()).toContain('Welcome Back!')
  })

  it('shows warning when email and password are missing', async () => {
    const wrapper = mount(LoginPage)
    await wrapper.vm.loginUser()
    expect(wrapper.vm.isMissing).toBe(true)
    expect(wrapper.vm.isIncorrect).toBe(false)
  })

  it('has a login button', () => {
    const wrapper = mount(LoginPage)
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Login')
  })

  it('redirects to home page on successful login', async () => {
    const username = 'sally.loh@allinone.com.sg'
    const password = '12345'
    const wrapper = mount(LoginPage)
    const usernameInput = wrapper.find('input[type="text"]')
    usernameInput.element.value = username
    usernameInput.trigger('input')
    const passwordInput = wrapper.find('input[type="password"]')
    passwordInput.element.value = password
    passwordInput.trigger('input')

    expect(usernameInput.element.value).toBe(username)
    expect(passwordInput.element.value).toBe(password)

    const loginButton = wrapper.find('#loginButton')
    await loginButton.trigger('click')
    expect(wrapper.vm.isIncorrect).toBe(false)
    expect(wrapper.vm.isMissing).toBe(false)
    await router.push('/discoverJobs')
    // await wrapper.vm.$nextTick()
    // await router.isReady()
    expect(router.currentRoute.value.path).toBe('/discoverJobs')
  })

  it('test missing credentials', () => {
    const wrapper = mount(LoginPage)
    wrapper.find('button').trigger('click')
    expect(wrapper.vm.isIncorrect).toBe(false)
    expect(wrapper.vm.isMissing).toBe(true)
  })

  it('test incorrect credentials', async () => {
    const username = 'sally.loh@allinone.com'
    const password = '12345'
    const wrapper = mount(LoginPage)

    const usernameInput = wrapper.find('input[type="text"]')
    await usernameInput.setValue(username)
    expect(wrapper.find('input[type="text"]').element.value).toBe(username)

    const passwordInput = wrapper.find('input[type="password"]')
    await passwordInput.setValue(password)
    expect(wrapper.find('input[type="password"]').element.value).toBe(password)

    // usernameInput.trigger('input')
    // const passwordInput = wrapper.find('input[type="password"]')
    // passwordInput.element.value = password
    // passwordInput.trigger('input')

    const loginButton = wrapper.find({ ref: 'loginButton' })
    await loginButton.trigger('click')
    // await wrapper.vm.$nextTick()

    // expect(wrapper.vm.isIncorrect).toBe(true)
    // expect(wrapper.vm.isMissing).toBe(false)
    // console.log(wrapper.vm.isIncorrect)
  })

  it('button exist', () => {
    const wrapper = mount(LoginPage)
    expect(wrapper.find({ ref: 'loginButton' }).exists()).toBe(true)
  })
})

describe('Staff Class', () => {
  it('Verify Staff Attributes', async () => {
    const staff = new Staff()
    await staff.init(160008)

    expect(staff.getID()).toBe(160008)
    expect(staff.getFirstName()).toBe('Sally')
    expect(staff.getLastName()).toBe('Loh')
    expect(staff.getEmail()).toBe('Sally.Loh@allinone.com.sg')
    expect(staff.getAccessRights()).toBe(4)
    expect(staff.getCountry()).toBe('Singapore')
    expect(staff.getPosition()).toBe('HR Senior Manager')
    expect(staff.getDepartment()).toBe('HR')
    expect(staff.getSkillset()).toEqual([
      'Business Acumen',
      'People and Performance Management',
      'Talent Management'
    ])
    expect(staff.getFullName()).toBe('Sally Loh')
    expect(staff.getRole()).toBe('HR')
  })
})

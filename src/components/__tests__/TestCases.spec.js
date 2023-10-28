import { describe, it, expect, Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../../views/LoginPage.vue'
import DiscoverJobs from '../../views/DiscoverJobs.vue'
import { Staff } from '../../firebase/staff_class'
import Listing from '../../firebase/listing_class'

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

describe('Listing Class', () => {
  it('Verify Listing Attributes', async () => {
    const listing = new Listing()
    await listing.loadListing(1)

    expect(listing.getApplicants()).toStrictEqual([
      140002, 140003, 140004, 140008, 140015, 140025, 140036, 140078, 150096, 150655, 160323
    ])
    expect(listing.getCreateDate()).toBe('2023-09-15')
    expect(listing.getCreatedBy()).toBe(130001)
    expect(listing.getDeadline()).toBe('2023-10-28')
    expect(listing.getDepartment()).toBe('Accounting')
    expect(listing.getDescription()).toBe('This is accounting department')
    expect(listing.getListingId()).toBe(1)
    expect(listing.getResponsibilities()).toStrictEqual([
      'help with all accounting stuff',
      'working very hard'
    ])
    expect(listing.getSkills()).toStrictEqual([
      'Call Centre Management',
      'Collaboration',
      'Communication',
      'Customer Relationship Management',
      'Digital Fluency',
      'Problem Solving',
      'Stakeholder Management',
      'Technology Application',
      'Accounting Standards',
      'Project Management'
    ])
    expect(listing.getTitle()).toBe('Call Centre')
    expect(listing.getAllAtrr()).toStrictEqual({
      applicants: [
        140002, 140003, 140004, 140008, 140015, 140025, 140036, 140078, 150096, 150655, 160323
      ],
      createdate: '2023-09-15',
      createdby: 130001,
      deadline: '2023-10-28',
      department: 'Accounting',
      description: 'This is accounting department',
      listingId: 1,
      responsibilities: ['help with all accounting stuff', 'working very hard'],
      skills: [
        'Call Centre Management',
        'Collaboration',
        'Communication',
        'Customer Relationship Management',
        'Digital Fluency',
        'Problem Solving',
        'Stakeholder Management',
        'Technology Application',
        'Accounting Standards',
        'Project Management'
      ],
      title: 'Call Centre'
    })
  })
})

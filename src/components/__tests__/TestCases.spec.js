import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../../views/LoginPage.vue'
import DiscoverJobs from '../../views/DiscoverJobs.vue'
import { Staff, HRStaff } from '../../firebase/staff_class'
import Listing from '../../firebase/listing_class'
import {
  testCaseAddFakeListing,
  deleteListing,
  individualListingData
} from '../../firebase/CRUD_database'

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

/**
 * BACK-END TESTING
 **/

// Test the Staff Class
describe('Staff Class', () => {
  // Integration Testing for the Staff Class, fetching staff data from Firebase
  it('Integration Testing (Staff)', async () => {
    // Test the initialization and retrieval of staff data from Firebase
    const staff = new Staff()
    await staff.init(160008)

    expect(staff.getID()).toBe(160008)
    expect(staff.getFirstName()).toBe('Sally')
    expect(staff.getLastName()).toBe('Loh')
    expect(staff.getListingsApplied()).toStrictEqual([0, 11, 10, 7])
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

  // Integration Testing for the HRStaff Class, fetching HR staff data from Firebase
  it('Integration Testing (HR Staff)', async () => {
    // Test the initialization and retrieval of HR staff data from Firebase
    const staff = new HRStaff()
    await staff.init(160008)

    expect(staff.getListingsCreated()).toStrictEqual([
      {
        applicants: [140002, 140003],
        createdate: '2023-10-07',
        createdby: '160008',
        deadline: '2023-10-12',
        department: 'Marketing',
        description:
          'We are seeking a highly analytical and data-driven Social Media Analyst to join our dynamic Marketing team. As a Social Media Analyst, you will play a crucial role in optimizing our social media presence, tracking performance, and providing insights to drive our social media strategy. If you are passionate about social media, have a keen eye for data, and can turn insights into actionable recommendations, we want to hear from you.',
        listingId: 3,
        responsibilities: [
          'Monitor and analyze social media platforms (e.g., Facebook, Twitter, LinkedIn, Instagram) to track engagement, reach, and audience growth.',
          'Develop and maintain dashboards and reports to provide real-time and historical performance metrics.',
          'New responsibility added'
        ],
        skills: [
          'Talent Management',
          'Proven experience as a Social Media Analyst or similar role.',
          'Professional and Business Ethics',
          'Data Analytics',
          'Problem Solving'
        ],
        title: 'Social Media Analyst'
      },
      {
        applicants: '',
        createdate: '2023-10-15',
        createdby: '160008',
        deadline: '2023-10-23',
        department: 'Data Engineering',
        description:
          'Analyse and interpret complex datasets, develop predictive models, and extract actionable insights to support data-driven decision-making. Utilize statistical and machine learning techniques, programming skills, and domain knowledge to solve business problems and enhance data-driven strategies. Effective communication of findings to non-technical stakeholders is essential.',
        listingId: 4,
        responsibilities: ['Help build monthly dashboard and report', 'Help development ML models'],
        skills: ['Python', 'C++', '.NET'],
        title: 'Data Science'
      },
      {
        applicants: '',
        createdate: '2023-10-21',
        createdby: '160008',
        deadline: '2023-10-28',
        department: 'HR',
        description: "New Job that's not expired",
        listingId: 6,
        responsibilities: ["Timely solve client's issue"],
        skills: [
          'Call Centre Management',
          'Collaboration',
          'Communication',
          'Customer Relationship Management',
          'Digital Fluency',
          'Problem Solving',
          'Stakeholder Management',
          'Technology Application'
        ],
        title: 'Call Centre'
      },
      {
        applicants: '',
        createdate: '2023-10-29',
        createdby: '160008',
        deadline: '2023-11-15',
        department: 'Sales',
        description: 'Experience with Sales and able to lead a team of members',
        listingId: 12,
        responsibilities: ['Leading, coordinating sales targets each month'],
        skills: [
          'Budgeting',
          'Business Negotiation',
          'Business Presentation Delivery',
          'Collaboration',
          'Communication',
          'Customer Acquisition Management',
          'Customer Relationship Management',
          'Problem Solving',
          'Sales Closure',
          'Stakeholder Management',
          'Strategy Planning',
          'Technology Integration'
        ],
        title: 'Sales Manager'
      }
    ])
  })
})

// Test the Listing Class
describe('Listing Class', () => {
  // Integration Testing for the Listing Class, fetching listing data from Firebase
  it('Integration Testing', async () => {
    // Test the loading and retrieval of listing data from Firebase
    const listing = new Listing()
    await listing.loadListing(1)

    expect(listing.getApplicants()).toStrictEqual([
      140002, 140003, 140004, 140008, 140015, 140025, 140036, 140078, 150096, 150655, 160323
    ])
    expect(listing.getCreateDate()).toBe('2023-09-15')
    expect(listing.getCreatedBy()).toBe(130001)
    expect(listing.getDeadline()).toBe('2023-11-10')
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
      'Technology Application'
    ])
    expect(listing.getTitle()).toBe('Call Centre')
    expect(listing.getAllAtrr()).toStrictEqual({
      applicants: [
        140002, 140003, 140004, 140008, 140015, 140025, 140036, 140078, 150096, 150655, 160323
      ],
      createdate: '2023-09-15',
      createdby: 130001,
      deadline: '2023-11-10',
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
        'Technology Application'
      ],
      title: 'Call Centre'
    })
  })
  // Unit Testing for the Listing Class
  it('Unit Testing', async () => {
    // Test the Listing class with specific parameters
    const listing = new Listing(
      'Data Analyst',
      'Accounting',
      '2023-11-20',
      'Seeking a Data Analyst to analyze and visualize data, uncover insights, and support data-driven decisions. Responsibilities include data collection, cleaning, analysis, and reporting. Collaborate with cross-functional teams and contribute to informed decision-making.',
      [
        'Collecting and cleaning data from various sources',
        'Conducting data analysis using Python, R, or SQL'
      ],
      ['Problem Solving', 'Accounting Standards']
    )

    expect(listing.getTitle()).toBe('Data Analyst')
    expect(listing.getDepartment()).toBe('Accounting')
    expect(listing.getDeadline()).toBe('2023-11-20')
    expect(listing.getDescription()).toBe(
      'Seeking a Data Analyst to analyze and visualize data, uncover insights, and support data-driven decisions. Responsibilities include data collection, cleaning, analysis, and reporting. Collaborate with cross-functional teams and contribute to informed decision-making.'
    )
    expect(listing.getResponsibilities()).toStrictEqual([
      'Collecting and cleaning data from various sources',
      'Conducting data analysis using Python, R, or SQL'
    ])
    expect(listing.getSkills()).toStrictEqual(['Problem Solving', 'Accounting Standards'])
  })
})

// Test the Create Listing functionality, including interactions with Firebase
describe('Create Listing', () => {
  // Test for cases where invalid input is provided for creating a listing
  const invalidInputs = [
    {
      title: '',
      department: 'Accounting',
      deadline: '2025-11-20',
      description:
        'Seeking a Data Analyst to analyze and visualize data, uncover insights, and support data-driven decisions. Responsibilities include data collection, cleaning, analysis, and reporting. Collaborate with cross-functional teams and contribute to informed decision-making.',
      responsibilities: [
        'Collecting and cleaning data from various sources',
        'Conducting data analysis using Python, R, or SQL'
      ],
      skills: ['Problem Solving', 'Accounting Standards']
    },
    {
      title: 'Data Analyst',
      department: '',
      deadline: '2025-11-20',
      description:
        'Seeking a Data Analyst to analyze and visualize data, uncover insights, and support data-driven decisions. Responsibilities include data collection, cleaning, analysis, and reporting. Collaborate with cross-functional teams and contribute to informed decision-making.',
      responsibilities: [
        'Collecting and cleaning data from various sources',
        'Conducting data analysis using Python, R, or SQL'
      ],
      skills: ['Problem Solving', 'Accounting Standards']
    },
    {
      title: 'Data Analyst',
      department: 'Accounting',
      deadline: '2025-11-20',
      description: '',
      responsibilities: [
        'Collecting and cleaning data from various sources',
        'Conducting data analysis using Python, R, or SQL'
      ],
      skills: ['Problem Solving', 'Accounting Standards']
    },
    {
      title: 'Data Analyst',
      department: 'Accounting',
      deadline: '2025-11-20',
      description:
        'Seeking a Data Analyst to analyze and visualize data, uncover insights, and support data-driven decisions. Responsibilities include data collection, cleaning, analysis, and reporting. Collaborate with cross-functional teams and contribute to informed decision-making.',
      responsibilities: [],
      skills: ['Problem Solving', 'Accounting Standards']
    },
    {
      title: 'Data Analyst',
      department: 'Accounting',
      deadline: '2025-11-20',
      description:
        'Seeking a Data Analyst to analyze and visualize data, uncover insights, and support data-driven decisions. Responsibilities include data collection, cleaning, analysis, and reporting. Collaborate with cross-functional teams and contribute to informed decision-making.',
      responsibilities: [
        'Collecting and cleaning data from various sources',
        'Conducting data analysis using Python, R, or SQL'
      ],
      skills: []
    }
  ]

  for (const input of invalidInputs) {
    it(`Missing Input`, () => {
      // Test creation of a new Listing with missing input fields
      try {
        const listing = new Listing(
          input.title,
          input.department,
          input.deadline,
          input.description,
          input.responsibilities,
          input.skills
        )
      } catch (error) {
        expect(error.message).toBe('Not all required fields are filled')
      }
    })
  }

  // Test for an invalid deadline when creating a listing
  it('Invalid Deadline', () => {
    // Test creation of a new Listing with an invalid deadline
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(yesterday.getDate()).padStart(2, '0')}`

    expect(() => {
      new Listing(
        'Data Analyst',
        'Accounting',
        yesterdayStr,
        'Seeking a Data Analyst to analyze and visualize data, uncover insights, and support data-driven decisions. Responsibilities include data collection, cleaning, analysis, and reporting. Collaborate with cross-functional teams and contribute to informed decision-making.',
        [
          'Collecting and cleaning data from various sources',
          'Conducting data analysis using Python, R, or SQL'
        ],
        [
          'Collecting and cleaning data from various sources',
          'Conducting data analysis using Python, R, or SQL'
        ]
      )
    }).toThrow('Deadline cannot be before today')
  })

  // Test pushing a new Listing to Firebase
  it('Push New Listing to Firebase', async () => {
    // Test the process of creating and saving a new Listing to the Firebase database
    const listing = new Listing(
      'Data Analyst',
      'Accounting',
      '2025-11-20',
      'Seeking a Data Analyst to analyze and visualize data, uncover insights, and support data-driven decisions. Responsibilities include data collection, cleaning, analysis, and reporting. Collaborate with cross-functional teams and contribute to informed decision-making.',
      [
        'Collecting and cleaning data from various sources',
        'Conducting data analysis using Python, R, or SQL'
      ],
      ['Problem Solving', 'Accounting Standards']
    )

    await listing.saveNewListingToDB()

    const newListing = await individualListingData(listing.getListingId())

    expect(newListing.title).toBe('Data Analyst')
    expect(newListing.department).toBe('Accounting')
    expect(newListing.deadline).toBe('2025-11-20')
    expect(newListing.description).toBe(
      'Seeking a Data Analyst to analyze and visualize data, uncover insights, and support data-driven decisions. Responsibilities include data collection, cleaning, analysis, and reporting. Collaborate with cross-functional teams and contribute to informed decision-making.'
    )
    expect(newListing.responsibilities).toStrictEqual([
      'Collecting and cleaning data from various sources',
      'Conducting data analysis using Python, R, or SQL'
    ])
    expect(newListing.skills).toStrictEqual(['Problem Solving', 'Accounting Standards'])

    deleteListing(listing.getListingId())
  })
})

// Test the View Listing functionality, including data retrieval from Firebase
describe('View Listing', () => {
  // Test loading a listing from the Firebase database
  it('Test loadListing() in Listing Class', async () => {
    // Set Up: Push fake listing (id = -1) to DB
    await testCaseAddFakeListing()

    var test_listing = new Listing()
    await test_listing.loadListing(-1)

    expect(test_listing.getAllAtrr()).toStrictEqual({
      createdate: '2021-09-01',
      createdby: 160316,
      deadline: '2021-09-30',
      department: 'Accounting',
      description: 'This is a fake listing',
      responsibilities: ['res1', 'res2'],
      skills: ['skill1', 'skill2', 'skill3'],
      applicants: ['140002', '140003', '140004'],
      title: 'Fake Listing',
      listingId: -1
    })

    // Tear Down: Delete fake listing
    await deleteListing(-1)
  })
})

/**
 * FRONT-END TESTING
 **/

// Test the LoginPage component
describe('Login Page Component', () => {
  // Test router navigation
  it('Router Testing', async () => {
    // Test navigation to the login page using Vue Router
    router.push('/')
    await router.isReady()
    const wrapper = mount(LoginPage, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.text()).toContain('Welcome Back!')
  })

  // Test rendering of "Welcome Back!" text
  it('Renders "Welcome Back!" text', () => {
    // Test if the "Welcome Back!" text is rendered in the LoginPage component
    const wrapper = mount(LoginPage)
    expect(wrapper.text()).toContain('Welcome Back!')
  })

  // Test showing a warning when email and password are missing during login
  it('Test Variable State when Login Credential is Missing', async () => {
    const wrapper = mount(LoginPage)
    await wrapper.vm.loginUser()
    expect(wrapper.vm.isMissing).toBe(true)
    expect(wrapper.vm.isIncorrect).toBe(false)
  })

  // Test successful login and redirection using Vue Router
  it('Redirects to Home Page on Successful Login', async () => {
    // Test the process of successful login and redirection to the home page
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
    expect(router.currentRoute.value.path).toBe('/discoverJobs')
  })

  // Test handling of incorrect credentials during login
  it('Test Incorrect Credentials', async () => {
    const username = 'sally.loh@allinone.com'
    const password = '12345'
    const wrapper = mount(LoginPage)

    const usernameInput = wrapper.find('input[type="text"]')
    await usernameInput.setValue(username)
    expect(wrapper.find('input[type="text"]').element.value).toBe(username)

    const passwordInput = wrapper.find('input[type="password"]')
    await passwordInput.setValue(password)
    expect(wrapper.find('input[type="password"]').element.value).toBe(password)

    const loginButton = wrapper.find({ ref: 'loginButton' })
    await loginButton.trigger('click')
  })

  // Test the existence of a login button
  it('Login Button Exists', () => {
    // Test if a login button exists in the LoginPage component
    const wrapper = mount(LoginPage)
    expect(wrapper.find({ ref: 'loginButton' }).exists()).toBe(true)
  })
})

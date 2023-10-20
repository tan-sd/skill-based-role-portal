import { allListingData, individualListingData, addNewListing, updateJobListing } from './CRUD_database.js'

export default class Listing {
    #title
    #department
    #deadline
    #description
    #responsibilities
    #skills
    #applicants
    #createdate
    #createdby
    #listingId
    #buildMethod

    constructor(title, department, deadline, description, responsibilitiesArr, skillsArr) {
        this.#buildMethod = null // Will be set to 'new' or 'load' depending on how the object was created

        // Check if any of the required fields are empty
        if (!title) {
            this.#initEmptyListing()
            return
        }
        
        // Handle errors [START] ========================================
        var error = null

        var today = new Date()
        var [deadlineValid, deadlineDateStr] = this.#checkValidDeadline(deadline)
        
        // Check deadline
        if (title && !skillsArr) {
            error = new Error('Not all required fields are filled')
        } else if (deadlineValid == false) {
            error = new Error(deadlineDateStr)
        } else if (!Array.isArray(responsibilitiesArr)) {
            error = new Error('ResponsibilitiesArr must be an array')
        } else if (!Array.isArray(skillsArr)) {
            error = new Error('SkillsArr must be an array')
        }

        if (error) {
            console.log(`Error in Listing constructor: ${error}`)
            throw error
        }
        // Handle errors [END] ========================================
        
        this.#title = title
        this.#department = department
        this.#deadline = deadlineDateStr
        
        this.#description = description
        this.#responsibilities = responsibilitiesArr
        this.#skills = skillsArr

        this.#applicants = []
        this.#createdate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        this.#createdby = localStorage.getItem('id')
        this.#listingId = 'Will be set & returned when saved to DB'
        this.#buildMethod = 'new'
    }

    #initEmptyListing() {
        this.#title = null
        this.#department = null
        this.#deadline = null
        this.#description = null
        this.#responsibilities = null
        this.#skills = null
        this.#applicants = null
        this.#createdate = null
        this.#createdby = null
        this.#listingId = null
        this.#buildMethod = null
    }

    async loadListing(inputId) {
        // Populates the listing object with data from the database based on the inputId
        var loadedListing = await individualListingData(inputId)

        if (loadedListing == null) {
            var error = new Error(`Listing with id ${inputId} does not exist`)
            console.log(`Error in loadListing: ${error}`)
            throw error
        }

        this.#title = loadedListing.title
        this.#department = loadedListing.department
        this.#deadline = loadedListing.deadline
        this.#description = loadedListing.description
        this.#responsibilities = loadedListing.responsibilities
        this.#skills = loadedListing.skills
        this.#applicants = loadedListing.applicants
        this.#createdate = loadedListing.createdate
        this.#createdby = loadedListing.createdby
        this.#listingId = loadedListing.listingId
        this.#buildMethod = 'load'

        return true
    }

    async getAllListings() {
        // Returns a list of all listings in DB
        var allListings = await allListingData()
        return allListings
    }

    async saveNewListingToDB() {
        // Saves a NEW listing object to the database

        var readyToSave = this.#checkReadyToSave()

        if (!readyToSave[0]) {
            var error = new Error(`Not all required attributes are set: ${readyToSave[1]}`)
            console.log(`Error in saveNewListingToDB: ${error}`)
            throw error
        } else if (this.#buildMethod != 'new') {
            var error = new Error('Cannot save an existing listing as new')
            console.log(`Error in saveNewListingToDB: ${error}`)
            throw error
        }

        var newListingObj = {
            createdate: this.#createdate,
            deadline: this.#deadline,
            department: this.#department,
            description: this.#description,
            responsibilities: this.#responsibilities,
            skills: this.#skills,
            applicants: this.#applicants,
            title: this.#title,
        }

        try {
            var res = await addNewListing(newListingObj)
            this.#listingId = res
            this.#buildMethod = 'load'
            return true
        } catch (error) {
            console.log(`Error in saveNewListingToDB: ${error}`)
            throw error
        }
    }

    updateListing(newListingData) {
        // Updates an EXISTING listing object with new data provided
        
        if (newListingData.hasOwnProperty('title')) {
            this.#title = newListingData.title
        }

        if (newListingData.hasOwnProperty('department')) {
            this.#department = newListingData.department
        }

        if (newListingData.hasOwnProperty('deadline')) {
            var [deadlineValid, deadlineDateStr] = this.#checkValidDeadline(newListingData.deadline)

            if (deadlineValid == false) {
                var error = new Error(deadlineDateStr)
                console.log(`Error in updateListing: ${error}`)
                throw error
            }

            this.#deadline = deadlineDateStr
        }

        if (newListingData.hasOwnProperty('description')) {
            this.#description = newListingData.description
        }

        if (newListingData.hasOwnProperty('responsibilities')) {
            if (!Array.isArray(newListingData.responsibilities)) {
                var error = new Error('Responsibilities must be an array')
                console.log(`Error in updateListing: ${error}`)
                throw error
            }

            this.#responsibilities = newListingData.responsibilities
        }

        if (newListingData.hasOwnProperty('skills')) {
            if (!Array.isArray(newListingData.skills)) {
                var error = new Error('Skills must be an array')
                console.log(`Error in updateListing: ${error}`)
                throw error
            }

            this.#skills = newListingData.skills
        }
    }

    async pushUpdatedListingToDB() {
        // Updates an EXISTING listing in the database

        var readyToSave = this.#checkReadyToSave()

        if (!readyToSave[0]) {
            var error = new Error(`Not all required attributes are set: ${readyToSave[1]}`)
            console.log(`Error in pushUpdatedListingToDB: ${error}`)
            throw error
        } else if (this.#buildMethod == 'new') {
            var error = new Error('Cannot update a new listing. Use saveNewListingToDB() instead')
            console.log(`Error in pushUpdatedListingToDB: ${error}`)
            throw error
        } else if (this.#buildMethod == null) {
            var error = new Error('Cannot update a listing that has not been loaded. Use loadListing() first')
            console.log(`Error in pushUpdatedListingToDB: ${error}`)
            throw error
        }

        var updatedListingObj = {
            createdate: this.#createdate,
            createdby: this.#createdby,
            deadline: this.#deadline,
            department: this.#department,
            description: this.#description,
            responsibilities: this.#responsibilities,
            skills: this.#skills,
            applicants: this.#applicants,
            title: this.#title
        }

        try {
            await updateJobListing(this.#listingId, updatedListingObj)
            return true
        } catch (error) {
            console.log(`Error in pushUpdatedListingToDB: ${error}`)
            throw error
        }
    }

    #checkReadyToSave() {
        // Returns true if all required fields are filled

        var to_check = {
            // key: [value, allow_empty]
            'title': [this.#title, false],
            'department': [this.#department, false],
            'deadline': [this.#deadline, true],
            'description': [this.#description, true],
            'responsibilities': [this.#responsibilities, true],
            'skills': [this.#skills, true],
            'applicants': [this.#applicants, true],
            'createdate': [this.#createdate, true]
        }

        for (const key in to_check) {
            var [e_val, allow_empty] = to_check[key]

            if (e_val == null) {
                console.log(`Attr ${key} is not set`)
                return [false, `${key} field is not set`]
            } else if (!allow_empty) {
                if (e_val == '') {
                    console.log(`Attr ${key} is empty`)
                    return [false, `${key} field is empty`]
                }
            }
        }

        return [true, '']
    }

    getTitle() {
        return this.#title
    }

    getDepartment() {
        return this.#department
    }

    getDeadline() {
        return this.#deadline
    }

    getDescription() {
        return this.#description
    }

    getResponsibilities() {
        return this.#responsibilities
    }

    getSkills() {
        return this.#skills
    }

    getApplicants() {
        return this.#applicants
    }

    getCreateDate() {
        return this.#createdate
    }

    getCreatedBy() {
        return this.#createdby
    }

    getListingId() {
        return this.#listingId
    }

    getAllAtrr() {
        return {
            'title': this.#title,
            'department': this.#department,
            'deadline': this.#deadline,
            'description': this.#description,
            'responsibilities': this.#responsibilities,
            'skills': this.#skills,
            'applicants': this.#applicants,
            'createdate': this.#createdate,
            'createdby': this.#createdby,
            'listingId': this.#listingId,
        }
    }

    #checkValidDeadline(datestr) {
        var deadlineDateObj = new Date(datestr)

        const today = new Date();
        const prevDay = new Date(today);
        prevDay.setDate(today.getDate() - 1); 

        if (deadlineDateObj == 'Invalid Date') {
            return [false, 'Invalid deadline date']
        } else if (deadlineDateObj < prevDay) {
            return [false, 'Deadline cannot be before today']
        }

        return [true, deadlineDateObj.getFullYear()+'-'+String(deadlineDateObj.getMonth()+1).padStart(2, '0')+'-'+String(deadlineDateObj.getDate()).padStart(2, '0')]
    }
}
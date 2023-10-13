import {
    read_staff_data,
    listingDataByCreator,
} from './CRUD_database.js'

import {
    getProfilePicURL,
} from './storage.js'

// Settings [START] ============================================================
const roleMapping = {
    1: 'Admin',
    2: 'User',
    3: 'Manager',
    4: 'HR',
}

const createdAccess = [1,4] // Roles that can create listings
// Settings [END] ==============================================================x


class Staff {
    #id
    #fname
    #lname
    #position
    #skillset
    #email
    #department
    #accessRights
    #profilePic
    #listingsApp
    #initPromise
    #role
    #country

    constructor (id) {
        this.#id = id; // Initialize properties to null or default values
        this.#fname = null;
        this.#lname = null;
        this.#position = null;
        this.#skillset = null;
        this.#email = null;
        this.#accessRights = null;
        this.#profilePic = null;
        this.#listingsApp = null;
        this.#country = null
        this.#department = null
    }

    async init() {
        try {
            const staff_data = await read_staff_data(this.#id)
            // const profilePic = await getProfilePicURL(id)

            this.#id = parseInt(this.#id, 10)
            this.#fname = staff_data.firstname
            this.#lname = staff_data.lastname
            this.#position = staff_data.position
            this.#skillset = staff_data.skillsets
            this.#email = staff_data.email
            this.#accessRights = staff_data.accessRights
            this.#profilePic = "https://vignette.wikia.nocookie.net/btb-2015/images/7/76/Bob.png/revision/latest?cb=20160630024047" // Change this with diff profile pics
            this.#listingsApp = staff_data.listingsapplied
            this.#role = roleMapping[staff_data.accessRights]
            this.#country = staff_data.country
            this.#department= staff_data.department
        } catch (error) {
            console.log(`Error in Staff constructor for id ${id}: ${error}`)
            throw error
        }
    }

    getID () {
        return this.#id;
    }

    getFirstName () {
        return this.#fname;
    }

    getLastName () {
        return this.#lname;
    }

    getFullName () {
        return `${this.#fname} ${this.#lname}`;
    }

    getDepartment () {
        return this.#department
    }

    getPosition () {
        return this.#position;
    }

    getSkillset () {
        return this.#skillset;
    }

    getEmail () {
        return this.#email;
    }

    getAccessRights () {
        return this.#accessRights;
    }

    getRole () {
        return this.#role;
    }

    getProfilePic () {
        return this.#profilePic;
    }

     getListingsApplied () {
        return this.#listingsApp;
    }

    getCountry (){
        return this.#country
    }
}

class HRStaff extends Staff {
    #initPromiseHR
    #listings_created

    constructor (id) {
        super(id);
        
        this.#initPromiseHR = this.#initHR(id);
    }

    async #initHR(id) {
        try {
            const listings_created = await listingDataByCreator(id)
            
            this.#listings_created = listings_created
        } catch (error) {
            console.log(`Error in HRStaff constructor for id ${id}: ${error}`)
            throw error
        }
    }

    async getListingsCreated () {
        await this.#initPromiseHR;

        return this.#listings_created;
    }
}

export async function getStaffObj (id) {
    const staff_temp = new Staff(id);

    if (createdAccess.includes(await staff_temp.getAccessRights())) {
        return new HRStaff(id);
    }

    return staff_temp;
}

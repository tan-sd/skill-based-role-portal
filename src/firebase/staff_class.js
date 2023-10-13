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
    #accessRights
    #profilePic
    #listingsApp
    #initPromise
    #role

    constructor (id) {
        this.#id = null; // Initialize properties to null or default values
        this.#fname = null;
        this.#lname = null;
        this.#position = null;
        this.#skillset = null;
        this.#email = null;
        this.#accessRights = null;
        this.#profilePic = null;
        this.#listingsApp = null;

        this.#initPromise = this.#init(id);
    }

    async #init(id) {
        try {
            const staff_data = await read_staff_data(id)
            // const profilePic = await getProfilePicURL(id)

            this.#id = parseInt(id, 10)
            this.#fname = staff_data.firstname
            this.#lname = staff_data.lastname
            this.#position = staff_data.position
            this.#skillset = staff_data.skillsets
            this.#email = staff_data.email
            this.#accessRights = staff_data.accessRights
            this.#profilePic = "https://vignette.wikia.nocookie.net/btb-2015/images/7/76/Bob.png/revision/latest?cb=20160630024047" // Change this with diff profile pics
            this.#listingsApp = staff_data.listingsapplied
            this.#role = roleMapping[staff_data.accessRights]
        } catch (error) {
            console.log(`Error in Staff constructor for id ${id}: ${error}`)
            throw error
        }
    }

    async getID () {
        await this.#initPromise;
        return this.#id;
    }

    async getFirstName () {
        await this.#initPromise;
        return this.#fname;
    }

    async getLastName () {
        await this.#initPromise;
        return this.#lname;
    }

    async getFullName () {
        await this.#initPromise;
        return `${this.#fname} ${this.#lname}`;
    }

    async getPosition () {
        await this.#initPromise;
        return this.#position;
    }

    async getSkillset () {
        await this.#initPromise;
        return this.#skillset;
    }

    async getEmail () {
        await this.#initPromise;
        return this.#email;
    }

    async getAccessRights () {
        await this.#initPromise;
        return this.#accessRights;
    }

    async getRole () {
        await this.#initPromise;
        return this.#role;
    }

    async getProfilePic () {
        await this.#initPromise;
        return this.#profilePic;
    }

    async getListingsApplied () {
        await this.#initPromise;
        return this.#listingsApp;
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

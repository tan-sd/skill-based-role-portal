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
    #role
    #country

    constructor () {
        this.#id = null;
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

    async init(id) {
        try {
            const staff_data = await read_staff_data(id)
            const profilePic = await getProfilePicURL(id)

            if (staff_data == null) {
                var error = 'Staff ID does not exist'
                console.log(`Error in Staff constructor for id ${id}: ${error}`)
                throw error
            }

            this.#id = parseInt(id, 10)
            this.#fname = staff_data.firstname
            this.#lname = staff_data.lastname
            this.#position = staff_data.position
            this.#skillset = staff_data.skillsets
            this.#email = staff_data.email
            this.#accessRights = parseInt(staff_data.accessrights, 10)
            this.#profilePic = profilePic
            this.#listingsApp = staff_data.listingsapplied
            this.#role = roleMapping[staff_data.accessrights]
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
    #listings_created

    constructor () {
        super();

        this.#listings_created = null;
    }

    async init(id) {
        await super.init(id);

        try {
            const listings_created = await listingDataByCreator(id)
            
            this.#listings_created = listings_created
        } catch (error) {
            console.log(`Error in HRStaff constructor for id ${id}: ${error}`)
            throw error
        }
    }

    getListingsCreated () {
        return this.#listings_created;
    }
}

export async function getStaffObj (id) {
    var staff_temp = new Staff();

    try {
        await staff_temp.init(id)
    } catch (error) {
        if (error == "Staff ID does not exist") {
            return null
        }
    }

    if (createdAccess.includes(staff_temp.getAccessRights())) {
        staff_temp = new HRStaff();
        await staff_temp.init(id)
    }

    return staff_temp;
}

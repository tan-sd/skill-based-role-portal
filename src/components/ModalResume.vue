<script setup>
import {read_staff_data } from '../firebase/CRUD_database'
import {uploadFiles } from '../firebase/storage'
import {getStaffObj} from '../firebase/staff_class'
</script>

<template>
    <!-- Modal -->
    <div class="modal fade" id="ModalInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLabel">Apply to: <h4 style="padding-left: 15px;display: inline-flex;">{{ job }}</h4></h4>
                <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal">
               
                </button>
            </div>
            <div class="modal-body">
                <div class="p-3 container">
                    <div class="row">
                        <h5 class="pb-2">Your information</h5>
                    </div>
                    <div class="row">
                        <div class="col-3 float-right">
                            <h5><img class="profilePic" :src="profilepic" /> </h5>
                        </div>
                        <div class="col-9 pt-2" style="font-family: Montserrat">
                            <p>{{fullname }}</p>
                            <p>{{email}}</p>
                        </div>
                    </div>
                    <div class="pt-4">
                    <h5>Resume</h5>
                    <p style="font-family: Montserrat" >Please include an updated resume</p>

                    <!-- <div>
                        <input type="file" @change="uFile" ref="file">
                        <button @click="submitFile">Upload!</button>
                    </div> -->
                    <div class="mb-3">
                        <label for="formFile" class="form-label btn btn-outline-secondary border-3" style="font-family: Montserrat">
                            <input type="file" @change="uFile" ref="file" class="form-control" id="formFile" style="display:none">
                            <div v-if="resume==null">
                                Upload Resume
                            </div>
                            <div v-if="resume!=null">
                                {{resume.name}}
                            </div>
                        </label>
                    </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="submitFile" data-bs-dismiss="modal">Submit</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        job: String,
        listing: Number
    },
    // created() {
    //     this.fetch_read_staff_data()
        
    // },

    data() {
        return {
            fullname:'',
            email:'',
            resume: null,
            profilepic: null,
        }
    },
    async mounted(){
        var staffid = localStorage.getItem('id')
        var staff1= await getStaffObj(staffid)
        this.fullname = staff1.getFullName()
        this.email = staff1.getEmail()
        this.profilepic = staff1.getProfilePic()
    },
    methods: {
        uFile(){
            this.resume = this.$refs.file.files[0]
        },
        async submitFile(){
            const resp = await uploadFiles(`resumes/${this.listing}/${localStorage.getItem('id')}/resume.pdf`, this.resume)
        }
    }
}
</script>

<style>
.profilePic {
  border-radius: 50%;
  height: 80px;
  width: 80px;
  float: center;
  object-fit: cover;
}

#ModalInfo{
    font-family: 'Montserrat-bold';
}
</style>
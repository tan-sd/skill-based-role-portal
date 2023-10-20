<template>
    <!-- Success Modal -->
    <div class="modal" tabindex="-1" id="successModal" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h4 class="text-center">
                        <font-awesome-icon icon="fa-solid fa-circle-check" class="text-success me-2" />{{ successMsg }}
                    </h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="back_to_home">Back to Home</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Error Modal -->
    <div class="modal" tabindex="-1" id="errorModal" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <h4 class="text-center">
                        <font-awesome-icon icon="fa-solid fa-circle-xmark" class="text-danger me-2" />{{ errorMsg }}
                    </h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { Modal } from 'bootstrap'

export default {
    data() {
        return {
            successModal: null,
            errorModal: null,

            successMsg: "Created Successfully!",
            errorMsg: "Error: Something went wrong.",
        }
    },

    methods: {
        showSuccessModal(successmsg) {
            console.log(`=== [START] showSuccessModal() ===`)
            this.successMsg = successmsg
            this.successModal.show()
        },
        
        showErrorModal(errormsg) {
            console.log(`=== [START] showErrorModal() ===`)
            this.errorMsg = errormsg
            this.errorModal.show()
        },

        dismissModals() {
            console.log(`=== [START] dismissModals() ===`)
            this.successModal.hide()
            this.errorModal.hide()
        },

        back_to_home() {
            this.dismissModals()
            this.$router.push('/')
        },
    },

    mounted() {
        this.successModal = new Modal('#successModal', {})
        this.errorModal = new Modal('#errorModal', {})
    },
};
</script>  
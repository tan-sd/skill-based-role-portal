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
</template>

<script>
import { Modal } from 'bootstrap'

export default {
    data() {
        return {
            successModal: null,
            successMsg: "You have successfully applied to this role!",

        }
    },

    methods: {
        showSuccessModal(successmsg) {
            this.successMsg = successmsg
            this.successModal.show()
        },
        dismissModals() {
            this.successModal.hide()
        },

        back_to_home() {
            this.dismissModals()
            this.$router.push('/')
        },
    },

    mounted() {
        this.successModal = new Modal('#successModal', {})
    },
};
</script>  
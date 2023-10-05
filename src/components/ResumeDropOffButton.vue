<script setup>
import ModalResume from './ModalResume.vue'
import { onMounted } from 'vue';
import { Modal } from 'bootstrap'

let modalR;
onMounted(()=>{
    modalR = new Modal(document.getElementById('ModalInfo'))
})

const showModal=() =>{
    modalR.show()
}

</script>

<template>
    <div>
        <button class="btn btn-secondary applyButton" @click="showModal()">Apply u mofo</button>
        <ModalResume></ModalResume>
    </div>
</template>
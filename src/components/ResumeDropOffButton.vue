<script setup>
import ModalResume from './ModalResume.vue'
import { onMounted } from 'vue';
import { Modal } from 'bootstrap'
const props = defineProps(['job'])

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
        <button class="btn btn-secondary applyButton" @click="showModal()">Apply</button>
        <ModalResume :job=props.job></ModalResume>
    </div>
</template>

<style>
.applyButton {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0 50px 50px 0;
  color: #ffffff;
}
</style>
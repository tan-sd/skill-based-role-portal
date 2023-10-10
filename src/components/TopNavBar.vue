<template>
  <div class="navBarContainer mb-2">
    <div class="backButtonContainer">
      <font-awesome-icon
        :icon="['fas', 'chevron-left']"
        size="2xl"
        @click="navigateBack"
        style="color: #ffffff"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.navBarContainer {
  width: 100%;
  height: 75px;
  background-color: #160b32;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
  padding-left: 2em;
}

.backButtonContainer {
  position: relative;
  cursor: pointer;
}
</style>

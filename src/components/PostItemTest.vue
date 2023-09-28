<script setup>
const props = defineProps({
    post: {
        type: Object,
        required: true,
    }
})
</script>


<template>
        <!-- <input type="checkbox" :checked="post.isCompleted"/>
        <div class="post">
            <input type="test" :value="post.jobTitle"/>
            <span>
                {{ post.jobTitle }}
            </span>
        </div> -->
        <div class="card" @click="handleCardClick(0)">
          <div class="border"></div>
          <div class="details">
            <div class="name"> HardCodeData </div>
            <div class="position">{{ post.jobTitle }}</div>
          </div>
          <button class="edit-button">Edit</button>
        </div>
</template>


<style scoped>

.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  border-radius: 5px;
  flex: 1;
  width: 100%;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  color: black;
}

.card:hover {
  background-color: #6A44D4;
  color: #FFFFFF;
}

.card:hover .position {
  color: #ffffffdc;
}

.border {
  width: 5px;
  height: 40px;
  border-radius: 5px;
  background-color: #6A44D4;
}

.details {
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
}

.name {
  font-size: 18px;
  font-family: 'montserrat-bold';
}

.position {
  font-size: 14px;
  color: #857F95;
}

.edit-button {
  margin-left: auto;
  background-color: #6A44D4;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #FFFFFF;
  color: #6A44D4;
}
</style>
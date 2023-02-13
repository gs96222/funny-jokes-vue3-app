<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: "Data Not Available",
  },
});
</script>

<template>
  <div class="data-not-available">
    <div class="message">
      <font-awesome-icon icon="fa-exclamation-triangle" />
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.data-not-available {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.icon {
  font-size: 50px;
  color: #d3d3d3;
  margin-bottom: 15px;
}
</style>

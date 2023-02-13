<script setup lang="ts">
defineProps<{
  active?: boolean;
}>();
</script>

<template>
  <span class="heart" :class="{ active: active }"></span>
</template>

<style scoped>
.heart {
  position: relative;
  height: 20px;
  width: 12px;
  background: white;
  border-radius: 10px 10px 0 0;
  transform: rotate(45deg);
  transition: all 0.5s;
}

.heart:before {
  content: "";
  position: absolute;
  background: white;
  height: 20px;
  width: 12px;
  transform: rotate(-90deg);
  border-radius: 10px 10px 0 0;
  left: -4px;
  top: 4px;
  transition: all 0.5s;
}

.heart.active {
  background: red;
}

.heart.active::before {
  background-color: red;
}
</style>

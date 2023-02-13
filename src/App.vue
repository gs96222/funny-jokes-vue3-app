<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  padding: 0 2rem;
  height: 100vh;
}
header {
  line-height: 1.5;
  height: inherit;
  padding: 5% 0 5%;
}

.router-view {
  height: 90%;
  background: white;
  align-self: center;
  overflow: auto;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1);
}
</style>

<script setup lang="ts">
import { breakSentences } from "@/utils/breakSentences";

const props = defineProps<{
  setup: string;
  delivery: string;
  isBlurSetup?: boolean;
  isBlurDelivery?: boolean;
}>();

const { first3Words, remainingWords } = breakSentences(props.setup, 3);
</script>

<template>
  <div class="setup">
    <span>{{ first3Words }}</span>
    <span :class="{ 'blur-words unselectable': isBlurSetup }"
      >&nbsp;{{ remainingWords }}</span
    >
  </div>
  <div class="delivery" :class="{ 'blur-words unselectable': isBlurDelivery }">
    {{ delivery }}
  </div>
</template>

<style scoped>
.setup {
  flex: 1;
}

.delivery {
  flex: 1;
  font-weight: 500;
}
</style>

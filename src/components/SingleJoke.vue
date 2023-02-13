<script setup lang="ts">
import { breakSentences } from "@/utils/breakSentences";

const props = defineProps<{
  description: string;
  isBlur?: boolean;
}>();
const { first3Words, remainingWords } = breakSentences(props.description, 3);
</script>

<template>
  <p class="single">
    <span>{{ first3Words }}</span>
    <span :class="{ 'blur-words unselectable': isBlur }"
      >&nbsp;{{ remainingWords }}</span
    >
  </p>
</template>

<style>
.single {
  flex: 1;
}

.blur-words {
  color: transparent;
  text-shadow: 0 0 8px #000;
}

.unselectable {
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>

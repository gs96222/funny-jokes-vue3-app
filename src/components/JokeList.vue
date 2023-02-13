<script setup lang="ts">
import type {
  JokesType,
  SingleJokeType,
  TwoPartJokeType,
} from "../types/jokes";
import JokeListItem from "./JokeListItem.vue";
defineProps<{
  jokes?: JokesType;
  onClick: (joke: SingleJokeType | TwoPartJokeType) => void;
  favorites: JokesType;
}>();
</script>

<template>
  <div class="card-container">
    <ul>
      <JokeListItem
        v-for="joke in jokes"
        :joke="joke"
        v-bind:key="joke.id"
        :onClick="onClick"
        :favorites="favorites"
      />
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none !important; /** not working */
}
.card-container {
  height: calc(100vh - 370px);
  overflow-y: scroll;
  padding-right: 40px;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

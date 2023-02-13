<script setup lang="ts">
import type {
  JokesType,
  SingleJokeType,
  TwoPartJokeType,
} from "../types/jokes";
import SingleJoke from "./SingleJoke.vue";
import TwoPartJoke from "./TwoPartJoke.vue";
import { JokesCategoriesColor } from "@/utils/constants";
import HeartLiked from "./HeartLiked.vue";
const props = defineProps<{
  joke: SingleJokeType | TwoPartJokeType;
  onClick: (joke: SingleJokeType | TwoPartJokeType) => void;
  favorites: JokesType;
}>();

const cardBottomBGColor = JokesCategoriesColor[props.joke.category];
</script>

<template>
  <li>
    <div class="card-container">
      <div class="card-top">
        <SingleJoke
          isBlur
          v-if="joke.type === 'single'"
          :description="joke.joke"
        />
        <TwoPartJoke
          v-if="joke.type === 'twopart'"
          :setup="joke.setup"
          :delivery="joke.delivery"
          isBlurSetup
          isBlurDelivery
        />
      </div>
      <div class="card-bottom">
        <p>{{ joke.category }}</p>
        <div class="card-bottom-right-side">
          <button class="view-joke" @click="onClick(joke)">View Joke</button>
          <HeartLiked
            :active="Boolean(favorites.find((item) => item?.id === joke.id))"
          />
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.card-container {
  background: white;
  border-radius: 5px;
  margin: 15px 0px;
  height: 180px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  font-size: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* cursor: pointer; */
}

.card-top {
  text-align: center;
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: auto;
  height: 120px;
  flex-wrap: wrap;
  color: #67625a;
}
.card-top:hover {
  filter: brightness(85%);
  color: #201d1d;
}

.card-bottom {
  background: v-bind("cardBottomBGColor");
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.card-bottom-right-side {
  display: flex;
  align-items: center;
  gap: 30px;
}

.card-bottom p {
  font-size: 18px;
  font-weight: bold;
}
.view-joke {
  align-items: center;
  appearance: none;
  background-color: #fcfcfd;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395a;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  height: 40px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 18px;
}

.view-joke:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  transform: translateY(-2px);
}
.view-joke:active {
  box-shadow: #d6d6e7 0 3px 7px inset;
  transform: translateY(2px);
}
</style>

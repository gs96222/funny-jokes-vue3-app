<script setup lang="ts">
import JokeListItemSkeleton from "@/components/JokeListItemSkeleton.vue";
import JokeList from "@/components/JokeList.vue";
import SideBar from "@/components/SideBar.vue";
import JokesModal from "@/components/JokesModal.vue";
import SingleJoke from "@/components/SingleJoke.vue";
import TwoPartJoke from "@/components/TwoPartJoke.vue";
import DataNotAvailable from "@/components/DataNotAvailable.vue";
import ErrorMsg from "@/components/ErrorMsg.vue";

import { onMounted, ref, computed } from "vue";
import { fetchJokesApi } from "@/utils/fetch";
import { filterJokes } from "@/utils/filter";
import { getJokesCategoriesAndTypes } from "@/utils/categories";
import {
  getLikedJokes,
  removeLikedJoke,
  saveLikedJoke,
  sortLikedJokes,
} from "@/utils/jokesLikedHelper";
import type { JokesType, SingleJokeType, TwoPartJokeType } from "@/types/jokes";
import { unionBy } from "lodash";

const availableJokesCategories = ref<Record<string, number>>({});
const availableJokesTypes = ref<{ single: number; twopart: number }>({
  single: 0,
  twopart: 0,
});
const jokeType = ref<"single" | "twopart" | "any">("any");
const jokeCategory = ref<Array<string>>([]);
const totalJokes = ref<JokesType>([]);
const availableJokes = ref<JokesType>([]);
const isLoading = ref(true);
const selectedJoke = ref<SingleJokeType | TwoPartJokeType>();
const showModal = ref(false);
const isTwoPartJokeSetupInModalBlur = ref(true);
const favoriteJokes = ref<JokesType>([]);
const notFavoriteJokes = ref<JokesType>([]);
const isFetchError = ref();
const errorMsg = ref();

onMounted(() => {
  console.log("the component is mounted");
  getJokes();
});

const updateJokes = () => {
  console.log(notFavoriteJokes.value);
  totalJokes.value = sortLikedJokes(
    totalJokes.value,
    favoriteJokes.value,
    notFavoriteJokes.value
  );
  availableJokes.value = [...totalJokes.value];
  [availableJokesCategories.value, availableJokesTypes.value] =
    getJokesCategoriesAndTypes(totalJokes.value);
};

const getJokes = () => {
  isLoading.value = true;
  fetchJokesApi()
    .then((res) => {
      isLoading.value = false;
      favoriteJokes.value = getLikedJokes();
      console.log("favoriteJokes before assigned", favoriteJokes.value);
      totalJokes.value = unionBy(favoriteJokes.value, res.jokes, "id");
      availableJokes.value = [...totalJokes.value];
      console.log("totalJokes", totalJokes.value);
      console.log("availableJokes", availableJokes.value);
      console.log("favoriteJokes", favoriteJokes.value);
      updateJokes();
    })
    .catch((err) => {
      console.log(err);
      isLoading.value = false;
      isFetchError.value = true;
      errorMsg.value = err?.message;
    });
};

const handleFetchJokes = () => {
  getJokes();
  jokeCategory.value = [];
  jokeType.value = "any";
  console.log(availableJokesCategories.value);
  console.log("click called");
};

const handleFilter = () => {
  console.log(availableJokes.value);
  const filteredJokes = filterJokes(
    jokeType.value,
    jokeCategory.value,
    totalJokes.value
  );
  availableJokes.value = filteredJokes;
  console.log(
    jokeType.value,
    jokeCategory.value,
    JSON.stringify(filteredJokes)
  );
};

const openModal = (joke: SingleJokeType | TwoPartJokeType) => {
  selectedJoke.value = joke;
  showModal.value = true;
  console.log(joke);
};

const closeModal = (open: boolean) => {
  selectedJoke.value = undefined;
  showModal.value = open;
  isTwoPartJokeSetupInModalBlur.value = true;
};

const handleShowMore = () => {
  console.log("show more clicked");
  isTwoPartJokeSetupInModalBlur.value = !isTwoPartJokeSetupInModalBlur.value;
};

const handleFavoriteClicked = (type: "like" | "dislike") => {
  if (selectedJoke?.value?.id) {
    const favoriteJokesFoundIndex = favoriteJokes.value.findIndex(
      (item) => item.id === selectedJoke.value?.id
    );

    const notFavoriteJokesFoundIndex = notFavoriteJokes.value.findIndex(
      (item) => item.id === selectedJoke.value?.id
    );

    if (type === "like") {
      if (favoriteJokesFoundIndex === -1) {
        saveLikedJoke(selectedJoke.value);
      }

      if (favoriteJokesFoundIndex !== -1) {
        removeLikedJoke(selectedJoke.value);
      }

      if (notFavoriteJokesFoundIndex !== -1) {
        console.log("called", notFavoriteJokes);
        notFavoriteJokes.value.splice(notFavoriteJokesFoundIndex, 1);
      }
    }

    if (type === "dislike") {
      if (favoriteJokesFoundIndex !== -1) {
        removeLikedJoke(selectedJoke.value);
      }

      if (notFavoriteJokesFoundIndex === -1) {
        notFavoriteJokes.value.push(selectedJoke.value);
      }

      if (notFavoriteJokesFoundIndex !== -1) {
        notFavoriteJokes.value.splice(notFavoriteJokesFoundIndex, 1);
      }
    }

    favoriteJokes.value = getLikedJokes();
    updateJokes();
  }
};

const selectedJokeIsFavorite = computed(() => {
  console.log("computed called");
  return favoriteJokes.value.findIndex(
    (item) => item.id === selectedJoke.value?.id
  ) !== -1
    ? true
    : false;
});

const selectedJokeIsNotFavorite = computed(() => {
  console.log("computed called");
  return notFavoriteJokes.value.findIndex(
    (item) => item.id === selectedJoke.value?.id
  ) !== -1
    ? true
    : false;
});
</script>

<template>
  <div class="grid">
    <aside>
      <SideBar :on-click="handleFetchJokes" />
    </aside>
    <div class="right-view">
      <div class="container">
        <div class="container-header">
          <div class="form">
            <div class="form-container">
              <div class="form-group">
                <h3>Joke Type</h3>
                <div class="from-control-group">
                  <input
                    type="radio"
                    id="single"
                    value="single"
                    v-model="jokeType"
                  />
                  <label for="single"
                    >Single ({{ availableJokesTypes.single }})</label
                  >
                </div>

                <div class="from-control-group">
                  <input
                    type="radio"
                    id="two"
                    value="twopart"
                    v-model="jokeType"
                  />
                  <label for="two"
                    >Two Part ({{ availableJokesTypes.twopart }})</label
                  >
                </div>
                <div class="from-control-group">
                  <input type="radio" id="any" value="any" v-model="jokeType" />
                  <label for="any"
                    >Any ({{
                      availableJokesTypes.single + availableJokesTypes.twopart
                    }})</label
                  >
                </div>
              </div>
              <div class="form-group">
                <h3>Available Joke Category</h3>
                <div class="category">
                  <div
                    v-for="category in Object.keys(availableJokesCategories)"
                    class="from-control-group"
                    v-bind:key="category"
                  >
                    <input
                      type="checkbox"
                      :id="category"
                      :value="category"
                      v-model="jokeCategory"
                    />
                    <label :for="category"
                      >{{ category }}({{
                        availableJokesCategories[category]
                      }})</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="button-container">
              <button @click="handleFilter">Filter</button>
            </div>
          </div>
          <div class="stats-container">
            <span
              >{{ availableJokes.length }} (Current) /
              {{ totalJokes.length }} (Total)</span
            >
          </div>
        </div>

        <div class="jokes-list-container">
          <JokeList
            v-if="!isLoading && availableJokes.length > 0 && !isFetchError"
            :jokes="availableJokes"
            :onClick="openModal"
            :favorites="favoriteJokes"
          />
          <DataNotAvailable
            v-if="!isLoading && availableJokes.length === 0 && !isFetchError"
          />
          <ErrorMsg v-if="!isLoading && isFetchError" />
          <div v-if="isLoading" id="fallback">
            <ul>
              <JokeListItemSkeleton />
              <JokeListItemSkeleton />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="modal">
    <JokesModal
      v-if="selectedJoke"
      :joke="selectedJoke"
      :show="showModal"
      :onClose="closeModal"
    >
      <template #heading>
        <h2>Joke</h2>
      </template>
      <template #details>
        <div class="modal-card-container">
          <div class="modal-card-top">
            <SingleJoke
              v-if="selectedJoke?.type === 'single'"
              :description="selectedJoke.joke"
            />
            <TwoPartJoke
              v-if="selectedJoke?.type === 'twopart'"
              :setup="selectedJoke.setup"
              :delivery="selectedJoke.delivery"
              :is-blur-delivery="isTwoPartJokeSetupInModalBlur"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer-left">
          <h3>Do You Like This Joke ?</h3>
          <button
            class="btn"
            :class="{ green: selectedJokeIsFavorite }"
            @click="handleFavoriteClicked('like')"
          >
            <font-awesome-icon icon="thumbs-up" />
          </button>
          <button
            class="btn"
            :class="{ red: selectedJokeIsNotFavorite }"
            id="red"
            @click="handleFavoriteClicked('dislike')"
          >
            <font-awesome-icon icon="thumbs-down" />
          </button>
        </div>
        <div v-if="selectedJoke?.type === 'twopart'" class="modal-footer-right">
          <button class="show-more-button" @click="handleShowMore">
            {{ isTwoPartJokeSetupInModalBlur ? "show more" : "show less" }}
          </button>
        </div>
      </template>
    </JokesModal>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  padding: 0 2rem;
  height: 100vh;
}

aside {
  line-height: 1.5;
  height: inherit;
  padding: 5% 0 5%;
}

.right-view {
  height: 90%;
  background: white;
  align-self: center;
  overflow: auto;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1);
}

.stats-container {
  display: flex;
  justify-content: flex-end;
  margin: 10px 40px;
  padding: 5px;
}
.container {
  height: 80%;
  max-width: 1000px;
}
h1,
h2,
h3 {
  font-weight: bold;
}

.form {
  margin: 10px 40px;
  padding: 5px;
}

.form-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.form-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.from-control-group {
  display: flex;
  gap: 5px;
}

.category {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.button-container {
  text-align: right;
}

.button-container button {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-radius: 15px 225px 255px 15px 15px 255px 225px 15px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 1rem;
  line-height: 23px;
  outline: none;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.button-container button:active {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}
.button-container button:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
}

ul {
  list-style: none;
}

.modal-card-container {
  background: white;
  border-radius: 5px;
  margin: 15px 0px;
  min-height: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  font-size: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.modal-card-top {
  text-align: center;
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: auto;
  /* height: 300px; */
  flex-wrap: wrap;
  color: #67625a;
}
.modal-footer-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-footer-left h3 {
  font-weight: bold;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
  outline: 0;
  color: #aaa;
  text-transform: none;
  margin: 0;
  font-family: inherit;
}
.btn.green {
  color: green;
}

.btn.red {
  color: red;
}

.show-more-button {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #275e06;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.show-more-button:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}

@media (min-width: 768px) {
  .show-more-button {
    padding: 0.25em 0.75em;
  }
}
</style>

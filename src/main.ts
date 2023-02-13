import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faThumbsUp,
  faThumbsDown,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/main.css";
library.add(faHeart, faThumbsUp, faThumbsDown, faExclamationTriangle);
const app = createApp(App);

app.use(router).component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");

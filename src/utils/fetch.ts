import { JOKES_API_BASE_URL } from "./constants";
import axios from "axios";
import type { JokeApiResponse } from "@/utils/interfaces";

export const fetchJokesApi = () =>
  axios.get(JOKES_API_BASE_URL).then((res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data as JokeApiResponse;
    } else {
      throw "Bad Request";
    }
  });

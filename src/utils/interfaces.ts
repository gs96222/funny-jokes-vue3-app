import type { JokesType } from "@/types/jokes";

export interface JokeApiResponse {
  amount: number;
  error: false;
  jokes: JokesType;
}

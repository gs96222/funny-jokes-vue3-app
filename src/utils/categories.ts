import type { JokesType } from "@/types/jokes";

export const getJokesCategoriesAndTypes = (
  jokes: JokesType
): [Record<string, number>, { single: number; twopart: number }] => {
  const categories: Record<string, number> = {};
  const jokeTypes = {
    single: 0,
    twopart: 0,
  };

  jokes.forEach((joke) => {
    if (joke.category in categories) {
      categories[joke.category]++;
    } else {
      categories[joke.category] = 1;
    }

    if (joke.type === "single") {
      jokeTypes.single++;
    } else {
      jokeTypes.twopart++;
    }
  });

  return [categories, jokeTypes];
};

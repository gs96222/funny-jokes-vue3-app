import type { JokesType } from "@/types/jokes";

export const filterJokes = (
  jokeType: "single" | "twopart" | "any",
  jokeCategory: string[],
  jokes: JokesType
) => {
  return jokes
    .filter((joke) => {
      if (jokeType !== "any") {
        return joke.type === jokeType;
      }
      return true;
    })
    .filter((jokeItem) =>
      jokeCategory.length > 0 ? jokeCategory.includes(jokeItem.category) : true
    );
};

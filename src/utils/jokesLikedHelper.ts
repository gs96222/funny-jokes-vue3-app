import type { JokesType, SingleJokeType, TwoPartJokeType } from "@/types/jokes";
import { default as localStorageHelper, CacheKey } from "./localStorageHelper";

export const saveLikedJoke = (
  joke: SingleJokeType | TwoPartJokeType
): Array<SingleJokeType | TwoPartJokeType> => {
  let jokes = localStorageHelper.getItem(CacheKey.funnyJokes);
  if (!jokes?.likes) {
    jokes = { likes: [] };
  }

  jokes.likes.push(joke);
  localStorageHelper.setItem(CacheKey.funnyJokes, jokes);
  return jokes.likes;
};

export const removeLikedJoke = (
  joke: SingleJokeType | TwoPartJokeType
): Array<SingleJokeType | TwoPartJokeType> => {
  const jokes = localStorageHelper.getItem(CacheKey.funnyJokes);
  if (jokes?.likes) {
    const index = jokes.likes.findIndex((item) => item.id === joke.id);
    if (index !== -1) {
      jokes.likes.splice(index, 1);
    }
  }

  localStorageHelper.setItem(CacheKey.funnyJokes, jokes);
  return jokes.likes;
};

export const getLikedJokes = (): Array<SingleJokeType | TwoPartJokeType> => {
  const jokes = localStorageHelper.getItem(CacheKey.funnyJokes);
  if (jokes?.likes) {
    return jokes.likes;
  }

  return [];
};

export const sortLikedJokes = (
  originalJokes: JokesType,
  favoriteJokes: JokesType,
  notFavoriteJokes: JokesType
) => {
  return originalJokes.sort((jokeA, jokeB) => {
    const isJokeAFavorite = favoriteJokes.find((item) => item.id === jokeA.id);
    const isJokeBFavorite = favoriteJokes.find((item) => item.id === jokeB.id);
    if (isJokeAFavorite && !isJokeBFavorite) {
      return -1;
    } else if (!isJokeAFavorite && isJokeBFavorite) {
      return 1;
    } else {
      const isJokeANotFavorite = notFavoriteJokes.find(
        (item) => item.id === jokeA.id
      );
      const isJokeBNotFavorite = notFavoriteJokes.find(
        (item) => item.id === jokeB.id
      );
      if (isJokeANotFavorite && !isJokeBNotFavorite) {
        return 1;
      } else if (!isJokeANotFavorite && isJokeBNotFavorite) {
        return -1;
      } else {
        return 0;
      }
    }
  });
};

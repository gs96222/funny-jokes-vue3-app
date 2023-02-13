import type { JokesType } from "@/types/jokes";

interface Jokes {
  likes: JokesType;
}

export enum CacheKey {
  funnyJokes = "funnyJokes",
}

interface CacheValues {
  [CacheKey.funnyJokes]: Jokes;
}

interface CacheUtil {
  setItem: <T extends CacheKey>(key: T, object: CacheValues[T]) => void;
  getItem: <T extends CacheKey>(key: T) => CacheValues[T];
  removeItem: (key: CacheKey) => void;
  removeAll: () => void;
}

const localStorageHelper: CacheUtil = {
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  removeAll: () => localStorage.clear(),
};

export default localStorageHelper;

export type SingleJokeType = {
  category: string;
  type: "single";
  joke: string;
  id: number;
  safe: boolean;
  lang: string;
  flags: Record<string, boolean>;
};

export type TwoPartJokeType = {
  category: string;
  type: "twopart";
  setup: string;
  delivery: string;
  id: number;
  safe: boolean;
  lang: string;
  flags: Record<string, boolean>;
};

export type JokesType = Array<SingleJokeType | TwoPartJokeType>;

export const breakSentences = (word: string, length: number) => {
  const wordArr = word.split(" ");
  const first3Words = wordArr.slice(0, length).join(" ");
  const remainingWords = wordArr.slice(length).join(" ");
  return { first3Words, remainingWords };
};

import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { breakSentences } from "@/utils/breakSentences";
import SingleJoke from "../SingleJoke.vue";

describe("SingleJoke", () => {
  it("should split the description into two parts", () => {
    const description = "this is a description";
    const { first3Words, remainingWords } = breakSentences(description, 3);

    expect(first3Words).toBe("this is a");
    expect(remainingWords).toBe("description");
  });

  it("should blur the remaining words if isBlur is true", () => {
    const description = "this is a description";
    const { first3Words, remainingWords } = breakSentences(description, 3);
    const wrapper = shallowMount(SingleJoke, {
      propsData: { description, isBlur: true },
    });
    const remainingWordsEl = wrapper.find(".blur-words");
    expect(remainingWordsEl.isVisible()).toBe(true);
    expect(remainingWordsEl.text()).toBe(`${remainingWords}`);
  });
});

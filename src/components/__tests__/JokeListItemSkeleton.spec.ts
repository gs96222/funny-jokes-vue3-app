import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Skeleton from "../JokeListItemSkeleton.vue";

describe("Joke List Item Skeleton", () => {
  it("renders the skeleton", () => {
    const wrapper = mount(Skeleton);
    expect(wrapper.find(".card-container").exists()).toBe(true);
    expect(wrapper.find(".skeleton").exists()).toBe(true);
  });
});

import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HeartLikedComponent from "../HeartLiked.vue";

describe("Heart Liked Component", () => {
  it("renders the inactive heart", () => {
    const wrapper = mount(HeartLikedComponent);
    expect(wrapper.find(".heart").classes()).not.toContain("active");
  });

  it("renders the active heart", () => {
    const wrapper = mount(HeartLikedComponent, {
      propsData: {
        active: true,
      },
    });
    expect(wrapper.find(".heart").classes()).toContain("active");
  });
});

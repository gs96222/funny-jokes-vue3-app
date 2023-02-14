import { mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import TwoPartJoke from "../TwoPartJoke.vue";

describe("Component", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(TwoPartJoke, {
      propsData: {
        setup: "This is a sample setup.",
        delivery: "This is a sample delivery.",
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the correct setup", () => {
    const setup = wrapper.find(".setup");
    expect(setup.text()).toContain("This is a");
    expect(setup.text()).toContain("sample setup.");
  });

  it("renders the correct delivery", () => {
    const delivery = wrapper.find(".delivery");
    expect(delivery.text()).toContain("This is a sample delivery.");
  });

  it("applies the blur-words class to setup if isBlurSetup is true", async () => {
    const setup = wrapper.find(".setup");
    expect(setup.findAll("span")[1].classes()).not.toContain("blur-words");
    await wrapper.setProps({ isBlurSetup: true });
    expect(setup.findAll("span")[1].classes()).toContain("blur-words");
  });

  it("applies the blur-words class to delivery if isBlurDelivery is true", async () => {
    const delivery = wrapper.find(".delivery");
    expect(delivery.classes()).not.toContain("blur-words");
    await wrapper.setProps({ isBlurDelivery: true });
    expect(delivery.classes()).toContain("blur-words");
  });
});

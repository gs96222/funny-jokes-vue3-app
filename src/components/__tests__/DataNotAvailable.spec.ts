import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import DataNotAvailableComponent from "../DataNotAvailable.vue";

describe("Data Not Available Component", () => {
  it("renders the default message when there is no data", () => {
    const wrapper = mount(DataNotAvailableComponent);
    expect(wrapper.find(".message p").text()).toBe("Data Not Available");
  });

  it("renders the custom message when there is no data", () => {
    const wrapper = mount(DataNotAvailableComponent, {
      propsData: {
        message: "Custom no data message",
      },
    });
    expect(wrapper.find(".message p").text()).toBe("Custom no data message");
  });
});

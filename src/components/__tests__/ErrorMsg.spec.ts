import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ErrorMsgComponent from "../ErrorMsg.vue";

describe("Error Msg Component", () => {
  it("renders the default error message", () => {
    const wrapper = mount(ErrorMsgComponent);
    expect(wrapper.find(".message p").text()).toBe("Error occurred");
  });

  it("renders the custom error message", () => {
    const wrapper = mount(ErrorMsgComponent, {
      propsData: {
        message: "Custom error message",
      },
    });
    expect(wrapper.find(".message p").text()).toBe("Custom error message");
  });
});

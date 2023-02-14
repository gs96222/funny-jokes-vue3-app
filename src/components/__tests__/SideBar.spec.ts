import { mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import SideBar from "../SideBar.vue";

describe("Side Bar", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(SideBar);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders a h1 element with the text "Funny Jokes"', () => {
    const title = wrapper.find(".title");
    expect(title.text()).toBe("Funny Jokes");
  });

  it("renders an image with the correct source and alt attribute", () => {
    const image = wrapper.find("img");
    expect(image.attributes().src).toBe("/assets/funny-emoji.svg");
    expect(image.attributes().alt).toBe("Laugh Emoji");
  });

  it('renders a button with the text "Fetch Jokes"', () => {
    const button = wrapper.find(".fetcher");
    expect(button.text()).toBe("Fetch Jokes");
  });

  it("calls the onClick method when the button is clicked", async () => {
    const onClick = vi.fn();
    await wrapper.setProps({ onClick });
    wrapper.find("button").trigger("click");
    expect(onClick).toHaveBeenCalled();
  });
});

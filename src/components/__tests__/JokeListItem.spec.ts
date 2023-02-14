import { mount } from "@vue/test-utils";
import JokeList from "../JokeList.vue";
import { describe, it, vi, expect } from "vitest";
import JokeListItem from "../JokeListItem.vue";
import type { JokesType } from "@/types/jokes";

const mockedJokes: JokesType = [
  {
    category: "Programming",
    type: "single",
    joke: 'Four engineers get into a car. The car won\'t start.\nThe Mechanical engineer says "It\'s a broken starter".\nThe Electrical engineer says "Dead battery".\nThe Chemical engineer says "Impurities in the gasoline".\nThe IT engineer says "Hey guys, I have an idea: How about we all get out of the car and get back in".',
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    id: 132,
    safe: true,
    lang: "en",
  },
  {
    category: "Spooky",
    type: "twopart",
    setup: "I'm not saying my son is ugly...",
    delivery:
      "But on Halloween he went to tell the neighbors to turn down their TV and they gave him some candy.",
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    safe: true,
    id: 313,
    lang: "en",
  },
];

const mockedFavorites: JokesType = [
  {
    category: "Spooky",
    type: "twopart",
    setup: "I'm not saying my son is ugly...",
    delivery:
      "But on Halloween he went to tell the neighbors to turn down their TV and they gave him some candy.",
    flags: {
      nsfw: false,
      religious: false,
      political: false,
      racist: false,
      sexist: false,
      explicit: false,
    },
    safe: true,
    id: 313,
    lang: "en",
  },
];

describe("Jokes List Items ", () => {
  it("renders jokes correctly", () => {
    const onClick = vi.fn();
    const wrapper = mount(JokeList, {
      propsData: {
        jokes: mockedJokes,
        onClick,
        favorites: mockedFavorites,
      },
    });

    expect(wrapper.findAllComponents(JokeListItem).length).toBe(2);
    expect(wrapper.find(".card-container").exists()).toBe(true);
  });

  it("calls the onClick function when a View Joke button in the JokeListItem is clicked", () => {
    const onClick = vi.fn();
    const wrapper = mount(JokeList, {
      propsData: { jokes: mockedJokes, onClick, favorites: mockedFavorites },
    });

    wrapper.findComponent(JokeListItem).find("button").trigger("click");
    expect(onClick).toHaveBeenCalled();
  });
});

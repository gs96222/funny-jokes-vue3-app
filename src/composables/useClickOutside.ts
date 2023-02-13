import { watch, unref, onUnmounted } from "vue";

const EVENTS: string[] = ["mousedown", "touchstart", "pointerdown"];

function unrefElement(elRef: any) {
  return unref(elRef)?.$el ?? unref(elRef);
}

function useEventListener(...args: [any, string, EventListener, any]) {
  const [target, event, listener, options] = args;

  if (!target) return;

  let cleanup: Function = () => {};

  watch(
    () => unref(target),
    (el: any) => {
      cleanup();
      if (!el) return;

      el.addEventListener(event, listener, options);

      cleanup = () => {
        el.removeEventListener(event, listener, options);
        cleanup = () => {};
      };
    },
    { immediate: true }
  );

  onUnmounted(stop);

  return stop;
}

export default function useClickOutside() {
  function onClickOutside(target: any, callback: EventListener) {
    const listener = (event: Event) => {
      const el = unrefElement(target);
      if (!el) return;

      if (el === event.target || event.composedPath().includes(el)) return;

      callback(event);
    };

    let disposables = EVENTS.map((event) =>
      useEventListener(window, event, listener, { passive: true })
    );

    const stop = () => {
      disposables.forEach((dispose) => dispose && dispose());
      disposables = [];
    };

    onUnmounted(stop);

    return stop;
  }

  return {
    onClickOutside,
  };
}

import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  MatFullscreenExitOutlined,
  MatFullscreenOutlined,
} from "@qwikest/icons/material";
import styles from "./full-screen-button.module.scss";

export const FullScreenButton = component$(() => {
  const isFullscreen = useSignal<boolean>(false);

  const toggleFullScreen = $(() => {
    if (isFullscreen.value) {
      isFullscreen.value = false;
      document.exitFullscreen();
    } else {
      isFullscreen.value = true;
      document.documentElement.requestFullscreen();
    }
  });

  const handleKeyDown = $((event: KeyboardEvent) => {
    if (event.key === "F5" && event.shiftKey) {
      void toggleFullScreen();
    }
  });

  // NB: useOnDocument causes a sort of loop, so we need to use useVisibleTask instead
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    document.addEventListener("keydown", handleKeyDown);

    cleanup(() => {
      document.removeEventListener("keydown", handleKeyDown);
    });
  });

  return (
    <button onClick$={toggleFullScreen} class={styles.fullScreenButton}>
      {!isFullscreen.value && <MatFullscreenOutlined />}
      {isFullscreen.value && <MatFullscreenExitOutlined />}
    </button>
  );
});

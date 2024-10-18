import { $, component$, useSignal } from "@builder.io/qwik";
import {
  MatFullscreenExitOutlined,
  MatFullscreenOutlined,
} from "@qwikest/icons/material";
import styles from "./full-screen-button.module.scss";

export const FullScreenButton = component$(() => {
  const isFullscreen = useSignal<boolean>(false);

  const toggleFullScreen = $(() => {
    console.log("toggleFullScreen");
    if (isFullscreen.value) {
      isFullscreen.value = false;
      document.exitFullscreen();
    } else {
      isFullscreen.value = true;
      document.documentElement.requestFullscreen();
    }
  });

  return (
    <button onClick$={toggleFullScreen} class={styles.fullScreenButton}>
      {!isFullscreen.value && <MatFullscreenOutlined />}
      {isFullscreen.value && <MatFullscreenExitOutlined />}
    </button>
  );
});

import { $, component$, useStore } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import {
  MatChevronLeftRound,
  MatChevronRightRound,
  MatFullscreenExitOutlined,
  MatFullscreenOutlined,
} from "@qwikest/icons/material";
import { Button } from "~/components/ui/button/button";
import { config } from "~/config";
import { getRandomTopic } from "~/db/topics";
import type { State } from "~/models/state.models";
import styles from "./index.module.scss";

export default component$(() => {
  const location = useLocation();
  const state = useStore<State>({
    level: parseInt(location.url.searchParams.get("level") ?? "1"),
    language: location.url.searchParams.get("language") ?? "it",
    slides: parseInt(location.url.searchParams.get("slides") ?? "5"),
    orientation:
      (location.url.searchParams.get("orientation") as unknown as
        | "landscape"
        | "portrait"
        | undefined) ?? "landscape",
    currentSlide: 0,
    title: getRandomTopic(
      parseInt(location.url.searchParams.get("level") ?? "1"),
    ),
    isFullscreen: true,
  });

  const prevSlide = $(() => {
    if (state.currentSlide > 1) {
      state.currentSlide--;
    }
  });

  const nextSlide = $(() => {
    if (state.currentSlide < state.slides) {
      state.currentSlide++;
    }
  });
  const toggleImageSize = $(() => {
    state.isFullscreen = !state.isFullscreen;
  });

  return (
    <div class={styles.presentation}>
      {state.currentSlide > 0 && <h2 class={styles.title}>{state.title}</h2>}

      <div class={styles.content}>
        {state.currentSlide === 0 && (
          <div>
            <p class={styles.preview}>
              You have {state.slides} slides to talk about{" "}
            </p>
            <h1 class={styles.titlePreview}>{state.title}</h1>
            <p class={styles.preview}>
              Just click the button below and start improvising!
            </p>
            <Button classOverride={styles.start} onClick$={nextSlide}>
              Start
            </Button>
          </div>
        )}
        {Array.from({ length: state.slides }, (_, i) => i + 1).map((i) => (
          <>
            <img
              key={`image-${i}`}
              src={config.apis.randomImage(state.orientation) + `&${i}`}
              width={state.orientation === "landscape" ? 1280 : 720}
              height={state.orientation === "landscape" ? 720 : 1280}
              alt="Random generated"
              class={styles.image}
              style={{
                display:
                  !state.isFullscreen && state.currentSlide === i
                    ? "block"
                    : "none",
              }}
            />
            <div
              key={`bg-image-${i}`}
              style={{
                backgroundImage: `url(${config.apis.randomImage(state.orientation)}&${i})`,
                display:
                  state.isFullscreen && state.currentSlide === i
                    ? "block"
                    : "none",
              }}
              class={styles.backgroundImage}
            />
          </>
        ))}
      </div>

      {state.currentSlide > 0 && (
        <div class={styles.controls}>
          <Button
            classOverride={styles.resizeImage}
            onClick$={toggleImageSize}
            variant="clean"
          >
            {!state.isFullscreen && <MatFullscreenOutlined />}
            {state.isFullscreen && <MatFullscreenExitOutlined />}
          </Button>
          <Button
            disabled={state.currentSlide <= 1}
            onClick$={prevSlide}
            variant="clean"
          >
            <MatChevronLeftRound />
          </Button>
          <span>{state.currentSlide}</span>
          <Button
            disabled={state.currentSlide >= state.slides}
            variant="clean"
            onClick$={nextSlide}
          >
            <MatChevronRightRound />
          </Button>
        </div>
      )}
    </div>
  );
});

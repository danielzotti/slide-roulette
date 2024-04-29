import { $, component$, useStore } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
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
      (location.url.searchParams.get("orientation") as State["orientation"]) ??
      "landscape",
    currentSlide: 0,
    title: getRandomTopic(
      parseInt(location.url.searchParams.get("level") ?? "1"),
    ),
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

  return (
    <div class={styles.presentation}>
      {state.currentSlide > 0 && <h1 class={styles.title}>{state.title}</h1>}

      <div class={styles.content}>
        {/*<pre>{JSON.stringify(state, null, 2)}</pre>*/}

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
          <img
            key={i}
            src={config.apis.randomImage(state.orientation) + `&${i}`}
            width={state.orientation === "landscape" ? 1280 : 720}
            height={state.orientation === "landscape" ? 720 : 1280}
            alt="Random generated"
            style={{ display: state.currentSlide === i ? "block" : "none" }}
          />
        ))}
      </div>

      <div class={styles.controls}>
        {state.currentSlide > 0 && (
          <>
            <Button disabled={state.currentSlide <= 1} onClick$={prevSlide}>
              Prev
            </Button>
            <span>{state.currentSlide}</span>
            <Button
              disabled={state.currentSlide >= state.slides}
              onClick$={nextSlide}
            >
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
});

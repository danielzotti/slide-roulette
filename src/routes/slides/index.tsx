import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import {
  MatChevronLeftRound,
  MatChevronRightRound,
  MatFullscreenExitOutlined,
  MatFullscreenOutlined,
} from "@qwikest/icons/material";
import { Button } from "~/components/ui/button/button";
import { FragmentWithKey } from "~/components/ui/fragment-with-key/FragmentWithKey";
import { config } from "~/config";
import { getRandomTopic } from "~/db/topics";
import type { State } from "~/models/state.models";
import { getUnsplashImages } from "~/utils/images";

import styles from "./index.module.scss";

export default component$(() => {
  const location = useLocation();

  const state = useStore<State>({
    level: parseInt(location.url.searchParams.get("level") ?? "1"),
    language: location.url.searchParams.get("language") ?? "it",
    slidesCount: parseInt(location.url.searchParams.get("slidesCount") ?? "5"),
    slides: [],
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

  const loadedImagesCount = useSignal<number>(0);
  const hasError = useSignal(false);
  const hasLoadedAllImages = useComputed$(
    () => loadedImagesCount.value >= state.slidesCount,
  );
  const photographer = useComputed$<{ name: string; nickname: string } | null>(
    () => {
      const slide = state.slides[state.currentSlide - 1];
      if (
        !slide ||
        slide.source !== "unsplash" ||
        (!slide.photographerName && !slide.photographerNickname)
      ) {
        return null;
      }
      return {
        name: slide.photographerName!,
        nickname: slide.photographerNickname!,
      };
    },
  );

  const prevSlide = $(() => {
    if (state.currentSlide > 1) {
      state.currentSlide--;
    }
  });

  const nextSlide = $(() => {
    if (state.currentSlide < state.slidesCount) {
      state.currentSlide++;
    }
  });
  const toggleImageSize = $(() => {
    state.isFullscreen = !state.isFullscreen;
  });

  useTask$(async () => {
    try {
      state.slides = await getUnsplashImages({
        orientation: state.orientation,
        count: state.slidesCount,
      });
      if (state.slides.length === 0) {
        hasError.value = true;
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      hasError.value = true;
    }
  });

  if (hasError.value) {
    return (
      <div class={styles.error}>
        There might be a problem with{" "}
        <a href={config.websites.unsplash.status} target="_blank">
          Unsplash
        </a>{" "}
        (the service used to retrieve images). Please, try again later.
      </div>
    );
  }

  const onLoadedImage = $(() => {
    loadedImagesCount.value++;
  });

  return (
    <div class={styles.presentation}>
      {state.currentSlide > 0 && <h2 class={styles.title}>{state.title}</h2>}

      <div class={styles.content}>
        {state.currentSlide === 0 && (
          <div>
            <p class={styles.preview}>
              You have {state.slidesCount} slides to talk about{" "}
            </p>
            <h1 class={styles.titlePreview}>{state.title}</h1>
            <p class={styles.preview}>
              Just click the button below and start improvising!
            </p>
            <Button
              classOverride={styles.start}
              onClick$={nextSlide}
              disabled={!hasLoadedAllImages.value}
            >
              Start
            </Button>
            <p>
              <small>
                {!hasLoadedAllImages.value && "Loading images..."} &nbsp;
              </small>
            </p>
          </div>
        )}
        {state.slides.map(({ id, url }, i) => (
          <FragmentWithKey key={`fragment-${id}`}>
            <img
              key={`image-${id}`}
              src={url}
              width={state.orientation === "landscape" ? 1280 : 720}
              height={state.orientation === "landscape" ? 720 : 1280}
              alt="Random generated"
              class={styles.image}
              onLoad$={() => onLoadedImage()}
              style={{
                display:
                  !state.isFullscreen && state.currentSlide === i + 1
                    ? "block"
                    : "none",
              }}
            />
            <div
              key={`bg-image-${id}`}
              style={{
                backgroundImage: `url(${url})`,
                display:
                  state.isFullscreen && state.currentSlide === i + 1
                    ? "block"
                    : "none",
              }}
              class={styles.backgroundImage}
            />
          </FragmentWithKey>
        ))}
      </div>

      {state.currentSlide > 0 && (
        <>
          {photographer.value && (
            <div class={styles.photographer}>
              Photo by{" "}
              <a
                href={config.websites.unsplash.photographer(
                  photographer.value.nickname,
                )}
                target="_blank"
              >
                {photographer.value.name}
              </a>{" "}
              {/*on <a href={config.websites.unsplash.homepage}>Unsplash</a>*/}
            </div>
          )}
          <div class={styles.controls}>
            <Button onClick$={toggleImageSize} variant="clean">
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
              disabled={state.currentSlide >= state.slidesCount}
              variant="clean"
              onClick$={nextSlide}
            >
              <MatChevronRightRound />
            </Button>
          </div>
        </>
      )}
    </div>
  );
});

import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import {
  MatChevronLeftRound,
  MatChevronRightRound,
  MatFullscreenExitOutlined,
  MatFullscreenOutlined,
} from "@qwikest/icons/material";
import Header from "~/components/header/header";
import { Button } from "~/components/ui/button/button";
import { FragmentWithKey } from "~/components/ui/fragment-with-key/FragmentWithKey";
import { config } from "~/config";
import type { State } from "~/models/state.models";
import { fireworks } from "~/utils/confetti";
import { getUnsplashImages } from "~/utils/images";
import { getRandomTopic } from "~/utils/topics";
import chuckSrc from "../../../public/images/ui/chuck.png";
import youDidItSrc from "../../../public/images/ui/goldblum.png";

import styles from "./index.module.scss";

export default component$(() => {
  const location = useLocation();
  const navigate = useNavigate();

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
    title: getRandomTopic({
      lang: location.url.searchParams.get("language") ?? "it",
      level: parseInt(location.url.searchParams.get("level") ?? "1"),
    }),
    isFullscreen: false,
  });

  const loadedImagesCount = useSignal<number>(0);
  const hasError = useSignal(false);
  const hasLoadedAllImages = useComputed$(
    () => loadedImagesCount.value >= state.slidesCount,
  );
  const isFinalPage = useComputed$(
    () => state.currentSlide === state.slidesCount + 1,
  );
  const photographer = useComputed$<{ name: string; nickname: string } | null>(
    () => {
      const slide = state.slides.at(state.currentSlide - 1);
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
    if (state.currentSlide <= state.slidesCount) {
      state.currentSlide++;
    }
  });
  const toggleImageSize = $(() => {
    state.isFullscreen = !state.isFullscreen;
  });

  const restart = $(() => {
    window.location.reload();
  });

  const newGame = $(() => {
    void navigate("/");
  });

  const onLoadedImage = $(() => {
    loadedImagesCount.value++;
  });

  const handleKeyDown = $((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
      case " ":
        hasLoadedAllImages.value && void nextSlide();
        break;
      case "ArrowLeft":
        void prevSlide();
        break;
      case "ArrowUp":
        void toggleImageSize();
        break;
      case "Home":
        state.currentSlide = 1;
        break;
      case "End":
        state.currentSlide = state.slidesCount;
        break;
      case "Escape":
        void navigate("/");
        break;
      case "Enter":
        state.currentSlide === state.slidesCount && void restart();
        state.currentSlide === 0 && void nextSlide();
        break;
    }
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

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    track(() => isFinalPage.value);
    if (isFinalPage.value) {
      void fireworks({ durationInSeconds: 6 });
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

  return (
    <>
      {(!state.isFullscreen ||
        state.currentSlide === 0 ||
        state.currentSlide > state.slidesCount) && <Header />}
      {state.currentSlide <= state.slidesCount && (
        <div
          class={state.currentSlide > 0 && styles.presentation}
          style={{ paddingTop: state.isFullscreen ? 0 : "60px" }}
        >
          {state.currentSlide === 0 && (
            <div class={styles.intro}>
              <p class={styles.preview}>
                You have <strong>{state.slidesCount} SLIDES</strong> to talk
                about{" "}
              </p>
              <div class={styles.titlePreview}>
                <h1 class="title--main">{state.title}</h1>
              </div>
              <div class={styles.challengeAcceptedImage}>
                <img
                  src={chuckSrc}
                  alt={"Chuck Norris with his hat"}
                  width={919}
                  height={665}
                />
                <Button
                  classOverride={styles.challengeAcceptedButton}
                  onClick$={nextSlide}
                  disabled={!hasLoadedAllImages.value}
                  variant="primary"
                  rounded
                >
                  {hasLoadedAllImages.value && (
                    <span>Now let's kick this butt!</span>
                  )}
                  {!hasLoadedAllImages.value && (
                    <p>
                      <small>{"Loading images..."} &nbsp;</small>
                    </p>
                  )}
                </Button>
              </div>
            </div>
          )}
          {state.currentSlide > 0 && (
            <h2 class={styles.title}>{state.title}</h2>
          )}

          <div
            class={styles.content}
            style={{
              position: !state.isFullscreen ? "relative" : "static",
            }}
          >
            {state.slides.map(({ id, url }, i) => (
              <FragmentWithKey key={`fragment-${id}`}>
                <img
                  key={`image-${id}`}
                  src={url}
                  width={
                    state.orientation === "landscape"
                      ? config.unsplash.imageWidth
                      : config.unsplash.imageHeight
                  }
                  height={
                    state.orientation === "landscape"
                      ? config.unsplash.imageHeight
                      : config.unsplash.imageWidth
                  }
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
              {state.currentSlide <= state.slidesCount && (
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
                  <div class={styles.number}>
                    {state.currentSlide <= state.slidesCount && (
                      <>
                        <span>{state.currentSlide}</span>
                        <small>/{state.slidesCount}</small>
                      </>
                    )}
                  </div>
                  <Button
                    disabled={state.currentSlide > state.slidesCount}
                    variant="clean"
                    onClick$={nextSlide}
                  >
                    <MatChevronRightRound />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
      {state.currentSlide > state.slidesCount && (
        <div class={styles.final}>
          <div class={styles.restart}>
            <div class={styles.youDidIt}>
              <p class="title--simple">You did it.</p>
              <br />
              <p class="title--simple">The crazy son of a b*tch, you did it!</p>
              <br />
              <img
                src={youDidItSrc}
                alt={
                  "You Did It. The Crazy Son of a Bitch, You Did It! (quote from Jurassic Park)"
                }
                width={800}
                height={450}
              />
              <div class={styles.restartButtonsWrapper}>
                <Button
                  onClick$={newGame}
                  variant="secondary"
                  size="small"
                  rounded
                  classOverride={styles.newGameButton}
                >
                  New game
                </Button>
                <Button
                  onClick$={restart}
                  variant="primary"
                  classOverride={styles.tryAgainButton}
                  rounded
                >
                  Try again!
                </Button>
              </div>
            </div>
          </div>
          {/*<div class={styles.newGame}>*/}
          {/*  you can also <Link href={"/"}>start</Link> with a new configuration*/}
          {/*  or go <Link onClick$={prevSlide}>back</Link> to the last slide*/}
          {/*</div>*/}
        </div>
      )}
    </>
  );
});

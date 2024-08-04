import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link, useLocation, useNavigate } from "@builder.io/qwik-city";
import {
  MatChevronLeftRound,
  MatChevronRightRound,
  MatFullscreenExitOutlined,
  MatFullscreenOutlined,
} from "@qwikest/icons/material";
import { Button } from "~/components/ui/button/button";
import { FragmentWithKey } from "~/components/ui/fragment-with-key/FragmentWithKey";
import { config } from "~/config";
import type { State } from "~/models/state.models";
import { fireworks } from "~/utils/confetti";
import { getUnsplashImages } from "~/utils/images";
import { getRandomTopic } from "~/utils/topics";

import styles from "./index.module.scss";
import youDidItSrc from "../../../public/images/you-did-it.jpg";
import challengeAcceptedSrc from "../../../public/images/challenge-accepted.gif";

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
    isFullscreen: true,
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

  const goToHome = $(() => {
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

  useTask$(async ({ track }) => {
    track(() => isFinalPage.value);
    if (isFinalPage.value) {
      fireworks({ durationInSeconds: 6 });
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
    <div class={styles.presentation}>
      {state.currentSlide > 0 && <h2 class={styles.title}>{state.title}</h2>}

      <div class={styles.content}>
        {state.currentSlide === 0 && (
          <div>
            <p class={styles.preview}>
              You have {state.slidesCount} slides to talk about{" "}
            </p>
            <h1 class={styles.titlePreview}>{state.title}</h1>
            <Button
              classOverride={styles.start}
              onClick$={nextSlide}
              disabled={!hasLoadedAllImages.value}
            >
              <div class={styles.challengeAcceptedButton}>
                <div class={styles.challengeAcceptedImage}>
                  <img
                    src={challengeAcceptedSrc}
                    alt={"Challenge Accepted! meme"}
                    width={498}
                    height={399}
                  />
                </div>
                Start
              </div>
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
        {state.currentSlide === state.slidesCount + 1 && (
          <>
            <div class={styles.restart}>
              <div class={styles.youDidIt}>
                <img
                  src={youDidItSrc}
                  alt={
                    "You Did It. The Crazy Son of a Bitch, You Did It! (quote from Jurassic Park)"
                  }
                  width={800}
                  height={450}
                />
                <p>You Did It. The Crazy Son of a Bitch, You Did It!</p>
              </div>

              <Button onClick$={restart} variant="primary">
                Try again
              </Button>
            </div>
            <div class={styles.newGame}>
              or <Link href={"/"}>start</Link> with a new configuration
            </div>
          </>
        )}
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
            <div
              class={`${styles.number} ${state.currentSlide === state.slidesCount + 1 ? "last" : ""}`}
            >
              {state.currentSlide === state.slidesCount + 1 && "💪"}
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
        </>
      )}
    </div>
  );
});

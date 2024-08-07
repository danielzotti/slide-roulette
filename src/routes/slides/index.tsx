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
import challengeAcceptedSrc from "../../../public/images/challenge-accepted.png";

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
      {state.currentSlide <= state.slidesCount && (
        <div class={state.currentSlide > 0 && styles.presentation}>
          {state.currentSlide === 0 && (
            <div class={styles.intro}>
              <p class={styles.preview}>
                You have {state.slidesCount} slides to talk about{" "}
              </p>
              <h1 class={styles.titlePreview}>{state.title}</h1>
              <div class={styles.challengeAcceptedImage}>
                <img
                  src={challengeAcceptedSrc}
                  alt={"Challenge Accepted! meme"}
                  width={498}
                  height={399}
                />
              </div>

              {/*<svg
                class={styles.challengeAcceptedImageSvg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 717.4 955.8"
              >
                <g id="challenge-accepted">
                  <path
                    id="path"
                    d="M457.1,900.7c-2.7-29.2-6.6-54.7-8.5-56.6-1.9-1.9-30.6,4.8-63.7,14.9-46.5,14.2-59.7,19.9-58.1,25,1.1,3.6,3.3,11.5,4.8,17.5,2.6,10.2,2.4,10.3-2.7,2.2-8.5-13.6-15.7-19.7-23.3-19.7s-15.5,16.5-12,25.8c1.6,4.1.5,5-3.1,2.8-3.3-2-4.4-7.6-2.8-13.8,1.8-7.3.8-10.4-3.5-10.4-7.5,0-14.4,8-17.1,19.7-1.1,4.9-1.6,3.4-1.2-3.4.5-6.7-1.8-14.3-4.9-16.9-11.3-9.4-6.6-32.2,12.6-61.1,20.4-30.8,74.4-86.3,103-106,32.2-22.1,24-9.6-12.6,19.2-55,43.3-110.7,117.2-103.2,136.9,4.2,10.9,10.8,8.8,18.3-5.7,7.9-15.3,14.1-17.1,102.4-30.2,34.6-5.1,63.8-10.2,64.9-11.2,2.8-2.8-24.3-92.7-33.2-110.1l-7.7-15-52.2-1.4c-31.3-.8-63.6-4.4-80.6-8.9-124-33-217.2-121.7-253.5-241.3-5-16.3-10.9-35.7-13.1-43.1-5.2-16.9-5.4-109.7-.3-112.9,2.1-1.3,5.1-10.3,6.6-19.9,8.1-50.8,48-123.8,92.2-168.7C154.5,57.4,218.4,22.2,287.4,7.5c44.9-9.5,134.1-5.8,175.3,7.3,157.3,50.1,254.3,180.9,252.6,340.6-.4,35.9-3.2,60.1-9.8,84.9-31.2,116.9-120.9,211.9-231.9,245.4-20.4,6.2-40.1,12.2-43.7,13.4-3.6,1.2,10.5,5.8,31.3,10.1,41.8,8.6,103,27.5,123.6,38.1,20.1,10.4,41.7,27.8,41.7,33.7s4.9,9.9,10.9,15.5,10.9,12.2,10.9,14.6-4.5,0-10.1-5.1c-13.5-12.7-22.4-12.5-18.4.3,7.1,23.1,8,30.8,3,27.7-2.8-1.7-5-6.5-5-10.7,0-8.2-7.9-18.1-14.5-18.1s-2.7,6.9-1.1,15.3c1.8,9.5,1.2,15.3-1.7,15.3s-4.6-4.8-4.6-10.7-1.5-11.5-3.3-12.6c-1.8-1.1-32.8,4.3-68.8,11.8l-65.5,13.8,1.4,12.6c4,37,7.2,102.9,5,102.9s-4.8-23.9-7.5-53.1h0ZM294.5,870.5c0-2.3-2-4.1-4.4-4.1s-4.4,3.1-4.4,6.8,2,5.6,4.4,4.1c2.4-1.5,4.4-4.5,4.4-6.8ZM312,868.2c0-3.8-2.3-6.1-5.2-5.2-8.1,2.7-9.4,12.1-1.7,12.1s6.9-3.1,6.9-6.9h0ZM358.1,860c30.1-10.7,27.1-11.4-17.7-4.3-20.6,3.3-25.1,5.6-21.7,11,3.5,5.7,5.3,5.4,39.4-6.7ZM521.6,807.4c32.2-10.8,67-20,77.3-20.4,12.2-.5,18.7-2.7,18.7-6.5,0-15.2-93.3-52.7-157.4-63.3-17.1-2.8-33.7-7.7-36.8-10.8-9.6-9.6-11.1-1.4-2.6,15.2,6.8,13.3,13,31.9,33.3,99.9q2.3,7.7,67.4-14.2h0ZM575.5,804.4c13.2-6.9,4.7-9.1-13.2-3.4-22.8,7.3-29.9,14.9-10.1,10.8,8.4-1.7,18.9-5.1,23.3-7.4ZM397.2,696c1.5-2.5-2.4-13.3-8.7-24-6.3-10.7-9.4-19.5-6.9-19.5s10,9.9,16.6,22c11.6,21.2,12.6,21.9,27.3,19.4,23.2-3.9,69.4-19.5,93.9-31.7,70.4-35.2,126.2-92.6,159.1-163.4,23.8-51.4,32.3-88.7,32.5-143.3.2-47.9-5.5-82.8-19.8-121l-8.5-22.7-16.5,16.5c-19.3,19.3-48.9,29.2-74.7,25.1-50.9-8.1-93.5-35.9-110.4-71.9l-9.2-19.5,9-15.7c13.8-24.2,41.1-37.6,75.6-37.1,16,.2,35.8,3.6,45.4,7.7,9.4,4,17.9,6.5,18.8,5.5,2.9-2.9-41.2-42.5-65.6-58.9C462.6.9,331-11.6,225.5,31.9c-80.7,33.3-147.5,97.2-184.8,176.9C22.8,247,6.4,316.3,6.4,353.3s15.2,101.1,31.5,137.6c56.2,125.9,182.2,207.6,323,209.2,18.8.2,34.8-1.6,36.4-4.1h0ZM534.4,382.3c17-16.5,30.9-33.4,30.9-37.7,0-7-3-7.5-29.5-4.8-48.4,4.9-99.8,20.1-194.3,57.3-4.2,1.7-7.6,1-7.6-1.4,0-4.3,87.4-38,132.8-51.2,33.1-9.6,90.1-15.5,99.9-10.2,14.6,7.8-1.6,36.3-35.6,62.8-31.5,24.5-29.8,17.4,3.5-14.8h0ZM277.3,378.6c-.2-5.3,1.7-10.8,4.1-12.3,5.2-3.2,5.2,1.1,0,13.1-3.6,8.4-3.8,8.4-4.1-.8h0ZM630.8,342.2c0-8.5-3.2-19.9-7.1-25.4-10.1-14.3-4.5-16.5,6.5-2.5,9.9,12.6,11.7,26.2,4.9,36.8-3.2,4.9-4.3,2.7-4.3-8.9h0ZM231.9,227.2c-25.1-7.1-40.9-18-54.2-37.6-15.7-23-13.1-37.4,10.9-61.2,47.6-47.2,139.7-57,193.8-20.5,66.3,44.7,9.9,118.5-94.4,123.6-21.5,1.1-43.1-.6-56-4.2h0ZM341.7,217.4c21.1-6.9,62.8-37.4,57.6-42.1-1.2-1.1-23.8.6-50.2,3.7-28.2,3.3-73.8,4.9-110.3,3.8l-62.3-1.9,6.5,10c8,12.2,34.4,27.5,57.3,33.3,23.1,5.8,73.2,2.5,101.3-6.8h0ZM283.2,165.6c-2.8-11.3,7.7-24.2,19.6-24.2s23.5,15.2,20,26.3c-2.9,9.1-2.1,9.3,22.5,6.6,59.6-6.5,58.3-6,58.3-21.8s-1.7-14.7-13.6-17.1c-31.1-6.2-139.4-1.3-195.2,8.8-15.6,2.8-24.9,17.1-17.3,26.5,4.3,5.4,60.7,9.2,91.9,6.3,14.5-1.4,16.1-2.7,13.9-11.4h0ZM242,132.8c20.4-2.4,63.1-4.4,95-4.4s58-1.5,57.9-3.3c0-7.2-30-23-56.6-29.8-30.7-7.9-56.9-6.6-94.4,4.5-34.5,10.2-79.1,46.4-48.8,39.6,5.4-1.2,26.5-4.2,46.8-6.6h0ZM649.1,237.1c15.1-7.7,25.4-19.5,25.4-29.2s-16.2-5.4-36-7c-33.3-2.8-119.1-16.5-141.9-22.8-11.9-3.3-12.3,1-1.8,17,11.8,17.9,39,36.3,66.2,44.7,13.2,4.1,26,8.1,28.4,9,9,3.2,44-3.6,59.8-11.6h0ZM668,185.3c-8.6-16.6-16-20.4-48.1-24.2l-26.2-3.1,10,9.6c6.4,6.1,9.1,12.5,7.4,17.7-2.8,9,4.9,11.2,42.7,12.4l20.9.7-6.7-13h0ZM574.9,170.4l11.8-14.8-20.5-2.6c-71.3-9-78.3-8.9-81.6,1.4-4.1,13-.5,15.6,32.7,23.3,41,9.5,44.5,9.1,57.6-7.4h0ZM643.5,147.6c-34-36.4-110.4-45.4-142.9-16.8l-11.8,10.4,17.5.4c9.6.2,41.1,4,69.9,8.3,28.8,4.3,58.2,8.1,65.2,8.4l12.8.6-10.6-11.3h0Z"
                  />
                </g>
              </svg>*/}

              <Button
                classOverride={styles.challengeAcceptedButton}
                onClick$={nextSlide}
                disabled={!hasLoadedAllImages.value}
              >
                Challenge accepted!
              </Button>
              <p>
                <small>
                  {!hasLoadedAllImages.value && "Loading images..."} &nbsp;
                </small>
              </p>
            </div>
          )}
          {state.currentSlide > 0 && (
            <h2 class={styles.title}>{state.title}</h2>
          )}

          <div class={styles.content}>
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
                    opacity:
                      state.isFullscreen && state.currentSlide === i + 1
                        ? "1"
                        : "0",
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
              <img
                src={youDidItSrc}
                alt={
                  "You Did It. The Crazy Son of a Bitch, You Did It! (quote from Jurassic Park)"
                }
                width={800}
                height={450}
              />
              <p>You did it. The crazy son of a b*tch, you did it!</p>
            </div>

            <Button onClick$={restart} variant="primary">
              Try again
            </Button>
          </div>
          <div class={styles.newGame}>
            you can also <Link href={"/"}>start</Link> with a new configuration
            or go <Link onClick$={prevSlide}>back</Link> to the last slide
          </div>
        </div>
      )}
    </>
  );
});

import { server$ } from "@builder.io/qwik-city";
import { config } from "~/config";
import type { SlideImage } from "~/models/slide.models";
import type { State } from "~/models/state.models";
import type { UnsplashImage } from "~/models/unsplash.models";
import {
  getRandomNumberArrayInRange,
  getRandomNumberInRange,
  randomize,
} from "~/utils/math";

export const getUnsplashImages = server$(async function ({
  orientation,
  count,
}: {
  orientation: State["orientation"];
  count: number;
}): Promise<Array<SlideImage>> {
  // return getRandomLocalImages({ orientation, count });
  try {
    const w =
      orientation === "landscape"
        ? config.unsplash.imageWidth
        : config.unsplash.imageHeight;
    const h =
      orientation === "landscape"
        ? config.unsplash.imageHeight
        : config.unsplash.imageWidth;
    const response = await fetch(
      `${config.apis.unsplash}?&orientation=${orientation}&count=${count}&topics=${Object.values(config.unsplash.topics).join(",")}&client_id=${this.env.get("UNSPLASH_API_KEY")}`, // See https://qwik.dev/docs/env-variables/
    );
    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()));
    }
    const images = await response.json();

    return images.map(
      (image: UnsplashImage) =>
        ({
          id: image.id,
          url: `${image.urls.raw}&fit=crop&w=${w}&h=${h}&f=jpg&q=90`,
          orientation,
          source: "unsplash",
          photographerName: image.user.username,
          photographerNickname: image.user.username,
        }) satisfies SlideImage,
    );
  } catch (e) {
    console.error("Error fetching images from Unsplash:", e);
    return getRandomLocalImages({ orientation, count });
  }
});

export const getUnsplashImagesWithSpecificTopics = server$(async function ({
  orientation,
  count,
}: {
  orientation: State["orientation"];
  count: number;
}): Promise<Array<SlideImage>> {
  try {
    const w =
      orientation === "landscape"
        ? config.unsplash.imageWidth
        : config.unsplash.imageHeight;
    const h =
      orientation === "landscape"
        ? config.unsplash.imageHeight
        : config.unsplash.imageWidth;

    const topicsCount = Object.keys(config.unsplash.topics).length;

    let randomTopics: Array<number> = [];

    if (count <= topicsCount) {
      const topicsSet = new Set<number>();
      while (topicsSet.size <= count) {
        topicsSet.add(
          getRandomNumberInRange(
            0,
            Object.values(config.unsplash.topics).length - 1,
          ),
        );
      }
      randomTopics = [...topicsSet];
    } else {
      const div = Math.floor(count / topicsCount);
      const mod = count % topicsCount;
      for (let i = 0; i < div; i++) {
        randomTopics = [
          ...randomTopics,
          ...randomize(
            Array.from({ length: topicsCount }, (_, index) => index),
          ),
        ];
      }
      const topicsSet = new Set<number>();
      while (topicsSet.size <= mod) {
        topicsSet.add(
          getRandomNumberInRange(
            0,
            Object.values(config.unsplash.topics).length - 1,
          ),
        );
      }
      randomTopics = [...randomTopics, ...topicsSet];
    }

    const response = await Promise.all(
      randomTopics.map(async (topic) => {
        return await fetch(
          `${config.apis.unsplash}?&orientation=${orientation}&topics=${Object.values(config.unsplash.topics)[topic]}&client_id=${this.env.get("UNSPLASH_API_KEY")}`, // See https://qwik.dev/docs/env-variables/
        );
      }),
    );

    const imagesPromises = response.map(async (res) => {
      if (!res.ok) {
        throw new Error(JSON.stringify(await res.json()));
      }
      return res.json();
    });

    const images = await Promise.all(imagesPromises);

    return images.map(
      (image: UnsplashImage) =>
        ({
          id: image.id,
          url: `${image.urls.raw}&fit=crop&w=${w}&h=${h}&f=jpg&q=90`,
          orientation,
          source: "unsplash",
          photographerName: image.user.username,
          photographerNickname: image.user.username,
        }) satisfies SlideImage,
    );
  } catch (e) {
    console.error("Error fetching images from Unsplash:", e);
    return getRandomLocalImages({ orientation, count });
  }
});

export const getRandomLocalImages = server$(
  ({
    orientation,
    count,
  }: {
    orientation: State["orientation"];
    count: number;
  }): Array<SlideImage> => {
    return getRandomNumberArrayInRange(1, 100, count).map(
      (n) =>
        ({
          id: n.toString(),
          url: `${config.folders.slides[orientation]}/${orientation}-${n}.jpg`,
          orientation,
          source: "local",
          // photographerName: "Daniel Zotti",
          // photographerNickname: "danielzotti",
        }) satisfies SlideImage,
    );
  },
);

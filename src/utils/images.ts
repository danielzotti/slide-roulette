import { server$ } from "@builder.io/qwik-city";
import { config } from "~/config";
import type { SlideImage } from "~/models/slide.models";
import type { State } from "~/models/state.models";
import type { UnsplashImage } from "~/models/unsplash.models";
import { getRandomNumberArrayInRange } from "~/utils/math";

export const getUnsplashImages = server$(async function ({
  orientation,
  count,
}: {
  orientation: State["orientation"];
  count: number;
}): Promise<Array<SlideImage>> {
  try {
    const response = await fetch(
      `${config.apis.unsplash}?&orientation=${orientation}&count=${count}&topics=${Object.values(config.unsplash_topics).join(",")}&client_id=${this.env.get("UNSPLASH_API_KEY")}`, // See https://qwik.dev/docs/env-variables/
    );
    if (!response.ok) {
      throw new Error(JSON.stringify(await response.json()));
    }
    const images = await response.json();
    const w = orientation === "landscape" ? 1280 : 720;
    const h = orientation === "landscape" ? 720 : 1280;

    return images.map(
      (image: UnsplashImage) =>
        ({
          id: image.id,
          url: `${image.urls.raw}?fit=crop&w=${w}&h=${h}&min-w=${w}&min-h=${h}&f=jpg&q=90`,
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

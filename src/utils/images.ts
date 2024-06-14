import { server$ } from "@builder.io/qwik-city";
import { config } from "~/config";
import type { SlideImage } from "~/models/slide.models";
import type { State } from "~/models/state.models";
import type { UnsplashImage } from "~/models/unsplash.models";
import { getRandomNumberArrayInRange } from "~/utils/math";

import { promises as fs } from "fs";

export const getRandomLocalImages = server$(
  async ({
    orientation,
    count,
  }: {
    orientation: SlideImage["orientation"];
    count: number;
  }) => {
    const fileNames = await fs.readdir(
      process.cwd() + `/public${config.folders.slides[orientation]}`,
    );
    return getRandomNumberArrayInRange(0, fileNames.length - 1, count).map(
      (n) =>
        ({
          id: fileNames[n]?.split("-")[1].split(".")[0] ?? n,
          source: "local",
          orientation,
          url: `${config.folders.slides[orientation]}/${fileNames[n]}`,
        }) as SlideImage,
    );
  },
);

export const getUnsplashImages = server$(
  async ({
    orientation,
    count,
  }: {
    orientation: State["orientation"];
    count: number;
  }): Promise<Array<SlideImage>> => {
    try {
      const response = await fetch(
        `${config.apis.unsplash}?&orientation=${orientation}&count=${count}&client_id=${process.env.UNSPLASH_API_KEY}XXX`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch images from Unsplash");
      }
      const images = await response.json();
      const w = orientation === "landscape" ? 1280 : 720;
      const h = orientation === "landscape" ? 720 : 1280;

      const urls = images.map(
        (image: UnsplashImage) =>
          ({
            id: image.id,
            url: `${image.urls.raw}?fit=crop&w=${w}&h=${h}&min-w=${w}&min-h=${h}&f=jpg&q=90`,
            orientation,
            source: "unsplash",
          }) satisfies SlideImage,
      );
      return urls;
    } catch (e) {
      return getRandomLocalImages({ orientation, count });
    }
  },
);

export const getLocalImagesUsingPublicUrl = server$(
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
        }) satisfies SlideImage,
    );
  },
);

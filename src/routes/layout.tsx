import { component$, Slot } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { FullScreenButton } from "~/components/full-screen-button/full-screen-button";
import { config } from "~/config";

import styles from "./layout.module.scss";

export default component$(() => {
  return (
    <>
      <FullScreenButton />
      <main class={styles.page}>
        <Slot />
      </main>
    </>
  );
});

export const head: DocumentHead = {
  title: config.title,
  meta: [
    {
      name: config.title,
      content: config.description,
    },
  ],
};

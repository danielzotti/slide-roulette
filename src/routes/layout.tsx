import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import Header from "~/components/header/header";
import { config } from "~/config";

import styles from "./layout.module.scss?inline";

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <Header />
      <main>
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

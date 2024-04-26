import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Configurator from "~/components/configurator/configurator";
import { config } from "~/config";
import { getRandomTitle } from "~/db/topics";
import styles from "./index.module.scss";

export default component$(() => {
  return (
    <div class={styles.page}>
      <h1>{config.title}</h1>
      <p>{config.description}</p>
      <h2>Level 1: {getRandomTitle(1)}</h2>
      <h2>Level 2: {getRandomTitle(2)}</h2>
      <h2>Level 3: {getRandomTitle(3)}</h2>
      <img
        src={config.apis.randomImage}
        width={1280}
        height={720}
        alt="Random generated"
      />
      <hr />
      <Configurator />
    </div>
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

import { $, component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import type { InitialValues } from "@modular-forms/qwik";
import Configurator from "~/components/configurator/configurator";
import { config } from "~/config";
import type { ConfigurationForm } from "~/models/configuration.models";
import { configurationDefaultValue } from "~/models/configuration.models";
import styles from "./index.module.scss";

export const useFormLoader = routeLoader$<InitialValues<ConfigurationForm>>(
  () => configurationDefaultValue,
);

export default component$(() => {
  const navigate = useNavigate();

  const start = $((values: ConfigurationForm) => {
    console.log({ values2: values });
    navigate(
      `${config.urls.slides}?level=${values.level}&language=${values.language}&slides=${values.slides}`,
    );
  });

  return (
    <div class={styles.page}>
      <h1>{config.title}</h1>
      <p>{config.description}</p>
      {/*<h2>Level 1: {getRandomTopic(1)}</h2>
      <h2>Level 2: {getRandomTopic(2)}</h2>
      <h2>Level 3: {getRandomTopic(3)}</h2>
      <img
        src={config.apis.randomImage}
        width={1280}
        height={720}
        alt="Random generated"
      />
      <hr />*/}
      <Configurator onSubmit={start} />
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

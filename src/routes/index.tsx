import { $, component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import type { InitialValues } from "@modular-forms/qwik";
import Configurator from "~/components/configurator/configurator";
import Footer from "~/components/footer/footer";
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
    navigate(
      `${config.urls.slides}?${new URLSearchParams(values as unknown as Record<string, string>)}`,
    );
  });

  return (
    <div>
      <div class={styles.page}>
        {/*<h1>{config.title}</h1>*/}
        <p>{config.description}</p>

        <Configurator onSubmit={start} />

        <div class={styles.credits}>
          Thanks to{" "}
          <a href="https://chat.openai.com" target="_blank">
            ChatGPT
          </a>{" "}
          for generating the topics and to{" "}
          <a href="https://unsplash.com" target="_blank">
            Unsplash
          </a>{" "}
          to provide the images.
        </div>
      </div>
      <Footer />
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

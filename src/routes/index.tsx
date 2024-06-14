import { $, component$, useSignal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Configurator } from "~/components/configurator/configurator";
import Footer from "~/components/footer/footer";
import { config } from "~/config";
import type { ConfigurationForm } from "~/models/configuration.models";
import styles from "./index.module.scss";

export default component$(() => {
  const navigate = useNavigate();
  const isLoading = useSignal(false);

  const start = $(async (values: ConfigurationForm) => {
    isLoading.value = true;
    await navigate(
      `${config.urls.slides}?${new URLSearchParams(values as unknown as Record<string, string>)}`,
    );
    isLoading.value = false;
    // Quick fix/trick to load new images if query params remain the same (instead of using navigate() function)
    // window.location.href = `${config.urls.slides}?${new URLSearchParams(values as unknown as Record<string, string>)}`;
  });

  return (
    <div>
      <div class={styles.page}>
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

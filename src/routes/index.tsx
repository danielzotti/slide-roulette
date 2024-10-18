import { $, component$, useSignal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Configurator } from "~/components/configurator/configurator";
import { Footer } from "~/components/footer/footer";
import { Header } from "~/components/header/header";
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
    <>
      <Header />

      <div class={styles.page}>
        <Configurator onSubmit={start} />
        <Footer />
      </div>
    </>
  );
});

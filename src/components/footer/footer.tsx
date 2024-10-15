import { component$ } from "@builder.io/qwik";
import { GoMarkGithub16 } from "@qwikest/icons/octicons";
import { config } from "~/config";
import styles from "./footer.module.scss";

export default component$(() => {
  return (
    <footer class={styles.footer}>
      <div class={styles.credits}>
        Thanks to{" "}
        <a href={config.websites.chatGpt} target="_blank">
          ChatGPT
        </a>{" "}
        for generating the topics and to{" "}
        <a href={`${config.websites.unsplash.homepage}`} target="_blank">
          Unsplash
        </a>{" "}
        to provide the images.
      </div>

      <div class={styles.author}>
        Made with ❤️ by{" "}
        <a target="_blank" href={config.websites.danielzotti}>
          Daniel
        </a>{" "}
        |{" "}
        <a target="_blank" href={config.websites.github}>
          <GoMarkGithub16 />
        </a>
      </div>
    </footer>
  );
});

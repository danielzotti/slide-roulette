import { component$ } from "@builder.io/qwik";
import { GoMarkGithub16 } from "@qwikest/icons/octicons";
import { config } from "~/config";
import styles from "./footer.module.scss";

export default component$(() => {
  return (
    <footer class={styles.footer}>
      <div>
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

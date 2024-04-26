import { component$ } from "@builder.io/qwik";
import styles from "./footer.module.scss";

export default component$(() => {
  return (
    <footer class={styles.footer}>
      Made with ❤️ by{" "}
      <a target="_blank" href="https://www.danielzotti.it">
        Daniel
      </a>
    </footer>
  );
});

import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./header.module.scss";

export default component$(() => {
  return (
    <header class={styles.header}>
      <em>Logo</em>
      <nav>
        <Link href="/">Home</Link>
      </nav>
    </header>
  );
});

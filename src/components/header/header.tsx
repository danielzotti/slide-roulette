import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./header.module.scss";
import logo from "../../../public/images/codemotion/codemotion-monogram-dark.png";

export const Header = component$(() => {
  return (
    <header class={styles.header}>
      <Link href="/" title="Home">
        <img
          class="logo-dark"
          src={logo}
          alt="Slide Roulette Logo Dark"
          width={50}
          height={50}
        />
      </Link>
      <div class={styles.title}>Slide Roulette</div>
    </header>
  );
});

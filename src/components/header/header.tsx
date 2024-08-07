import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./header.module.scss";
import logo from "../../../public/images/codemotion/codemotion-monogram-dark.png";

export default component$(() => {
  return (
    <header class={styles.header}>
      <nav>
        <Link href="/" title="Home">
          <img
            class="logo-dark"
            src={logo}
            alt="Slide Roulette Logo Dark"
            width={50}
            height={50}
          />
        </Link>
      </nav>
      <div class={styles.title}>Slide Roulette</div>
    </header>
  );
});

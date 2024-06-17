import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./header.module.scss";
import LogoImage from "../../../public/images/slide-roulette-logo.png?jsx";

export default component$(() => {
  return (
    <header class={styles.header}>
      <nav>
        <Link href="/" title="Home">
          <LogoImage
            alt="Slide Roulette Logo"
            style={{ width: 40, height: 40 }}
          />
        </Link>
      </nav>
      <div class={styles.title}>Slide Roulette</div>
    </header>
  );
});

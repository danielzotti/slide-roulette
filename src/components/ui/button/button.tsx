import type { JSXChildren } from "@builder.io/qwik";
import styles from "./button.module.scss";

interface ButtonProps {
  classOverride?: string;
  variant?: "primary" | "secondary" | "outline" | "clean";
  children: JSXChildren;
}

export const Button = ({
  classOverride,
  variant = "primary",
  children,
}: ButtonProps) => {
  return (
    <button
      class={`${styles.button} ${styles[variant]} ${classOverride}`}
      type="button"
    >
      {children}
    </button>
  );
};

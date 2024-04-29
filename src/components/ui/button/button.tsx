import type { JSXChildren, PropFunction } from "@builder.io/qwik";
import styles from "./button.module.scss";

interface ButtonProps {
  classOverride?: string;
  variant?: "primary" | "secondary" | "outline" | "clean";
  children: JSXChildren;
  onClick$?: PropFunction<() => void> | PropFunction<() => void>[];
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

export const Button = ({
  classOverride,
  variant = "primary",
  children,
  onClick$,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      class={`${styles.button} ${styles[variant]} ${classOverride}`}
      type={type}
      onClick$={[onClick$]}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

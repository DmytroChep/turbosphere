import type { ButtonProps } from "./button.types";
import styles from "./button.module.css";

export function Button(props: ButtonProps) {
    const { className, variant, ...restProps } = props;
    return (
        <button
            {...restProps}
            className={`${styles.button} ${styles[`button-${variant}`]
                } ${className}`}
        ></button>
    );
}

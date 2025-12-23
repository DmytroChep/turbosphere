import { IMAGES } from "../../shared";
import styles from "./footer.module.css";
export function Footer() {
	return (
		<footer className={styles.footer}>
			<img src={IMAGES.logo} alt="No" />
			<p>
				© 2024 TurboSphere. All rights reserved
				<br />
				Terms of Use <br />
				Privacy Policy <br />
			</p>
		</footer>
	);
}

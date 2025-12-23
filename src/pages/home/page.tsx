import styles from "./page.module.css";
import { IMAGES } from "../../shared/images";
export function HomePage() {
	return (
		<div className={styles.container}>
			<p className={styles.title}>
				TurboSphere: Performance at Your Pace.
			</p>
			<div className={styles.content}>
				<div className={styles.textBlock}>
					<p className={styles.textBlockTitle}>
						Our Mascot is a Snail. Here's Why.
					</p>
					<p className={styles.description}>
						We live in a world obsessed with speed. But true quality
						is born from deliberation. Our snail is a symbol of the
						three core principles of TurboSphere:
					</p>
					<ul>
						<li>
							🐌 Mindful Curation <br />
							We slowly select every item. No rushing - only
							rigorous testing, material checks, and a focus on
							longevity.
						</li>
						<li>
							🐌 Steady Progress
							<br />
							A snail always moves forward, carrying its home on
							its back. Our gear is built to be your reliable
							companion for the long haul, not to break after one
							season. <br />
						</li>
						<li>
							🐌 Your Personal Sphere
							<br />
							The shell is a perfect, self-sufficient world. We
							help you build your own "sphere" of comfort,
							efficiency, and joy, where everything has its place.
						</li>
					</ul>
				</div>
				<div className={styles.imageBlock}>
					<img src={IMAGES.home} alt="Home" />
				</div>
			</div>
		</div>
	);
}

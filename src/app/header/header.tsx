import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ICONS } from "../../shared/icons";
import { IMAGES } from "../../shared/images";

export function Header() {
	const navigate = useNavigate();
	return (
		<header className={styles.header}>
			<img
				className={styles.logo}
				src={IMAGES.logo}
				alt="Logo"
				onClick={() => {
					navigate("/");
				}}
			/>

			<div className={styles.actionPanel}>
				<Link to={"/products"} className={styles.link}>
					<button className={styles.actionButton}>
						<ICONS.MenuIcon />
						Categories
					</button>
				</Link>

				<div className={styles.searchBlock}>
					<input
						placeholder="Find products..."
						className={styles.searchBar}
						type="text"
					/>
					<ICONS.SearchIcon className={styles.searchIcon} />
				</div>
				<Link to={"/cart"} className={styles.link}>
					<button className={styles.actionButton}>
						<ICONS.CartIcon />
						Cart
					</button>
				</Link>
			</div>

			<img
				className={styles.userProfileAvatar}
				src={IMAGES.user}
				alt="Аватар пользователя"
				onClick={() => {
					navigate("/profile");
				}}
			/>
		</header>
	);
}

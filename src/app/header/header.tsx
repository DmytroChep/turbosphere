import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ICONS } from "../../shared/icons";
import { IMAGES } from "../../shared/images";
import { Search } from "../../components/search";
import { useUserContext } from "../../context/user-context";

export function Header() {
	const navigate = useNavigate();

	const {user} = useUserContext()

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

				<Search/>
				<Link to={"/cart"} className={styles.link}>
					<button className={styles.actionButton}>
						<ICONS.CartIcon />
						Cart
					</button>
				</Link>
			</div>

			<p>Username: {user?.username}</p>
				
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

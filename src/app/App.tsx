import { CartContextProvider } from "../context/cart-context";
import { AppRoutes } from "./app-routes";

export function App() {
	return (
		<CartContextProvider>
			<AppRoutes />
		</CartContextProvider>
	)
}

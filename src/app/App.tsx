import { CartContextProvider } from "../context/cart-context";
import { AppRoutes } from "./app-routes";
import { UserContextProvider } from "../context/user-context";
export function App() {
	return (
		<UserContextProvider>
			<CartContextProvider>
				<AppRoutes />
			</CartContextProvider>
		</UserContextProvider>
	)
}

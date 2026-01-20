import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { HomePage, OneProductPage, ProductsPage, CartPage } from "../pages";
import { NotFoundPage } from "../pages/not-found/not-found";

export function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/products" element={<ProductsPage />} />
					<Route path= "/product/:id" element= {<OneProductPage />}/>
					<Route path="/cart" element= {<CartPage/>}></Route>
					<Route path = "*" element={<NotFoundPage />}/>
				</Route>
			</Routes>
		</Router>
	);
}

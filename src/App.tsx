import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './pages/Home/Home';
import Category from './pages/Category/Category';
import ProductCard from './components/ProductCard/ProductCard';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart/Cart';
import NotFound from './pages/NotFound/NotFound';
import About from './pages/About/About';

export default function App() {
	return (
		<CartProvider>
			<HashRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path='/' element={<Home />} />
						<Route path='/categories/:category' element={<Category />} />
						<Route path='/categories/:category/:id' element={<ProductCard />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/about' element={<About />} />
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</HashRouter>
		</CartProvider>
	);
}

import './Home.css';
import { useEffect, useReducer } from 'react';
import {
	catalogReducer,
	initialCatalogState,
} from '../../reducers/catalogReducer';
import { fetchProducts } from '../../api/products';
import { Link } from 'react-router-dom';

export default function Home() {
	const [catalog, dispatch] = useReducer(catalogReducer, initialCatalogState);

	useEffect(() => {
		const controller = new AbortController();

		async function loadProducts() {
			dispatch({ type: 'loading' });
			try {
				const products = await fetchProducts(controller.signal);
				dispatch({ type: 'success', payload: products });
			} catch (e) {
				if (e instanceof Error) {
					if (e.name === 'AbortError') return;
					dispatch({ type: 'error', payload: e.message });
				} else {
					dispatch({ type: 'error', payload: 'Fetch error' });
				}
			}
		}

		loadProducts();
		return () => controller.abort();
	}, []);

	const isLoading = catalog.status === 'idle' || catalog.status === 'loading';
	const isError = catalog.status === 'error';
	const isReady = catalog.status === 'success';

	const categories = Array.from(
		new Set(catalog.data.map(item => item.category.name)),
	).filter(
		c =>
			c === 'Clothes' ||
			c === 'Electronics' ||
			c === 'Furniture' ||
			c === 'Shoes' ||
			c === 'Miscellaneous',
	);

	const images: Record<string, string> = {
		Clothes: '/images/Clothes.png',
		Electronics: '/images/Electronics.png',
		Furniture: '/images/Furniture.png',
		Shoes: '/images/Shoes.png',
		Miscellaneous: '/images/Miscellaneous.png',
	};

	return (
		<section className='home'>
			<h2 className='home-title'>Выберите категорию товаров</h2>

			{isLoading && <p className='status loading'>Загрузка…</p>}
			{isError && <p className='status error'>Ошибка загрузки товаров.</p>}

			<div className='category-grid'>
				{isReady &&
					categories.map(category => (
						<Link
							key={category}
							className='category-card'
							to={`/categories/${category}`}
							state={{ allItems: catalog.data }}
							aria-label={category}
						>
							<img
								src={images[category]}
								alt={category}
								className='category-img'
							/>
							<span className='category-name'>{category}</span>
						</Link>
					))}
			</div>
		</section>
	);
}

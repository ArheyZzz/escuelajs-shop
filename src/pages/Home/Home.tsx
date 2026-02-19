import './Home.css';
import { useEffect, useMemo, useReducer } from 'react';
import { Link } from 'react-router-dom';
import {
	catalogReducer,
	initialCatalogState,
} from '../../reducers/catalogReducer';
import { fetchProducts } from '../../api/products';

const ALLOWED_CATEGORIES = new Set([
	'Clothes',
	'Electronics',
	'Furniture',
	'Shoes',
	'Miscellaneous',
]);

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

	const base = import.meta.env.BASE_URL;

	const images: Record<string, string> = useMemo(
		() => ({
			Clothes: `${base}images/Clothes.png`,
			Electronics: `${base}images/Electronics.png`,
			Furniture: `${base}images/Furniture.png`,
			Shoes: `${base}images/Shoes.png`,
			Miscellaneous: `${base}images/Miscellaneous.png`,
		}),
		[base],
	);

	const categories = useMemo(() => {
		if (!isReady) return [];
		return Array.from(
			new Set(catalog.data.map(item => item.category.name)),
		).filter(c => ALLOWED_CATEGORIES.has(c));
	}, [catalog.data, isReady]);

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
								src={images[category] ?? `${base}vite.svg`}
								alt={category}
								className='category-img'
								loading='lazy'
							/>
							<span className='category-name'>{category}</span>
						</Link>
					))}
			</div>
		</section>
	);
}

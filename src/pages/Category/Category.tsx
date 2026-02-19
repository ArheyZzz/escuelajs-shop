import './Category.css';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import type { GoodsItem } from '../../types/types';

type LocationState = { allItems: GoodsItem[] };

export default function Category() {
	const { category } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const allItems = (location.state as LocationState | null)?.allItems;

	const filteredItems =
		allItems?.filter(item => item.category.name === category) ?? [];

	return (
		<section className='category'>
			<div className='page-head'>
				<h2 className='page-title'>Категория: {category}</h2>
				<button className='btn' type='button' onClick={() => navigate(-1)}>
					Назад
				</button>
			</div>

			<div className='products-grid'>
				{filteredItems.map(item => (
					<Link
						key={item.id}
						className='product-tile'
						to={`/categories/${category}/${item.id}`}
						state={{ item }}
					>
						<img
							className='product-img'
							src={item.images[0]}
							alt={item.title}
						/>
						<div className='product-info'>
							<h3 className='product-name'>{item.title}</h3>
							<p className='product-price'>${item.price}</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}

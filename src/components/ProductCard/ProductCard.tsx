import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { GoodsItem } from '../../types/types';
import './ProductCard.css';

type LocationState = { item: GoodsItem };

export default function ProductCard() {
	const navigate = useNavigate();
	const location = useLocation();
	const item = (location.state as LocationState | null)?.item;

	const { add } = useCart();

	if (!item) {
		return (
			<section className='product-card'>
				<div className='page-head'>
					<h2 className='page-title'>Товар не найден</h2>
					<button className='btn' type='button' onClick={() => navigate(-1)}>
						Назад
					</button>
				</div>
				<p className='muted'>Вернитесь назад и выберите товар заново.</p>
			</section>
		);
	}

	return (
		<section className='product-card'>
			<div className='page-head'>
				<h2 className='page-title'>Категория: {item.category.name}</h2>
				<button className='btn' type='button' onClick={() => navigate(-1)}>
					Назад
				</button>
			</div>

			<div className='product-sheet'>
				<div className='sheet-image'>
					<img src={item.images[0]} alt={item.title} />
				</div>

				<div className='sheet-info'>
					<h3 className='sheet-title'>{item.title}</h3>
					<p className='sheet-desc'>{item.description}</p>

					<div className='sheet-row'>
						<span className='muted'>Цена</span>
						<span className='price'>${item.price}</span>
					</div>

					<button
						className='btn primary'
						type='button'
						onClick={() =>
							add({
								id: item.id,
								title: item.title,
								price: item.price,
								image: item.images?.[0],
							})
						}
					>
						В корзину
					</button>
				</div>
			</div>
		</section>
	);
}

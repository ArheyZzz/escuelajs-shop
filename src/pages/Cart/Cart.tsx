import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

function pluralizeRu(n: number, forms: [string, string, string]) {
	const abs = Math.abs(n);
	const mod10 = abs % 10;
	const mod100 = abs % 100;
	if (mod100 >= 11 && mod100 <= 14) return forms[2];
	if (mod10 === 1) return forms[0];
	if (mod10 >= 2 && mod10 <= 4) return forms[1];
	return forms[2];
}

export default function Cart() {
	const { increase, decrease, clear, remove, totalPrice, totalQty, items } =
		useCart();
	const navigate = useNavigate();

	function handleOrder(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const user = Object.fromEntries(formData.entries());
		const order = { user, items, totalQty, totalPrice };
		console.log('Отправка заказа:', order);

		e.currentTarget.reset();
		clear();
	}

	return (
		<section className='cart'>
			<div className='page-head'>
				<h2 className='page-title'>
					В корзине: {totalQty}{' '}
					{pluralizeRu(totalQty, ['товар', 'товара', 'товаров'])} —{' '}
					{totalPrice.toLocaleString('ru-RU')} $
				</h2>

				<button className='btn' type='button' onClick={() => navigate(-1)}>
					Назад
				</button>
			</div>

			<form className='cart-form' onSubmit={handleOrder}>
				<div className='cart-list'>
					{items.length === 0 && <p className='muted'>Корзина пустая.</p>}

					{items.map(({ id, title, price, image, quantity }) => (
						<div className='cart-item' key={id}>
							<img className='cart-img' src={image} alt={title} />
							<div className='cart-meta'>
								<div className='cart-name'>{title}</div>
								<div className='cart-sub muted'>
									${price} · {quantity} шт.
								</div>
							</div>

							<div className='cart-actions'>
								<div className='qty'>
									<button
										type='button'
										className='icon-btn'
										onClick={() => decrease(id)}
										aria-label='Минус'
									>
										−
									</button>
									<span className='qty-num'>{quantity}</span>
									<button
										type='button'
										className='icon-btn'
										onClick={() => increase(id)}
										aria-label='Плюс'
									>
										+
									</button>
								</div>

								<button
									type='button'
									className='btn danger'
									onClick={() => remove(id)}
								>
									Удалить
								</button>
							</div>
						</div>
					))}
				</div>

				<div className='order-card'>
					<h3 className='order-title'>Оформление</h3>
					<div className='inputs'>
						<input name='name' placeholder='Ваше имя' required />
						<input name='email' placeholder='Email' type='email' required />
						<textarea name='comment' placeholder='Комментарий' />
					</div>

					<div className='order-buttons'>
						<button className='btn' type='button' onClick={() => clear()}>
							Очистить корзину
						</button>
						<button
							className='btn primary'
							type='submit'
							disabled={items.length === 0}
						>
							Заказать
						</button>
					</div>
				</div>
			</form>
		</section>
	);
}

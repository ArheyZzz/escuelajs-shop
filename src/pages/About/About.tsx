import './About.css';
import { Link } from 'react-router-dom';

export default function About() {
	return (
		<section className='about'>
			<div className='about-card'>
				<h2 className='about-title'>О проекте</h2>

				<p className='about-lead'>
					<b>EscuelaJS Shop</b> — учебное приложение на React с TypeScript. Цель
					— потренировать хранение состояния (useReducer/useContext), работу с
					API, маршрутизацию и локальное сохранение корзины.
				</p>

				<div className='about-grid'>
					<div className='about-block'>
						<h3 className='about-h3'>Технологии</h3>
						<ul className='chips'>
							<li>React</li>
							<li>TypeScript</li>
							<li>React Router</li>
							<li>useReducer</li>
							<li>useContext</li>
							<li>LocalStorage</li>
							<li>CSS</li>
						</ul>
					</div>

					<div className='about-block'>
						<h3 className='about-h3'>Функциональность</h3>
						<ul className='bullets'>
							<li>Категории и список товаров.</li>
							<li>Детальная страница продукта.</li>
							<li>Корзина: добавление/удаление, +/- количество, очистка.</li>
							<li>Итоги: количество и сумма, плюрализация.</li>
							<li>Сохранение корзины в LocalStorage.</li>
							<li>Светлая/тёмная тема.</li>
						</ul>
					</div>

					<div className='about-block'>
						<h3 className='about-h3'>Архитектура</h3>
						<pre className='code'>{`src/
  api/        // запросы к API
  components/ // UI-компоненты
  context/    // CartContext + useCart
  pages/      // Home, Category, Product, Cart, About
  reducers/   // catalogReducer, cartReducer
  types/      // общие типы`}</pre>
					</div>
				</div>

				<div className='about-links'>
					<Link className='about-btn' to='/'>
						🏠 На главную
					</Link>

					<a
						className='about-btn'
						href='https://api.escuelajs.co/api/v1/products'
						target='_blank'
						rel='noreferrer'
					>
						🔗 API (EscuelaJS)
					</a>
				</div>

				<footer className='about-footer'>
					<span>© 2025 EscuelaJS Shop</span>
					<span className='muted'>Автор: Юрий</span>
				</footer>
			</div>
		</section>
	);
}

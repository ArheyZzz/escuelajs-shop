import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './Header.css';

export default function Header() {
	const { totalQty } = useCart();

	return (
		<header className='header'>
			<NavLink to='/' className='header-logo' aria-label='На главную'>
				EscuelaJS Shop
			</NavLink>

			<nav className='header-nav'>
				<NavLink
					to='/'
					className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
				>
					🏠 Главная
				</NavLink>
				<NavLink
					to='/cart'
					className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
				>
					🛒 Корзина <span className='badge'>{totalQty}</span>
				</NavLink>
				<NavLink
					to='/about'
					className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
				>
					ℹ️ О проекте
				</NavLink>

				<ThemeSwitcher />
			</nav>
		</header>
	);
}

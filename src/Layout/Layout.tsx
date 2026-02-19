import './layout.css';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function Layout() {
	return (
		<div className='layout'>
			<Header />
			<main className='layout-main'>
				<div className='page'>
					<Outlet />
				</div>
			</main>
			<Footer />
		</div>
	);
}

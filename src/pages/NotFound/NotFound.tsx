import './NotFound.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NotFound() {
	const [count, setCount] = useState(5);
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => setCount(prev => prev - 1), 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (count <= 0) navigate('/');
	}, [count, navigate]);

	return (
		<section className='not-found'>
			<div className='nf-card'>
				<h2 className='nf-title'>Страница не найдена :(</h2>
				<p className='muted'>
					Перенаправление на главную через: <b>{count}</b>
				</p>
			</div>
		</section>
	);
}

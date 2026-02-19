import { useEffect, useState } from 'react';
import './ThemeSwitcher.css';

const THEME_KEY = 'theme';

export default function ThemeSwitcher() {
	const initial =
		(localStorage.getItem(THEME_KEY) as 'light' | 'dark') ?? 'light';
	const [theme, setTheme] = useState<'light' | 'dark'>(initial);

	useEffect(() => {
		localStorage.setItem(THEME_KEY, theme);
		document.documentElement.classList.toggle('dark', theme === 'dark');
	}, [theme]);

	const checked = theme === 'dark';

	return (
		<button
			type='button'
			className='theme-btn'
			onClick={() => setTheme(checked ? 'light' : 'dark')}
			aria-pressed={checked}
			title='Переключить тему'
		>
			{checked ? '🌙' : '☀️'}
		</button>
	);
}

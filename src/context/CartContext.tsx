import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	type ReactNode,
} from 'react';

import {
	cartInitialState,
	CartReducer,
	type CartContextValue,
	type CartState,
} from '../reducers/cartReducer';

const CART_KEY = 'cart:v1';

function initCart(): CartState {
	try {
		const raw = localStorage.getItem(CART_KEY);
		if (!raw) return cartInitialState;
		const parsed = JSON.parse(raw) as CartState;
		// простая валидация
		if (!parsed || !Array.isArray(parsed.items)) return cartInitialState;
		return parsed;
	} catch {
		return cartInitialState;
	}
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(CartReducer, cartInitialState, initCart);

	useEffect(() => {
		localStorage.setItem(CART_KEY, JSON.stringify(state));
	}, [state]);

	const value = useMemo<CartContextValue>(() => {
		const totalQty = state.items.reduce((sum, i) => sum + i.quantity, 0);
		const totalPrice = state.items.reduce(
			(sum, i) => sum + i.price * i.quantity,
			0
		);

		return {
			items: state.items,
			add: item => dispatch({ type: 'ADD_TO_CART', payload: item }),
			increase: id => dispatch({ type: 'INCREASE', payload: { id } }),
			decrease: id => dispatch({ type: 'DECREASE', payload: { id } }),
			remove: id => dispatch({ type: 'REMOVE', payload: { id } }),
			clear: () => dispatch({ type: 'CLEAR_CART' }),
			totalQty,
			totalPrice,
		};
	}, [state.items]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used within <CartProvider>');
	return ctx;
}

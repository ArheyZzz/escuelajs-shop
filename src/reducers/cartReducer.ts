// reducers/cartReducer.ts
export type CartItem = {
	id: number | string;
	title: string;
	price: number;
	image?: string;
	quantity: number;
};

export type CartState = { items: CartItem[] };

type Action =
	| { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> } // quantity добавляем сами
	| { type: 'INCREASE'; payload: { id: CartItem['id'] } }
	| { type: 'DECREASE'; payload: { id: CartItem['id'] } }
	| { type: 'REMOVE'; payload: { id: CartItem['id'] } }
	| { type: 'CLEAR_CART' };

export type CartContextValue = {
	items: CartItem[];
	add: (item: Omit<CartItem, 'quantity'>) => void;
	increase: (id: CartItem['id']) => void;
	decrease: (id: CartItem['id']) => void;
	remove: (id: CartItem['id']) => void;
	clear: () => void;
	totalQty: number;
	totalPrice: number;
};

export const cartInitialState: CartState = { items: [] };

export function CartReducer(state: CartState, action: Action): CartState {
	switch (action.type) {
		case 'ADD_TO_CART': {
			const existing = state.items.find(i => i.id === action.payload.id);
			if (existing) {
				return {
					items: state.items.map(i =>
						i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
					),
				};
			}
			return { items: [...state.items, { ...action.payload, quantity: 1 }] };
		}

		case 'INCREASE': {
			return {
				items: state.items.map(i =>
					i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
				),
			};
		}

		case 'DECREASE': {
			const target = state.items.find(i => i.id === action.payload.id);
			if (!target) return state;
			if (target.quantity === 1) {
				// при 1 — удаляем позицию
				return { items: state.items.filter(i => i.id !== action.payload.id) };
			}
			return {
				items: state.items.map(i =>
					i.id === action.payload.id ? { ...i, quantity: i.quantity - 1 } : i
				),
			};
		}

		case 'REMOVE':
			return { items: state.items.filter(i => i.id !== action.payload.id) };

		case 'CLEAR_CART':
			return cartInitialState;

		default:
			return state;
	}
}

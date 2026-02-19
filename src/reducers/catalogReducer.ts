import type { GoodsItem, StateLoading } from '../types/types';

export type Action =
	| { type: 'loading' }
	| { type: 'success'; payload: GoodsItem[] }
	| { type: 'error'; payload: string };

export const initialCatalogState: StateLoading = {
	status: 'idle',
	data: [],
	error: null,
};

export function catalogReducer(
	state: StateLoading,
	action: Action
): StateLoading {
	switch (action.type) {
		case 'loading':
			return { ...state, status: 'loading', error: null };
		case 'success':
			return { ...state, data: action.payload, status: 'success', error: null };
		case 'error':
			return { ...state, status: 'error', error: action.payload };
		default:
			return state;
	}
}

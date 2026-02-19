export type GoodsItem = {
	id: number | string;
	title: string;
	category: {
		id: number;
		name: string;
		image: string;
	};
	price: number;
	rating?: number;
	stock?: number;
	thumbnail?: string;
	description: string;
	images: string;
};

export type StateLoading = {
	status: 'idle' | 'loading' | 'success' | 'error';
	data: GoodsItem[];
	error: string | null;
};

const API_URL = 'https://api.escuelajs.co/api/v1/products';

// export async function fetchProducts(signal?: AbortSignal) {
// 	const res = await fetch('/api/products.json', { signal });
// 	if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
// 	return res.json();
// }
export async function fetchProducts(signal?: AbortSignal) {
	const res = await fetch(API_URL, { signal });
	if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
	return res.json();
}

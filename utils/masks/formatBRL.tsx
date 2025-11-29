export function formatBRL(value: string | number | null | undefined) {
	const n = Number(String(value ?? '').replace(',', '.'));
	if (isNaN(n)) return 'R$ 0,00';
	return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
}
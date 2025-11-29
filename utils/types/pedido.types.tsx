export type MarmitaType = 'pequena' | 'grande' | 'mista';

export type Pedido = {
	id: string;
	nome: string;
	tipo: string;
	quantidade: number;
	pagamento: string;
	observacoes?: string;
	criadoEm: string; 
};

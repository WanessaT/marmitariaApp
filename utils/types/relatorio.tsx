export type Pedido = {
  id: string;
  nome: string;
  tipo: 'simples' | 'completa' | string;
  quantidade: number;
  pagamento?: string;
  observacoes?: string;
  valorUnitario?: number;
  valorTotal?: number;
  criadoEm: string;
};

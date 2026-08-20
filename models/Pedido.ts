export interface ItemPedido {
    nome: string;
    preco: number;
    quantidade: number;
}

export class Pedido {
    constructor(
        public id: string, 
        public itens: ItemPedido[], 
        public destinatario: string
    ) {}

    // Necessário para uso no ProcessadorPedido e nas Estratégias
    get valorTotal(): number {
        return this.itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
    }

    get quantidadeTotal(): number {
        return this.itens.reduce((total, item) => total + item.quantidade, 0);
    }
}
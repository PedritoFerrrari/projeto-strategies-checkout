import { Pedido } from "../models/Pedido";

export interface DescontoStrategy {
    calcularDesconto(pedido: Pedido): number;
}

export interface PagamentoStrategy {
    processarPagamento(valorTotal: number): boolean;
}

export interface NotificacaoStrategy {
    enviarNotificacao(mensagem: string, destinatario: string): void;
}
import { Pedido } from "../models/Pedido";
import { DescontoStrategy, PagamentoStrategy, NotificacaoStrategy } from "./interfaces";

export class DescontoClienteVIPStrategy implements DescontoStrategy {
    calcularDesconto(pedido: Pedido): number {
        // Desconto fixo de 15% sobre o valor total
        return pedido.valorTotal * 0.15;
    }
}

export class DescontoPorQuantidadeStrategy implements DescontoStrategy {
    calcularDesconto(pedido: Pedido): number {
        if (pedido.quantidadeTotal > 5) {
            return pedido.valorTotal * 0.10;
        }
        return 0;
    }
}

export class DescontoCupomFixoStrategy implements DescontoStrategy {
    constructor(private valorDesconto: number = 20) {}

    calcularDesconto(pedido: Pedido): number {
        return Math.min(this.valorDesconto, pedido.valorTotal);
    }
}

export class PagamentoPixStrategy implements PagamentoStrategy {
    processarPagamento(valorTotal: number): boolean {
        console.log(`[Pagamento Pix] Processado sem taxas.`);
        console.log(`[Pagamento Pix] Chave simbólica: 00020126580014br.gov.bcb.pix...`);
        return true;
    }
}

export class PagamentoCartaoCreditoStrategy implements PagamentoStrategy {
    processarPagamento(valorTotal: number): boolean {
        const taxa = valorTotal * 0.025;
        const totalCobrado = valorTotal + taxa;
        console.log(`[Pagamento Cartão] Taxa de 2.5% (R$ ${taxa.toFixed(2)}) aplicada.`);
        console.log(`[Pagamento Cartão] Total cobrado na fatura: R$ ${totalCobrado.toFixed(2)}`);
        return true;
    }
}

export class PagamentoBoletoStrategy implements PagamentoStrategy {
    processarPagamento(valorTotal: number): boolean {
        const taxaBoleto = 2.50;
        const totalCobrado = valorTotal + taxaBoleto;
        console.log(`[Pagamento Boleto] Taxa fixa de R$ ${taxaBoleto.toFixed(2)} aplicada.`);
        console.log(`[Pagamento Boleto] Total cobrado no boleto: R$ ${totalCobrado.toFixed(2)}`);
        return true;
    }
}

export class NotificacaoEmailStrategy implements NotificacaoStrategy {
    enviarNotificacao(mensagem: string, destinatario: string): void {
        console.log(`[Enviado um e-mail para ${destinatario}]: ${mensagem}`);
    }
}

export class NotificacaoSMSStrategy implements NotificacaoStrategy {
    enviarNotificacao(mensagem: string, destinatario: string): void {
        console.log(`[Enviado por SMS para ${destinatario}]: ${mensagem}`);
    }
}

export class NotificacaoWhatsAppStrategy implements NotificacaoStrategy {
    enviarNotificacao(mensagem: string, destinatario: string): void {
        console.log(`[Enviado por Whatsapp para ${destinatario}]: ${mensagem}`);
    }
}
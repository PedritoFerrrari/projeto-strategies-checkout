import { Pedido } from "./models/Pedido";
import { ProcessadorPedido } from "./ProcessadorPedido";
import {
    DescontoClienteVIPStrategy,
    DescontoPorQuantidadeStrategy,
    DescontoCupomFixoStrategy,
    PagamentoPixStrategy,
    PagamentoCartaoCreditoStrategy,
    PagamentoBoletoStrategy,
    NotificacaoEmailStrategy,
    NotificacaoSMSStrategy,
    NotificacaoWhatsAppStrategy} from "./strategies/implementations";

const pedidoA = new Pedido("PED-101", [
    { nome: "Mouse Gamer", preco: 150.00, quantidade: 1 }, 
    { nome: "Teclado Mecânico", preco: 350.00, quantidade: 1 }
], "cliente@email.com");
const pedidoB = new Pedido("PED-102", [
    { nome: "Caneta Personalizada", preco: 10.00, quantidade: 10 }
], "+5554999998888");

const processador = new ProcessadorPedido( 
    new DescontoClienteVIPStrategy(),
    new PagamentoPixStrategy(),
    new NotificacaoEmailStrategy()
);
processador.finalizarPedido(pedidoA);
processador.setDescontoStrategy(new DescontoPorQuantidadeStrategy());
processador.setPagamentoStrategy(new PagamentoCartaoCreditoStrategy());
processador.setNotificacaoStrategy(new NotificacaoWhatsAppStrategy());
processador.finalizarPedido(pedidoB);
processador.setDescontoStrategy(new DescontoCupomFixoStrategy(20));
processador.setPagamentoStrategy(new PagamentoBoletoStrategy());
processador.setNotificacaoStrategy(new NotificacaoSMSStrategy());
processador.finalizarPedido(pedidoA);
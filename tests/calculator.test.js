// Primeiro, chamamos a nossa máquina de calcular lá da caixa "utils"
const calcularAluguel = require('../src/utils/calculator');

// O "describe" é o nome do Relatório do Inspetor
describe('Relatório de Testes: Sistema de Aluguel', () => {
    
    // Teste 1: Tudo correto
    test('Deve calcular 300 reais para 3 dias a 100 reais/dia', () => {
        // Nós "esperamos" (expect) que o resultado seja (toBe) 300
        expect(calcularAluguel(100, 3)).toBe(300);
    });

    // Teste 2: Regra de Negócio (Promoção)
    test('Deve dar 10% de desconto para 10 dias (1000 -> 900)', () => {
        expect(calcularAluguel(100, 10)).toBe(900);
    });

    // Teste 3: Evitar Bugs 
    test('Não deve aceitar dias negativos e retornar 0', () => {
        expect(calcularAluguel(100, -5)).toBe(0);
    });
});
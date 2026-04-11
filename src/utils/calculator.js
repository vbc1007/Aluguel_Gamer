function calcularAluguel(precoDiaria, dias) {
    // 1. Proteção: Caso o usario colocaque dias negativos ou não for um número, custa 0.
    if (dias <= 0 || typeof dias !== 'number') return 0;

    let total = precoDiaria * dias;

    // 2. Regra de Negócio: Se alugar por 7 dias ou mais tem 10% de desconto
    if (dias > 7) {
        total = total * 0.9;
    }

    // 3. Garantir que o preço tenha apenas 2 casas decimais 
    return parseFloat(total.toFixed(2));
}

// O "module.exports" é como colocar essa peça numa caixa para que outras
// partes da casa consigam usar ela.
module.exports = calcularAluguel;
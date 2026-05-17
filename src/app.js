const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000; // A "porta" por onde o site vai entrar

// 1. Configurações Básicas
app.use(cors()); // Permite que o site seja acessado de outros lugares
app.use(express.json()); // Ensina o servidor a ler mensagens em formato JSON

// 2. Pasta Pública (A Fachada)
// Aqui dizemos que tudo o que estiver em 'public' deve ser mostrado no navegador
app.use(express.static(path.join(__dirname, 'public')));

// 3. Banco de Dados
const produtos = [
    { 
        id: 1, 
        nome: "PC Gamer Ultra (RTX 4070/i7)", 
        precoDiaria: 350.00,
        precoMensal: 890.00, 
        img: "/img/PC Gamer.png"
    },
    { 
        id: 2, 
        nome: "Notebook Gamer Rog Strix", 
        precoDiaria: 250.00,
        precoMensal: 650.00,
        img: "/img/Notebook Gamer.png"
    },
    { 
        id: 3, 
        nome: "Monitor 240Hz Zowie XL", 
        precoDiaria: 85.00,
        precoMensal: 199.00,
        img: "/img/Monitor Gamer.png" 
    },
    { 
        id: 4, 
        nome: "Teclado Mecânico Corsair K70", 
        precoDiaria: 45.00,
        precoMensal: 99.00,
        img: "/img/Teclado Gamer.png"
    },
    { 
        id: 5, 
        nome: "Mouse Logitech G Pro X Superlight", 
        precoDiaria: 35.00,
        precoMensal: 79.00,
        img: "/img/Mouse Gamer.png"
    },
    { 
        id: 6, 
        nome: "Headset HyperX Cloud Alpha S", 
        precoDiaria: 30.00,
        precoMensal: 69.00,
        img: "/img/Fone Gamer.png"
    }
];

// 4. Rota para listar os produtos
app.get('/api/produtos', (req, res) => 
    {
    res.json(produtos);
    });

// >>> ADICIONADO AQUI: Nova Rota para Cálculo de Frete consumindo a API Pública do ViaCEP
app.get('/api/frete/:cep', async (req, res) => {
    const { cep } = req.params;
    const cepLimpo = cep.replace(/\D/g, ''); // Remove traços ou espaços

    if (cepLimpo.length !== 8) {
        return res.status(400).json({ erro: "CEP inválido. Deve conter exatamente 8 dígitos." });
    }

    try {
        // Consome o serviço externo
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await response.json();

        if (dados.erro) {
            return res.status(404).json({ erro: "CEP não encontrado." });
        }

        // Regra de Negócio: Se o CEP for do DF, frete reduzido a R$ 15.00, outros estados R$ 40.00
        const valorFrete = dados.uf === 'DF' ? 15.00 : 40.00;

        res.json({
            logradouro: dados.logradouro || "Não mapeado",
            bairro: dados.bairro || "Não mapeado",
            localidade: dados.localidade,
            uf: dados.uf,
            valorFrete: valorFrete
        });
    } catch (error) {
        console.error("Erro na API externa:", error);
        res.status(500).json({ erro: "Falha ao conectar com o serviço de frete externo." });
    }
});

// 5. Ligar o Servidor 
if (require.main === module) {
    app.listen(port, () => 
    {
        console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
}

// Exportação necessária para o passo de Testes de Integração
module.exports = app;
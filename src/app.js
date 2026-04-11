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
// Quando o site pedir "/api/produtos", envia a lista acima
app.get('/api/produtos', (req, res) => 
    {
    res.json(produtos);
    });

// 5. Ligar o Servidor
app.listen(port, () => 
    {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
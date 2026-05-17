const request = require('supertest');
const app = require('../src/app');

describe('🧪 Testes de Integração - API de Frete (ViaCEP)', () => {
    
    it('Deve retornar o endereço correto e frete de R$ 15.00 para CEP do DF', async () => {
        // Simula um acesso à rota com um CEP de Brasília
        const response = await request(app).get('/api/frete/70002900');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('uf', 'DF');
        expect(response.body).toHaveProperty('localidade', 'Brasília');
        expect(response.body.valorFrete).toBe(15.00);
    });

    it('Deve retornar o endereço correto e frete de R$ 40.00 para CEP de fora do DF (ex: SP)', async () => {
        // Simula um acesso à rota com um CEP de São Paulo
        const response = await request(app).get('/api/frete/01001000');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('uf', 'SP');
        expect(response.body.valorFrete).toBe(40.00);
    });

    it('Deve retornar erro 400 ao passar um CEP com formato inválido', async () => {
        const response = await request(app).get('/api/frete/12345');
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('erro');
    });

    it('Deve retornar erro 404 ao passar um CEP que não existe', async () => {
        const response = await request(app).get('/api/frete/99999999');
        
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('erro');
    });
});
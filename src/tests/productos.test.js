import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/Producto.js', () => ({
    Producto: {
        find: jest.fn()
    }
}));

const { default: app } = await import('../../app.js');
const { Producto } = await import('../models/Producto.js');

describe(' pruebas sobre el modulo de Productos', () => {

    it('Deberia obtener la lista de productos y devolver estatus 200', async () => {
        
        const productosFalsos = [
            { _id: '1', nombre: 'Monitor', precio: 150},
            { _id: '2', nombre: 'teclado', precio: 150},
            { _id: '3', nombre: 'mouse', precio: 150},
            { _id: '4', nombre: 'impresora', precio: 150}
        ];

        Producto.find.mockReturnValue({
            populate: jest.fn().mockResolvedValue(productosFalsos)
        });

        const response = await request(app).get('/api/productos');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(4);
        expect(response.body[0].nombre).toBe('Monitor');

    });
});
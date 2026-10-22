import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../models/Producto.js', () => ({
    Producto: {
        find: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn()
    }
}));

const { default: app } = await import('../../app.js');
const { Producto } = await import('../models/Producto.js');

describe(' pruebas sobre el modulo de Productos', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

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

    it('Deberia devolver estatus 500 si falla la consulta de productos', async () => {
        Producto.find.mockReturnValue({
            populate: jest.fn().mockRejectedValue(new Error('Error de base de datos'))
        });

        const response = await request(app).get('/api/productos');

        expect(response.status).toBe(500);
        expect(response.body.mensaje).toBe('Error del servidor');
        expect(response.body.detalle).toBe('Error de base de datos');
    });

    it('Deberia filtrar productos por categoria', async () => {
        const productos = [{ _id: '1', nombre: 'Monitor', categoria: 'MONITORES' }];
        Producto.find.mockReturnValue({
            populate: jest.fn().mockResolvedValue(productos)
        });

        const response = await request(app)
            .get('/api/productos')
            .query({ categoria: 'MONITORES' });

        expect(response.status).toBe(200);
        expect(Producto.find).toHaveBeenCalledWith({ categoria: 'MONITORES' });
        expect(response.body).toEqual(productos);
    });

    it('Deberia obtener un producto por su ID', async () => {
        const producto = { _id: '507f1f77bcf86cd799439011', nombre: 'Monitor' };
        Producto.findById.mockReturnValue({
            populate: jest.fn().mockResolvedValue(producto)
        });

        const response = await request(app).get('/api/productos/507f1f77bcf86cd799439011');

        expect(response.status).toBe(200);
        expect(Producto.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
        expect(response.body).toEqual(producto);
    });

    it('Deberia devolver 404 si el producto solicitado no existe', async () => {
        Producto.findById.mockReturnValue({
            populate: jest.fn().mockResolvedValue(null)
        });

        const response = await request(app).get('/api/productos/507f1f77bcf86cd799439011');

        expect(response.status).toBe(404);
        expect(response.body.mensaje).toBe('Producto no encontrado');
    });

    it('Deberia devolver 400 si ocurre un error al buscar un producto por ID', async () => {
        Producto.findById.mockReturnValue({
            populate: jest.fn().mockRejectedValue(new Error('ID inválido'))
        });

        const response = await request(app).get('/api/productos/id-invalido');

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe('ID inválido');
        expect(response.body.detalle).toBe('ID inválido');
    });

    it('Deberia crear un producto nuevo si los datos son correctos', async () => {
        const nuevoProducto = {
            nombre: 'Mouse Gamer',
            precio: 30,
            codigoSKU: 'MOU-001',
            categoria: 'PERIFERICOS',
            proveedor: '507f1f77bcf86cd799439011'
        };

        Producto.create.mockResolvedValue({
            _id: '999',
            ...nuevoProducto
        });

        const response = await request(app)
            .post('/api/productos')
            .send(nuevoProducto);

        expect(response.status).toBe(201);
        expect(response.body.nombre).toBe('Mouse Gamer');
        expect(Producto.create).toHaveBeenCalledWith(nuevoProducto);
    });

    it('Deberia devolver estatus 400 si faltan datos obligatorios al crear', async () => {
        const response = await request(app)
            .post('/api/productos')
            .send({ nombre: 'Mouse Gamer' });

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe('Errores de validacion en los datos enviados');
        expect(response.body.detalles.length).toBeGreaterThan(0);
        expect(Producto.create).not.toHaveBeenCalled();
    });

    it('Deberia devolver estatus 400 si falla la creacion del producto', async () => {
        Producto.create.mockRejectedValue(new Error('Error de base de datos'));

        const response = await request(app)
            .post('/api/productos')
            .send({
                nombre: 'Mouse Gamer',
                precio: 30,
                codigoSKU: 'MOU-001',
                categoria: 'PERIFERICOS',
                proveedor: '507f1f77bcf86cd799439011'
            });

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe('Error al crear el producto');
        expect(response.body.detalle).toBe('Error de base de datos');
    });

    it('Deberia actualizar un producto', async () => {
        const productoActualizado = { _id: '507f1f77bcf86cd799439011', nombre: 'Mouse actualizado' };
        const cambios = { nombre: 'Mouse actualizado' };
        Producto.findByIdAndUpdate.mockReturnValue({
            populate: jest.fn().mockResolvedValue(productoActualizado)
        });

        const response = await request(app)
            .put('/api/productos/507f1f77bcf86cd799439011')
            .send(cambios);

        expect(response.status).toBe(200);
        expect(Producto.findByIdAndUpdate).toHaveBeenCalledWith(
            '507f1f77bcf86cd799439011',
            cambios,
            { new: true, runValidators: true }
        );
        expect(response.body).toEqual(productoActualizado);
    });

    it('Deberia devolver 404 al actualizar un producto inexistente', async () => {
        Producto.findByIdAndUpdate.mockReturnValue({
            populate: jest.fn().mockResolvedValue(null)
        });

        const response = await request(app)
            .put('/api/productos/507f1f77bcf86cd799439011')
            .send({ nombre: 'Mouse actualizado' });

        expect(response.status).toBe(404);
        expect(response.body.mensaje).toBe('Producto no encontrado');
    });

    it('Deberia devolver 400 si los datos de actualizacion son invalidos', async () => {
        const response = await request(app)
            .put('/api/productos/507f1f77bcf86cd799439011')
            .send({ precio: -1 });

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe('Errores de validacion en los datos enviados');
        expect(response.body.detalles.length).toBeGreaterThan(0);
        expect(Producto.findByIdAndUpdate).not.toHaveBeenCalled();
    });

    it('Deberia devolver 400 si falla la actualizacion del producto', async () => {
        Producto.findByIdAndUpdate.mockReturnValue({
            populate: jest.fn().mockRejectedValue(new Error('Error de base de datos'))
        });

        const response = await request(app)
            .put('/api/productos/507f1f77bcf86cd799439011')
            .send({ nombre: 'Mouse actualizado' });

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe('Error al actualizar el producto');
        expect(response.body.detalle).toBe('Error de base de datos');
    });

    it('Deberia marcar un producto como inactivo al borrarlo', async () => {
        const productoBorrado = { _id: '507f1f77bcf86cd799439011', estadoActivo: false };
        Producto.findByIdAndUpdate.mockResolvedValue(productoBorrado);

        const response = await request(app).delete('/api/productos/507f1f77bcf86cd799439011');

        expect(response.status).toBe(200);
        expect(Producto.findByIdAndUpdate).toHaveBeenCalledWith(
            '507f1f77bcf86cd799439011',
            { estadoActivo: false },
            { new: true, runValidators: true }
        );
        expect(response.body).toEqual(productoBorrado);
    });

    it('Deberia devolver 404 al borrar un producto inexistente', async () => {
        Producto.findByIdAndUpdate.mockResolvedValue(null);

        const response = await request(app).delete('/api/productos/507f1f77bcf86cd799439011');

        expect(response.status).toBe(404);
        expect(response.body.mensaje).toBe('Producto no encontrado');
    });

    it('Deberia devolver 400 si falla el borrado del producto', async () => {
        Producto.findByIdAndUpdate.mockRejectedValue(new Error('Error de base de datos'));

        const response = await request(app).delete('/api/productos/507f1f77bcf86cd799439011');

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe('Error al borrar el producto');
        expect(response.body.detalle).toBe('Error de base de datos');
    });

});
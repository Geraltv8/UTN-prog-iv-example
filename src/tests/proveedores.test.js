import request from 'supertest';
import jwt from 'jsonwebtoken';
import { jest } from '@jest/globals';

process.env.JWT_SECRET ??= 'test-secret';

jest.unstable_mockModule('../models/Proveedor.js', () => ({
    Proveedor: {
        create: jest.fn(),
        find: jest.fn(),
        findByIdAndUpdate: jest.fn()
    }
}));

const { default: app } = await import('../../app.js');
const { Proveedor } = await import('../models/Proveedor.js');

const crearToken = (rol = 'ADMIN') => jwt.sign({ rol }, process.env.JWT_SECRET);

describe('pruebas sobre el modulo de Proveedores', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Deberia rechazar la consulta si no se envia un token', async () => {
        const response = await request(app).get('/api/proveedores');

        expect(response.status).toBe(401);
        expect(response.body.mensaje).toBe('Acceso denegado. token no valido');
        expect(Proveedor.find).not.toHaveBeenCalled();
    });

    it('Deberia obtener los proveedores con un token valido', async () => {
        const proveedores = [{ _id: '1', razonSocial: 'Proveedor Uno' }];
        Proveedor.find.mockResolvedValue(proveedores);

        const response = await request(app)
            .get('/api/proveedores')
            .set('Authorization', `Bearer ${crearToken()}`);

        expect(response.status).toBe(200);
        expect(Proveedor.find).toHaveBeenCalledWith({});
        expect(response.body).toEqual(proveedores);
    });

    it('Deberia filtrar proveedores por ciudad', async () => {
        Proveedor.find.mockResolvedValue([]);

        const response = await request(app)
            .get('/api/proveedores')
            .query({ ciudad: 'Córdoba' })
            .set('Authorization', `Bearer ${crearToken()}`);

        expect(response.status).toBe(200);
        expect(Proveedor.find).toHaveBeenCalledWith({ 'direccion.ciudad': 'Córdoba' });
    });

    it('Deberia devolver 500 si falla la consulta de proveedores', async () => {
        Proveedor.find.mockRejectedValue(new Error('Error de base de datos'));

        const response = await request(app)
            .get('/api/proveedores')
            .set('Authorization', `Bearer ${crearToken()}`);

        expect(response.status).toBe(500);
        expect(response.body.mensaje).toBe('Error del servidor');
        expect(response.body.detalle).toBe('Error de base de datos');
    });

    it('Deberia rechazar la creacion si no se envia un token', async () => {
        const response = await request(app)
            .post('/api/proveedores')
            .send({ razonSocial: 'Proveedor Uno' });

        expect(response.status).toBe(401);
        expect(Proveedor.create).not.toHaveBeenCalled();
    });

    it('Deberia rechazar la creacion para usuarios que no son administradores', async () => {
        const response = await request(app)
            .post('/api/proveedores')
            .set('Authorization', `Bearer ${crearToken('USER')}`)
            .send({ razonSocial: 'Proveedor Uno' });

        expect(response.status).toBe(403);
        expect(Proveedor.create).not.toHaveBeenCalled();
    });

    it('Deberia crear un proveedor para un administrador', async () => {
        const nuevoProveedor = {
            razonSocial: 'Proveedor Uno',
            cuit: '30123456789',
            contacto: { email: 'contacto@proveedor.com' },
            calificacion: 4
        };
        Proveedor.create.mockResolvedValue({ _id: '1', ...nuevoProveedor });

        const response = await request(app)
            .post('/api/proveedores')
            .set('Authorization', `Bearer ${crearToken()}`)
            .send(nuevoProveedor);

        expect(response.status).toBe(201);
        expect(Proveedor.create).toHaveBeenCalledWith(nuevoProveedor);
        expect(response.body.razonSocial).toBe('Proveedor Uno');
    });

    it('Deberia devolver 400 si falla la creacion del proveedor', async () => {
        Proveedor.create.mockRejectedValue(new Error('CUIT duplicado'));

        const response = await request(app)
            .post('/api/proveedores')
            .set('Authorization', `Bearer ${crearToken()}`)
            .send({ razonSocial: 'Proveedor Uno' });

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe('Error al crear el proveedor');
        expect(response.body.detalle).toBe('CUIT duplicado');
    });

    it('Deberia actualizar la calificacion de un proveedor', async () => {
        const proveedor = { _id: '507f1f77bcf86cd799439011', calificacion: 5 };
        Proveedor.findByIdAndUpdate.mockResolvedValue(proveedor);

        const response = await request(app)
            .patch('/api/proveedores/507f1f77bcf86cd799439011/calificacion')
            .send({ calificacion: 5 });

        expect(response.status).toBe(200);
        expect(Proveedor.findByIdAndUpdate).toHaveBeenCalledWith(
            '507f1f77bcf86cd799439011',
            { calificacion: 5 },
            { new: true, runValidators: true }
        );
        expect(response.body).toEqual(proveedor);
    });

    it('Deberia devolver 404 si no existe el proveedor al actualizar la calificacion', async () => {
        Proveedor.findByIdAndUpdate.mockResolvedValue(null);

        const response = await request(app)
            .patch('/api/proveedores/507f1f77bcf86cd799439011/calificacion')
            .send({ calificacion: 5 });

        expect(response.status).toBe(404);
        expect(response.body.mensaje).toBe('Proveedor no encontrado');
    });

    it('Deberia devolver 400 si falla la actualizacion de la calificacion', async () => {
        Proveedor.findByIdAndUpdate.mockRejectedValue(new Error('Calificacion invalida'));

        const response = await request(app)
            .patch('/api/proveedores/507f1f77bcf86cd799439011/calificacion')
            .send({ calificacion: 8 });

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe('Error al actualizar la calificación');
        expect(response.body.detalle).toBe('Calificacion invalida');
    });
});

import { Router } from "express";

const router = Router();

router.post('/registro', (req, res) =>{
    const cuerpoPeticion = req.body;

    res.status(201).json({
        mensaje: "Recurso Creado con existo",
        datosRecibidos: cuerpoPeticion
    });
});

router.get('/perfil/:id', (req, res) => {
    const idUsuario = req.params.id;
    res.send(`Hola Mundo! y hola ${idUsuario}`);
});

router.get('/buscar', (req, res) => {
    const categoria = req.query.categoria;
    res.send(`Hola Mundo 2! estas buscando: ${categoria}`);
});

export default router;
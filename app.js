import express from 'express';
import morgan from 'morgan';

const app = express();

//Middlewares globales
app.use(morgan('dev'));
app.use(express.json());

const PORT = 3000;


app.post('/registro', (req, res) =>{
    const cuerpoPeticion = req.body;

    res.status(201).json({
        mensaje: "Recurso Creado con existo",
        datosRecibidos: cuerpoPeticion
    });
});

app.get('/perfil/:id', (req, res) => {
    const idUsuario = req.params.id;
    res.send(`Hola Mundo! y hola ${idUsuario}`);
});

app.get('/buscar', (req, res) => {
    const categoria = req.query.categoria;
    res.send(`Hola Mundo 2! estas buscando: ${categoria}`);
});

app.listen(PORT, () => {
    console.log(`Servidor Express listo en http://localhost:${PORT}`);
});
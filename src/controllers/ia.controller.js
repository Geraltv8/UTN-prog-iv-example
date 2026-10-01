import { GoogleGenerativeAI } from "@google/generative-ai";
import { Producto } from '../models/Producto.js';

const genIA = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generarTexto = async (req, res) => {
    try {

        const { pregunta } = req.body;

        if (!pregunta) {
            return res.status(400).json({mensaje: "Hay que preguntar algo"});
        }

        const modelo = genIA.getGenerativeModel({model: "gemini-3.1-flash-lite"});

        const promptFinal = `Eres un asistente tecnico experto en Node.js. Responde la pregunta del usuario: ${pregunta}`;

        const resultadoIA = (await modelo.generateContent(promptFinal)).response.text();

        res.status(200).json({respuesta: resultadoIA});
    } catch (error) {
        console.error("Error en la API:", error);
        res.status(500).json({ mensaje: "Error al generado contenido por la IA"})
    }
};

export const cargarProductoConIA = async (req, res) => {
    try {
        const { nombreProducto, proveedor } = req.body;

        const prompt = `
            Sos un experto en e-commerce. analiza el siguiente producto: "${nombreProducto}".
            Debes devolver la informacion estrictamente con esta estructura JSON:  
            "codigoSKU": "debe tener un formato AAA-111",
            "nombre": "aca va el nombre del producto mencionado",
            "precio": (un precio sugerido busca en la web que sea competitivo),
            "stock": 10,
            "categoria": "PERIFERICOS" (analiza el nombre del producto para saber a que categoria corresponde: 'PERIFERICOS', 'MONITORES', 'COMPONENTES', 'ACCESORIOS'),
            "proveedor": "507f1f77bcf86cd799439011" (aca va ${proveedor} ,
            "estadoActivo": true
        `;


        const modelo = genIA.getGenerativeModel({
            model: "gemini-3.1-flash-lite",
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.3
            }
        });

        const resultadoIA = (await modelo.generateContent(prompt)).response.text();

        const datosFormateados = JSON.parse(resultadoIA);

        const producto = await Producto.create(datosFormateados);
        res.status(201).json({
            mensaje: "Producto autocompletado por ia insertado en BD",
            producto: producto
    });

    } catch(error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al procesar la solicitud"});
    }
};
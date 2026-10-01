import { GoogleGenerativeAI } from "@google/generative-ai";

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
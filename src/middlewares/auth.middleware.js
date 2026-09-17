import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ mensaje: "Acceso denegado. token no valido" });
        }

        const token = authHeader.split(' ')[1];

        const payloadDecodificado = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = payloadDecodificado;

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensaje: "El token ha expirado. inicie sesion nuevamente"});
        }
        return res.status(401).json({ mensaje: "Token invalido." });
    }
};
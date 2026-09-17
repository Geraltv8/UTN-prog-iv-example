
export const verificarRolAdmin = (req, res, next) => {
    
    if (!req.usuario) {
        return res.status(500).json({ mensaje: "Error interno: se intento verificar el rol, pero no se consiguio" });
    }

    if (req.usuario.rol !== 'ADMIN') {
        return res.status(403).json({ mensaje: "Acceso denegado, se requiere privilegios de administrador"});
    }

    next();
}
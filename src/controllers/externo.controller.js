export const obtenerClima = async (req, res) => {
    try {

        const lat = req.query.latitud
        const lon = req.query.longitud

        const respuestaExterna = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)

        if (!respuestaExterna.ok) {
            throw new Error(`La API externa fallo con status: ${respuestaExterna.status}`);
        }

        const datosClima = await respuestaExterna.json();

        res.status(200).json({
            mensaje: "Datos obtenidos de tecernos",
            temperaturaActual: `${datosClima.current_weather_units.temperature} ${datosClima.current_weather.temperature}`
        });

    } catch (error) {
        res.status(502).json({mensaje: "Bad Gateway: Error al comunicarse con el servidor externo"});
    }
};
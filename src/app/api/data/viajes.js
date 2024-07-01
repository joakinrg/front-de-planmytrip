import axios from "axios";

// Función para obtener todos los viajes asociados a un usuario por su email
export const showMyTrips = async (email) => {
    try {
        // Realizar la solicitud GET con el email como parámetro de consulta
        const getAllMyTrips = await axios.get(`http://localhost:8000/viajes/asociados/${email}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Imprimir los datos recibidos del servidor
        console.log("Datos que vienen del servidor (getAllMyTrips): ", getAllMyTrips.data);

        // Retornar los datos recibidos para poder usarlos en otro lugar de la aplicación
        return getAllMyTrips.data;
    } catch (error) {
        console.error("Error al obtener viajes (getAllMyTrips): ", error);
        throw error; // Lanzar el error para manejarlo más arriba si es necesario
    }
};

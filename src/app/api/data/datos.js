import axios from "axios";

// Función para obtener todos los viajes asociados a un usuario por su email
export const showMyDatos = async (email) => {
    try {
        // Realizar la solicitud GET con el email como parámetro de consulta
        const getAllMyDatos = await axios.get(`http://localhost:8000/user/search/email/${email}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Imprimir los datos recibidos del servidor
        console.log("Datos que vienen del servidor (getAllDatos): ", getAllMyDatos.data);

        // Retornar los datos recibidos para poder usarlos en otro lugar de la aplicación
        return getAllMyDatos.data;
    } catch (error) {
        console.error("Error al obtener viajes (getAllMyDatos): ", error);
        throw error; // Lanzar el error para manejarlo más arriba si es necesario
    }
};

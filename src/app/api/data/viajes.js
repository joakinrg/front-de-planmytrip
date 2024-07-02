import axios from "axios";
const cambiarFormato = (fechaStr) => {
    const [anio, mes, dia] = fechaStr.split("-");
    return new Date(`${dia}-${mes}-${anio}`);
  };
// Función para obtener todos los viajes asociados a un usuario por su email
export const showMyTrips = async (email) => {
  try {
    // Realizar la solicitud GET con el email como parámetro de consulta
    const getAllMyTrips = await axios.get(
      `http://[::1]:8000/viajes/asociados/${email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Imprimir los datos recibidos del servidor
    console.log(
      "Datos que vienen del servidor (getAllMyTrips): ",
      getAllMyTrips.data
    );

    // Retornar los datos recibidos para poder usarlos en otro lugar de la aplicación
    return getAllMyTrips.data;
  } catch (error) {
    console.error("Error al obtener viajes (getAllMyTrips): ", error);
    throw error; // Lanzar el error para manejarlo más arriba si es necesario
  }
};

export const getMyTrip = async (id) => {
  try {
    const getMyOneTrip = await axios.get(`http://[::1]:8000/viajes/${id}`, {
      headers: {
        "Content-Type": "application-json",
      },
    });

    console.log(
      "Datos que vienen del servidor (getMyOneTrip)",
      getMyOneTrip.data
    );

    return getMyOneTrip.data;
  } catch (error) {
    console.error("Error al obtener mi viaje (getMyOneTrip)", error);
    throw error;
  }
};

export const updateMyTrip = async (formData, id) => {

    const {titulo, fechaInicio, fechaRegreso, destino, descripcion} = formData
  try {
    const fechaI = cambiarFormato(fechaInicio);
    const fechaR = cambiarFormato(fechaRegreso);

    console.log(titulo," ", fechaI, " ", fechaR, " ", descripcion, " ", destino)
    const getMyOneTrip = await axios.patch(
      `http://[::1]:8000/viajes/${id}`,
      {
        titulo: titulo,
        fechaInicio: fechaI.toISOString(),
        fechaRegreso: fechaR.toISOString(),
        destino: destino,
        descripcion: descripcion

      },
      {
        headers: {
          "Content-Type": "application-json",
        },
      }
    );

    console.log(
      "Datos que vienen del servidor (getMyOneTrip)",
      getMyOneTrip.data
    );

    return getMyOneTrip.data;
  } catch (error) {
    console.error("Error al obtener mi viaje (getMyOneTrip)", error);
    throw error;
  }
};

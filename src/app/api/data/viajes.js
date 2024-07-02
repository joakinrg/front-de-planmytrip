import axios from "axios";
const cambiarFormato = (fechaDate) => {
  const dia = String(fechaDate.getDate()).padStart(2, '0');
  const mes = String(fechaDate.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso se suma 1
  const anio = fechaDate.getFullYear();
  const formattedDate = `${dia}-${mes}-${anio}`;
  console.log(formattedDate);
  return formattedDate;
};

export const showMyTrips = async (email) => {
  try {

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
    console.log(id)
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
    const fI = new Date(fechaInicio)
    const fR = new Date(fechaRegreso)
    const fechaI = cambiarFormato(fI)
    const fechaR = cambiarFormato(fR)

    
    console.log(fechaI, " ", fechaR)

    const updateMyOneTrip = await axios.patch(
      `http://[::1]:8000/viajes/${id}`,
      {
        titulo: titulo,
        descripcion: descripcion,
        fechaInicio: new Date(fechaI),
        fechaRegreso: new Date(fechaR),
        destino: destino
      },
      {
        headers: {
          "Content-Type": "application-json",
        },
      }
    );

    console.log(
      "Datos que vienen del servidor (updateMyOneTrip)",
      updateMyOneTrip.data
    );

    return updateMyOneTrip.data;
  } catch (error) {
    console.error("Error al actualizar mi viaje (updateMyTrip)", error.message);
    throw error;
  }
};
export const deleteMyTrip = async (id) => {
  try {
    console.log(id)
    const deleteMyTrip = await axios.delete(`http://[::1]:8000/viajes/${id}`, {
      headers: {
        "Content-Type": "application-json",
      },
    });

    console.log(
      "Se borro (deleteMyTrip)",
      deleteMyTrip.data
    );

    return deleteMyTrip.data;
  } catch (error) {
    console.error("Error al obtener borrar mi viaje (deleteMyTrip)", error);
    throw error;
  }
};
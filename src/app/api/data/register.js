import axios from "axios";
const cambiarFormato = (fechaStr) => {
  const [anio, mes, dia] = fechaStr.split("-");
  return new Date(`${dia}-${mes}-${anio}`);
};


export const signUp = async (email, password, nombre, apellidoM, apellidoP) => {
  try {

    console.log(email, " ", password, " ", nombre, " ", apellidoM, " ", apellidoP)

 
    const signUpSucc = await axios.post(
      `http://localhost:8000/auth/register`,
      {
        email: email,
        password: password,
        nombre: nombre,
        apellidoM: apellidoM,
        apellidoP: apellidoP,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return signUpSucc.data;
  } catch (error) {
    console.error("Error al registrarse: ", error);
  }
};

export const registerTrip = async (
  datosGenerales,
  modos,
  presupuesto,
  session
) => {
  try {
    const { titulo, descripcion, fechaIda, fechaRegreso, destino } =
      datosGenerales;

    const { modoTransporte, modoViaje } = modos;

    const {
      presupuestoViaje,
      presupuestoTransporte,
      presupuestoActividades,
      numeroAcompanantes,
    } = presupuesto;

    const { user } = session;
console.log(fechaRegreso)
console.log(fechaIda)

    const fechaFin = cambiarFormato(fechaRegreso);
    const fechaInicio = cambiarFormato(fechaIda);
    console.log({
      titulo: titulo,
      descripcion: descripcion,
      fechaInicio: fechaInicio.toISOString(),
      fechaRegreso: fechaFin.toISOString(),
      destino: destino,
      presupuestoViaje: parseInt(presupuestoViaje),
      presupuestoTransporte: parseInt(presupuestoTransporte),
      presupuestoActividades: parseInt(presupuestoActividades),
      acompanantes: parseInt(numeroAcompanantes),
      tipoModo: modoViaje,
      tipoTransporte: modoTransporte,
      email: user.email,
    });
    
    
    const regTrip = await axios.post(
      "http://localhost:8000/viajes/add",
      {
        titulo: titulo,
        descripcion: descripcion,
        fechaInicio: fechaInicio.toISOString(),
        fechaRegreso: fechaFin.toISOString(),
        destino: destino,
        presupuestoViaje: parseInt(presupuestoViaje),
        presupuetoTransporte: parseInt(presupuestoTransporte),
        presupuestoActividades: parseInt(presupuestoActividades),
        acompanantes: parseInt(numeroAcompanantes),
        tipoModo: modoViaje,
        tipoTransporte: modoTransporte,
        correo: user.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return regTrip.data;
  } catch (error) {
    console.error("Error al registrar el viaje: ", error.response.data);

    throw error;
  }
};
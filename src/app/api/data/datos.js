import axios from "axios";


export const showMyDatos = async (email) => {
 
  try {
    
    const getAllMyDatos = await axios.get(
      `http://[::1]:8000/user/search/email/${email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
 
    console.log(
      "Datos que vienen del servidor (getAllDatos): ",
      getAllMyDatos.data
    );

    return getAllMyDatos.data;
  } catch (error) {
    console.error("Error al obtener viajes (getAllMyDatos): ", error);
    throw error;
  }
};

export const updateMyDatos = async (misDatos) => {
  try {
    console.log("llega al back", misDatos);
    const { id, nombre, apellidoP, apellidoM, email, password } = misDatos;

    const updateName = await axios.patch(
      `http://[::1]:8000/user/persona/${id}`,
      {
        nombre,
        apellidoM,
        apellidoP,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updateEmail = await axios.patch(
      `http://[::1]:8000/user/email/${id}`,
      {
        email: email,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
/* 
    const updatePassword = await axios.patch(
      `http://[::1]:8000/user/password/${id}`,
      {
        password: password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("el nombre", updatePassword.data); */
    const updatedData = {
      id: id,
      persona: {
        nombre: updateName.data.nombre,
        apellidoP: updateName.data.apellidoP,
        apellidoM: updateName.data.apellidoM,
      },
      email: updateEmail.data.email,
    };
    console.log("Datos actualizados: ", updatedData);
    return updatedData;
  } catch (error) {
    console.error(
      "Datos que vienen del servidor (updateMyDatos)",
      error.message
    );
  }
};
 

export const updateMyPassword = async (pass, id) => {
  try {
    console.log(pass)
    const updatePassword = await axios.patch(
      `http://[::1]:8000/user/password/${id}`,
      {
        password: pass,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return updatePassword.data
  } catch (error) {
    console.error(
      "Datos que vienen del servidor (updateMyPassword)",
      error.message
    );
  }
}

export const deleteMyAccount = async (id) => {
  try {
    console.log("Si llego id para borrar:", id);
    const deleteUser = await axios.delete(
      `http://[::1]:8000/user/delete/${id}`,
      
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return deleteUser.data
  } catch (error) {}
};
 
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

export const updateMyDatos = async (misDatos) => {

    try {
    const id = misDatos[0].id
        const updateName = await axios.patch(`http://locahost:8000/user/persona/${id}`, {
            nombre:misDatos[0].persona.nombre,
            apellidoM: misDatos[0].persona.apellidoM,
            apellidoP: misDatos[0].persona.apellidoP,
        }, {
            withCredentials: true, 
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",

                "Content-Type" :"application/json"
            }
        })


        const updateEmail = await axios.patch(`http://localhost:8000/user/email/${id}`,{
            email: misDatos[0].email
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",

                "Content-Type" :"application/json"
            }
        })

        const updatePassword = await axios.patch(`http://loclahost:8000/user/password/${id}`, {
            password: password
        }, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",

                "Content-Type" :"application/json"
            }
        })

        const resDAT = updateName.data  + " "+ updateEmail


        return resDAT
    } catch (error) {
        console.error("Datos que vienen del servidor (updateMyDatos)", error.message)
    }

}

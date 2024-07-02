"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { showMyDatos, updateMyDatos, deleteMyAccount,updateMyPassword } from "@/app/api/data/datos";
import Modal from "@/components/Modal"; 

async function getMyDatos(email) {
  try {

    const res = await showMyDatos(email);
    console.log("Respuesta del back: ", res);
    return res;
  } catch (error) {
    console.error("Hubo un error al querer traer los datos", error);
  }
}
async function updatePass(pass, id) {
  try {
    if (pass === '') {
      console.log("No cambio la contraseña")
    } else {
      console.log(pass, " ", id)
      const res = await updateMyPassword(pass, id)
      console.log(res)
    }
  } catch (error) {
    
  }
}
function Datos() {
  const {router} = useRouter()
  const { data: session, status } = useSession();
  const [misDatos, setMisDatos] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    apellidoP: "",
    apellidoM: "",
    email: "",
  });
  const [pass, setPass] = useState('')
  useEffect(() => {
    const myData = async () => {
      if (status === "authenticated") {
        console.log(session.user.email);
        const myDataResponse = await getMyDatos(session.user.email);
        console.log("Prueba de que todo va ok: ", myDataResponse);
        setMisDatos(myDataResponse);
        setFormData({
          id: myDataResponse[0].id,
          nombre: myDataResponse[0].persona.nombre,
          apellidoP: myDataResponse[0].persona.apellidoP,
          apellidoM: myDataResponse[0].persona.apellidoM,
          email: myDataResponse[0].email,
        });
      }
    };
    myData();
  }, [session, status]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const updatedData = await updateMyDatos(formData);
      const updatePas = await updatePass(pass, formData.id)
      setMisDatos([updatedData]); // Actualiza misDatos con el dato actualizado
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handlePass = (e) => {
        const pass =  e.target.value
        setPass(pass)
    }
  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    try {
      await deleteMyAccount(formData.id);
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 bg-white bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Mis Datos</h1>
        {misDatos ? (
          <>
            {isEditing ? (
              <form>
                <div className="mb-4">
                  <label className="block text-left">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left">Apellido Paterno:</label>
                  <input
                    type="text"
                    name="apellidoP"
                    value={formData.apellidoP}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left">Apellido Materno:</label>
                  <input
                    type="text"
                    name="apellidoM"
                    value={formData.apellidoM}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left">Correo:</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left">Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handlePass}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="mb-4">
                <p>Nombre: {misDatos[0].persona.nombre}</p>
                <p>Apellido Paterno: {misDatos[0].persona.apellidoP}</p>
                <p>Apellido Materno: {misDatos[0].persona.apellidoM}</p>
                <p>Email: {misDatos[0].email}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleEditClick}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Eliminar Cuenta
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Cargando mis datos...</p>
        )}
      </div>
      {showModal && (
        <Modal>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">¿Seguro que quieres eliminar tu cuenta?</h2>
            <div className="flex justify-around">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Sí
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Datos;
``

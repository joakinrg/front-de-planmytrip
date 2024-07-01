"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { showMyDatos, updateMyDatos } from '@/app/api/data/datos';
import { useRouter } from 'next/navigation';
async function fetchMyDatos(email) {
  try {
    const res = await showMyDatos(email);
    console.log("Se obtuvieron los datos: ", res);
    return res;
  } catch (error) {
    console.error("Error del servidor: No se pudieron traer los datos: ", error);
    return [];
  }
}
async function sendMyDatos(misDatos) {
  try {
    console.log(misDatos[0].id)
    const res = await updateMyDatos(misDatos)
    console.log("Se actualizaron los datos", res)
    return res
  } catch (error) {
    console.error("Error del servidor: No se pudieron traer los datos: ", error)
  }
}


function Datos () {
  const {push} = useRouter()
  const { data: session, status } = useSession();
  const [misDatos, setMisDatos] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    appat: '',
    apmat: '',
    email: '',
    password: ''
  });
 
  useEffect(() => {
    const myTravel = async () => {
      if (status === "authenticated") {
        const datos = await fetchMyDatos(session.user.email);
        setMisDatos(datos);
        setFormData({
        nombre: datos.nombre,
        apellidoP: datos.apellidoP,
        apellidoM: datos.apellidoM,
        email: session.user.email
        });
      }
    };

    myTravel();
  }, [session, status]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar los datos del viaje

    const myNewTravel = async () => {
      const updateMisDatos = await sendMyUpdateInfo(formData) 
      if(updateMisDatos === undefined) {
        push("/Usuario/Datos")
      }  else {
        push(`/Usuario/Viajes`)
        
      }
    }
    
myNewTravel()
    console.log('Datos actualizados:', formData);
    setIsEditing(false);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-gray-800 flex items-center justify-center" style={{ backgroundImage: "url('/fondo-mis-viajes.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">Editar Viaje</h1>
        {misDatos ? (
          <>
            {!isEditing ? (
              <div className="bg-gray-700 bg-opacity-70 text-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-96">
                <p className="mb-2"><strong>Mi nombre:</strong> {misDatos.nombre}</p>
                <p className="mb-2"><strong>Mi Apellido Paterno:</strong> {misDatos.apellidoP}</p>
                <p className="mb-2"><strong>Mi Apellido Materno:</strong> {misDatos.apellidoM}</p>
                <p className="mb-2"><strong>Email:</strong> {misDatos.email}</p>
                <div className="flex space-x-4 justify-center">
                  <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">Editar</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg">Borrar</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-700 bg-opacity-70 text-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-96">
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="nombre">Nombre</label>
                  <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="apellidoP">Apellido Paterno</label>
                  <input type="date" id="apellidoP" name="apellidoP" value={formData.apellidoP} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="apellidoM">Apellido Materno</label>
                  <input type="date" id="apellidoM" name="apellidoM" value={formData.apellidoM} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
                  <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="password">Password</label>
                  <textarea id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 rounded-lg"></textarea>
                </div>
                <div className="flex space-x-4 justify-center">
                  <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg">Guardar</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg">Cancelar</button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div>Cargando datos...</div>
        )}
      </div>
    </div>
  );
}

export default Datos;

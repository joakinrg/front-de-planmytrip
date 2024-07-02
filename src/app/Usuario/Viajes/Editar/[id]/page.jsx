"use client"
import React, { useState, useEffect } from 'react';
import { getMyTrip, updateMyTrip } from '@/app/api/data/viajes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

async function fetchMyTrip(id) {
  try {
    const res = await getMyTrip(id);
    return res;
  } catch (error) {
    console.error("Error del servidor: No se pudo traer este viaje: ", error);
  }
}

async function sendMyUpdateInfo(formData, id) {
  try {
    console.log(formData)
    const res = await updateMyTrip(formData, id);
    console.log("respuesta después de actualizar: ", res);
    return res;
  } catch (error) {
    console.error("Error del servidor: No se pudo actualizar los datos: ", error);
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function Editar(id) {
  const { push } = useRouter();
  const { data: session, status } = useSession();
  const [miViaje, setMiViaje] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    fechaInicio: '',
    fechaRegreso: '',
    destino: '',
    descripcion: ''
  });

  useEffect(() => {
    const myTravel = async () => {
      if (status === "authenticated") {
        const viaje = await fetchMyTrip(id.params.id);
        setMiViaje(viaje);
        setFormData({
          titulo: viaje.titulo,
          fechaInicio: viaje.fechaInicio.split('T')[0],
          fechaRegreso: viaje.fechaRegreso.split('T')[0],
          destino: viaje.destino,
          descripcion: viaje.descripcion,
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

    const myNewTravel = async () => {
      const newTravel = await sendMyUpdateInfo(formData, id.params.id);
      if (newTravel === undefined) {
        push("/Usuario/Viajes");
      } else {
        setMiViaje(newTravel);
        push("/Usuario/Viajes");
      }
    };

    myNewTravel();
    console.log('Datos actualizados:', formData);
    setIsEditing(false);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-gray-800 flex items-center justify-center" style={{ backgroundImage: "url('/fondo-mis-viajes.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        {miViaje ? (
          <>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">{isEditing ? 'Editar Viaje' : 'Mis Viajes'}</h1>
            {!isEditing ? (
              <div className="bg-gray-700 bg-opacity-70 text-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-96">
                <p className="mb-2"><strong>Mi título:</strong> {miViaje.titulo}</p>
                <p className="mb-2"><strong>Fecha de ida:</strong> {formatDate(miViaje.fechaInicio)}</p>
                <p className="mb-2"><strong>Fecha de regreso:</strong> {formatDate(miViaje.fechaRegreso)}</p>
                <p className="mb-2"><strong>Destino:</strong> {miViaje.destino}</p>
                <p className="mb-4"><strong>Descripción:</strong> {miViaje.descripcion}</p>
                <div className="flex space-x-4 justify-center">
                  <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">Editar</button>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg">Borrar</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-700 bg-opacity-70 text-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-96">
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="titulo">Título</label>
                  <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="fechaInicio">Fecha de Inicio</label>
                  <input type="date" id="fechaInicio" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="fechaRegreso">Fecha de Regreso</label>
                  <input type="date" id="fechaRegreso" name="fechaRegreso" value={formData.fechaRegreso} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="destino">Destino</label>
                  <input type="text" id="destino" name="destino" value={formData.destino} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 rounded-lg" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2" htmlFor="descripcion">Descripción</label>
                  <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} className="w-full px-3 py-2 text-gray-800 rounded-lg"></textarea>
                </div>
                <div className="flex space-x-4 justify-center">
                  <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg">Guardar</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg">Cancelar</button>
                </div>
              </form>
            )}
            <span className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Crear Viaje
            </span>
          </>
        ) : (
          <div>Cargando datos...</div>
        )}
      </div>
    </div>
  );
}

export default Editar;

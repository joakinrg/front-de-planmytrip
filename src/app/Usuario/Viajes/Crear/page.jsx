"use client";
import React, { useState } from "react";
import Image from "next/image";
import { registerTrip } from "@/app/api/data/register";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Crear() {
  const {push} = useRouter()
  const [step, setStep] = useState(1); 
  const {data:session, status} = useSession()
  const [datosGenerales, setDatosGenerales] = useState({
    titulo: "",
    fechaIda: "",
    fechaRegreso: "",
    destino: "",
    descripcion: "",
  });
  const [modos, setModos] = useState({
    modoTransporte: "",
    modoViaje: "",
  });
  const [presupuesto, setPresupuesto] = useState({
    presupuestoModoViaje: "",
    costoActividades: "",
    costoActividadesRecreativas: "",
    numeroAcompanantes: "",
  });

  const handleDatosGeneralesSubmit = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };


  const handleModosSubmit = (event) => {
    event.preventDefault();
    setStep(step + 1);
  };

  const handlePresupuestoSubmit = (event) => {
    event.preventDefault();

    alert("¡Viaje creado con éxito!");

    setDatosGenerales({
      titulo: "",
      fechaIda: "",
      fechaRegreso: "",
      destino: "",
      descripcion: "",
    });
    setModos({
      modoTransporte: "",
      modoViaje: "",
    });
    setPresupuesto({
      presupuestoViaje: '',
      presupuestoTransporte: '',
      presupuestoActividades: '',
      numeroAcompanantes: ''
    });
    setStep(1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  
  const sendTravel = async (e) => {
      e.preventDefault()
      const res = await registerTrip(datosGenerales, modos,presupuesto, session)
      if(res?.error) {
        push("/Usuario/Viajes")
      } else {
        push("/Usuario/Viajes/Crear")
      }
  }


  const renderFormContent = () => {
    switch (step) {
      case 1:
        return (
          <form
            onSubmit={handleDatosGeneralesSubmit}
            className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg opacity-100"
          >
            <h1 className="text-2xl font-bold text-white mb-4 ">
              Datos Generales
            </h1>
            <div className="mb-4 ">
              <label className="block text-white">Título:</label>
              <input
                type="text"
                value={datosGenerales.titulo}
                onChange={(e) =>
                  setDatosGenerales({
                    ...datosGenerales,
                    titulo: e.target.value,
                  })
                }
            className="block w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-white"
                required
                placeholder="Ingresa el Titulo del Viaje"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Fecha de Ida:</label>
              <input
                type="date"
                value={datosGenerales.fechaIda}
                onChange={(e) =>
                  setDatosGenerales({
                    ...datosGenerales,
                    fechaIda: e.target.value,
                  })
                }
                className="block w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Fecha de Regreso:</label>
              <input
                type="date"
                value={datosGenerales.fechaRegreso}
                onChange={(e) =>
                  setDatosGenerales({
                    ...datosGenerales,
                    fechaRegreso: e.target.value,
                  })
                }
                className="block w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Destino:</label>
              <input
                type="text"
                value={datosGenerales.destino}
                onChange={(e) => setDatosGenerales({ ...datosGenerales, destino: e.target.value })}
                className="block w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-white"
                required
                placeholder="Ingresa tu Destino"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Descripción:</label>
              <textarea
                value={datosGenerales.descripcion}
                onChange={(e) =>
                  setDatosGenerales({
                    ...datosGenerales,
                    descripcion: e.target.value,
                  })
                }
                 className="block w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-white"
                rows="4"
                required
                placeholder="Ingresa aquí la descripción"
              />
            </div>
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Regresar
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Siguiente
              </button>
            </div>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleModosSubmit} className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-4">Modos</h1>
            <div className="mb-4">
              <label className="block text-white">Modo de Transporte:</label>
              <select
                value={modos.modoTransporte}
                onChange={(e) => setModos({ ...modos, modoTransporte: e.target.value })}
                className="block w-full px-3 py-2 rounded bg-gray-700 text-white"
                required
              >
                <option value="">Selecciona...</option>
                <option value="Avión">Avión</option>
                <option value="Automóvil">Automóvil</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-white">Modo de Viaje:</label>
              <select
                value={modos.modoViaje}
                onChange={(e) => setModos({ ...modos, modoViaje: e.target.value })}
                className="block w-full px-3 py-2 rounded bg-gray-700 text-white"
                required
              >
                <option value="">Selecciona...</option>
                <option value="Solitario">Solitario</option>
                <option value="Pareja">Pareja - Romántica</option> 
                <option value="Amigos">Amigos de 3 en adelante</option>
                <option value="Familia">Familia Nuclear: 3 o más, máximo 5</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={handleBack} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                Regresar
              </button>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Siguiente
              </button>
            </div>
          </form>
        );
      case 3:
        return (
          <form onSubmit={handlePresupuestoSubmit} className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-4">Presupuesto</h1>
            <div className="mb-4">
              <label className="block text-white">Presupuesto de Viaje:</label>
              <input
                type="text"
                value={presupuesto.presupuestoViaje}
                onChange={(e) => setPresupuesto({ ...presupuesto, presupuestoViaje: e.target.value })}
                className="block w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-white"
                required
                placeholder="Presupuesto de Viaje"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Presupuesto de Transporte:</label>
              <input
                type="text"
                value={presupuesto.presupuestoTransporte}
                onChange={(e) => setPresupuesto({ ...presupuesto, presupuestoTransporte: e.target.value })}
                className="block w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-white"
                required
                placeholder="Presupuesto de Transporte"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Presupuesto de Actividades:</label>
              <input
                type="text"
                value={presupuesto.presupuestoActividades}
                onChange={(e) => setPresupuesto({ ...presupuesto, presupuestoActividades: e.target.value })}
                className="block w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-white"
                required
                placeholder="Presupuesto de Actividades"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Número de Acompañantes:</label>
              <input
                type="number"
                value={presupuesto.numeroAcompanantes}
                onChange={(e) => setPresupuesto({ ...presupuesto, numeroAcompanantes: e.target.value })}
                className="block w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:border-white"
                
                required
                placeholder="Número de Acompañantes"
              />
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={handleBack} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                Regresar
              </button>
              <button type="submit" onClick={sendTravel} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Crear Viaje
              </button>
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 relative">
      <Image
        src="/fondo-crear-viaje.jpg"
        alt="Fondo"
        className="absolute inset-0 object-cover w-full h-full opacity-50"
        layout="fill"
        objectFit="cover"
      />
      <div className="relative z-10 w-full max-w-lg opacity">{renderFormContent()}</div>
    </div>
  );
}

export default Crear;

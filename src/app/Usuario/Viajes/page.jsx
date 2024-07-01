"use client";
import React, { useEffect, useState } from "react";
import { showMyTrips, deleteMyTrip } from "@/app/api/data/viajes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Editar from "./Editar/[id]/page";

async function fetchMyTrips(email) {
  try {
    const res = await showMyTrips(email);
    console.log("Se obtuvieron los viajes: ", res);
    return res;
  } catch (error) {
    console.error(
      "Error del servidor: No se pudieron traer los viajes: ",
      error
    );
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

function Viajes() {
  const { data: session, status } = useSession();
  const [misViajes, setMisViajes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  useEffect(() => {
    const myTravels = async () => {
      if (status === "authenticated") {
        const email = session.user.email;
        const viajes = await fetchMyTrips(email);
        setMisViajes(viajes);
      }
    };

    myTravels();
  }, [session, status]);

  const handleDeleteClick = (id) => {
    setTripToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (tripToDelete) {
      try {
        await deleteTrip(tripToDelete);
        setMisViajes(misViajes.filter((viaje) => viaje.id !== tripToDelete));
        setShowModal(false);
        setTripToDelete(null);
      } catch (error) {
        console.error("Error al eliminar el viaje: ", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setTripToDelete(null);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-gray-800 flex items-center justify-center"
      style={{ backgroundImage: "url('/fondo-mis-viajes.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          Mis Viajes
        </h1>
        {misViajes ? (
          <div className="space-y-4">
          
              <div
           
                className="bg-slate-700 bg-opacity-70 text-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-96"
              >
                <h2 className="text-xl font-bold mb-2">{misViajes.titulo}</h2>
                <p className="mb-2">
                  <strong>Fecha de inicio:</strong>{" "}
                  {formatDate(misViajes.fechaInicio)}
                </p>
                <p className="mb-2">
                  <strong>Fecha de regreso:</strong>{" "}
                  {formatDate(misViajes.fechaRegreso)}
                </p>
                <p className="mb-4">
                  <strong>Destino:</strong> {misViajes.destino}
                </p>
                <div className="flex space-x-4 justify-center">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">
                    <Link
                      href={`/Usuario/Viajes/Editar/${misViajes.id}`}
                      as={`/Usuario/Viajes/Editar/${misViajes.id}`}
                    >
                      Editar Viaje
                    </Link>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(misViajes.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    Eliminar Viaje
                  </button>
                </div>
              </div>
         
          </div>
        ) : (
          <div>
            <p className="text-3xl md:text-5xl lg:text-7xl font-bold mb-8">
              Aún no tienes viajes registrados
            </p>
            <a
              href="/Usuario/Viajes/Crear"
              className="inline-block px-6 py-3 text-xl md:text-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
            >
              Crear Viaje
            </a>
          </div>
        )}
        <a
          href="/Usuario/Viajes/Crear"
          className="fixed bottom-8 right-8 px-6 py-3 text-xl md:text-2xl bg-green-600 hover:bg-green-800 text-white font-semibold rounded-full shadow-lg group"
        >
          <svg
            className="h-6 w-6 text-white-700"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path
              d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z"
              transform="rotate(-15 12 12) translate(0 -1)"
            />
            <line x1="3" y1="21" x2="21" y2="21" />
          </svg>
          <span className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 w-max px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Crear Viaje
          </span>
        </a>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">
              ¿Estás seguro que quieres eliminar este viaje?
            </h2>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Sí
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viajes;

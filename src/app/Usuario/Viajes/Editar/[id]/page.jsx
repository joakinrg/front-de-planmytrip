"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

function Editar() {
  const router = useRouter();
  console.log(router)
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-gray-800 flex items-center justify-center" style={{ backgroundImage: "url('/fondo-mis-viajes.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">Editar Viaje</h1>
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">ID del Viaje: {id}</p>
        {/* Aquí puedes agregar el formulario de edición del viaje */}
      </div>
    </div>
  );
}

export default Editar;

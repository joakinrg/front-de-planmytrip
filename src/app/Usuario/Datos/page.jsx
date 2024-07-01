<<<<<<< HEAD
"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import './dash.css';
import { showMyDatos } from '@/app/api/data/datos';

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

function Dashboard() {
  const { data: session, status } = useSession();
  const [misDatos, setMisDatos] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const myDatos = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        const email = session.user.email;
        const datos = await fetchMyDatos(email);
        setMisDatos(datos);
      }
    };

    myDatos();
  }, [session, status]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  return (
    <div>
      Dashboard
      <div className='container-dash'>
        <div>
          <h1>Usuario</h1>
          {misDatos && misDatos.length > 0 ? (
            <>
              <label>Nombre:</label>
              <input type="text" defaultValue={misDatos[0].persona.nombre} disabled={!editMode} />
              <br />
              <label>Apellido Paterno:</label>
              <input type="text" defaultValue={misDatos[0].persona.apellidoP} disabled={!editMode} />
              <br />
              <label>Apellido Materno:</label>
              <input type="text" defaultValue={misDatos[0].persona.apellidoM} disabled={!editMode} />
              <br />
              <label>Correo:</label>
              <input type="text" defaultValue={misDatos[0].email} disabled={!editMode} />
            </>
          ) : (
            <>
              <label>Nombre:</label>
              <input type="text" disabled={!editMode} />
              <label>Apellido Paterno:</label>
              <input type="text" disabled={!editMode} />
              <label>Apellido Materno:</label>
              <input type="text" disabled={!editMode} />
              <label>Correo:</label>
              <input type="text" disabled={!editMode} />
            </>
          )}
          {editMode && (
            <>
              <label>Contraseña:</label>
              <input type="text" placeholder="Teclea tu nueva contraseña" />
            </>
          )}
          {editMode ? (
            <>
              <button onClick={handleSaveClick}>Guardar Cambios</button>
              <button onClick={handleCancelClick}>Cancelar</button>
            </>
          ) : (
            <>
            <button onClick={handleEditClick}>Editar Datos</button>
            <button>Eliminar Cuenta</button></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

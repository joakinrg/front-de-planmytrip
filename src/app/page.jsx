"use client"

import { useState } from "react"

async function fetchData() {
  const res = await fetch("http://localhost:8000/user/list")
  if(!res.ok) {
    throw new Error ("Error al capturar los datos")
  }
  const data = res.json()
  return data
}

export default function Home() {
  const [data, useData] = useState();
  let fd = fetchData()

  alert(`AIDAD${fd}`)

  return (
    <body className="bg-black text-white p-10 ">
      <nav>
        <ul>
          <li>
            <a href="">Tareas</a>
          </li>
          <li>
            <a href="">Viaje</a>
          </li>
          <li>
            <a href="">Dashboard</a>
          </li>
          <li>
            <a href="">Registrarse</a>
          </li>
          <li>
            <a href="">Log in</a>
          </li>
        </ul>
      </nav>
      <div>
        <h1>TO DO Bátiz</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit in ut
          incidunt quas quam vitae officiis modi beatae. Voluptates iste nemo
          nesciunt aut dolores quis laboriosam quae placeat distinctio
          excepturi!
        </p>
        <div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non autem
            perspiciatis labore veritatis alias voluptas, nobis quibusdam
            accusamus nihil quidem ducimus vero, nam ipsam eaque tenetur quo
            mollitia ex repellendus.
            <h1>¿Por qué escogernos?</h1>
          </div>
        </div>

        <h1>Desarrolladores</h1>
        <ul>
          <li>Diseñador: Joaquin Rojas González</li>
          <li>Programador front-end: Joaquin Rojas González</li>
          <li>Programador back-end: Joaquin Rojas González</li>
          <li>Documentador: Joaquin Rojas González</li>
          <li>Becario: Joaquin Rojas González</li>
        </ul>
      </div>
      <footer>
        <img></img>
        <ul>
          <h1>Nuestras Redes Sociales</h1>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
        </ul>

        <ul>
          <h1>Acerca de</h1>
          <li>¿Quienes Somos?</li>
          <li>Nuestro Equipo</li>
        </ul>

        <p>@2023 Joaquin Rojas. Todos los derechos reservados</p>
      </footer>
    </body>
  );
}

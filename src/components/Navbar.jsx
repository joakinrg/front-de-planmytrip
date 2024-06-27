import React from "react";

function Navbar() {
  return (
    <nav className="bg-slate-950 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Sección izquierda con logo y enlaces */}
        <ul className="flex space-x-4 text-white">
          <li className="flex items-center">
            <img
              src="/footer-image.png"
              alt="Footer Image"
              className="h-13 w-12 mr-2"
            />
            <a
              href="/"
              className="hover:bg-gray-700 px-3 py-2 rounded text-2xl"
            >
              Plan My Trip
            </a>
          </li>
        </ul>

        {/* Sección derecha con enlaces de registro e inicio de sesión */}
        <ul className="flex space-x-4 text-white">
        <li className="relative flex items-center">
            <a
              href="/"
              className="hover:bg-gray-500 px-3 py-2 rounded flex items-center"
            >
              Home
              <svg
                className="w-6 h-6 ml-3 text-white-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </a>
          </li>
          <li className="relative flex items-center">
            <a
              href="/Cuenta"
              className="hover:bg-gray-500 px-3 py-2 rounded flex items-center"
            >
              <span>Cuenta</span>
              <svg
                className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
            </a>
          </li>
       
          <li className="relative flex items-center">
            <a
              href="/Cuenta/Usuario/Tareas"
              className="hover:bg-gray-500 px-3 py-2 rounded flex items-center"
            >
              <span>Tareas</span>
              <svg class="h-6 w-6 text-white-700"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="12 4 4 8 12 12 20 8 12 4" />  <polyline points="4 12 12 16 20 12" />  <polyline points="4 16 12 20 20 16" /></svg>
            </a>
          </li>


          <li className="relative flex items-center">
            <a
              href="/Cuenta/Usuario/Viajes"
              className="hover:bg-gray-500 px-3 py-2 rounded flex items-center"
            >
              <span>Viajes</span>
              <svg class="h-6 w-6 text-white-700"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z" transform="rotate(-15 12 12) translate(0 -1)" />  <line x1="3" y1="21" x2="21" y2="21" /></svg>
            </a>
          </li>
          <li className="relative flex items-center">
            <a
              href="/Cuenta/Usuario/Dashboard"
              className="hover:bg-gray-500 px-3 py-2 rounded flex items-center"
            >
              <span>Dashboard</span>
              <svg class="h-6 w-6 text-white-700"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="13" r="2" />  <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />  <path d="M6.4 20a9 9 0 1 1 11.2 0Z" /></svg>
            </a>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

{
  /*   <li><a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Tareas</a></li>
          <li><a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Viaje</a></li>
          <li><a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">Dashboard</a></li> */
}

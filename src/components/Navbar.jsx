"use client";
import React  from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
 
function Navbar() {
  const router = useRouter();
 const {data: session, status, update} = useSession()

 
  const handleSignOut = async () => {
    const data = await signOut({callbackUrl:"/"});

    if (!data.error) {
      console.log("data: ", data);
     // await update();
      router.push("/");
    } else {
      console.error("Error al cerrar sesión:", data.error);
    }
  };

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
            <a href="/" className="hover:bg-gray-700 px-3 py-2 rounded text-2xl">
              Plan My Trip
            </a>
          </li>
        </ul>

        {/* Sección derecha con enlaces de acuerdo a la sesión */}
        <ul className="flex space-x-4 text-white">
          {console.log(`Esta autenticado: ${status}. Cual es la sesión: ${session}`)}
          {status ==="authenticated" ? (
            <>
              <li className="relative flex items-center">
                <a
                  href="/Usuario/Viajes"
                  className="hover:bg-gray-500 px-3 py-2 rounded flex items-center"
                >
                  <span className="mr-2">Mis Viajes</span>
                  <svg className="h-6 w-6 text-white-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2-4l-2 -4h3l2 2h4l-2 -7h3z" /></svg>
                </a>
              </li>
              <li className="relative flex items-center">
                <a
                  href="/Usuario/Dashboard"
                  className="hover:bg-gray-500 px-3 py-2 rounded flex items-center"
                >
                  <span className="mr-2">Dashboard</span>
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
                    <circle cx="12" cy="13" r="2" />
                    <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                    <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                  </svg>
                </a>
              </li>
              <li className="relative flex items-center">
                <a
                  href="/"
                  onClick={handleSignOut}
                  className="hover:bg-gray-500 px-3 py-2 rounded flex items-center"
                >
                  <span className="mr-2">Cerrar Sesión</span>
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
            </>
          ) : (
            <>
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
                  <span className="mr-2">Cuenta</span>
                  <svg
                    className="h-6 w-6 text-white-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

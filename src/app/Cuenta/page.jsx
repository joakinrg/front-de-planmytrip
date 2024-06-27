"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
function Cuenta() {
  const { push } = useRouter();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showLoginFormAdmin, setShowLoginFormAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //States Registro
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  //States Login
 

  //States Login Admin
  const [usernameAdmin, setUserNameAdmin] = useState("")
  const [emailAdmin, setEmailAdmin] = useState("")


  //HandleLogin
  const handleLogin = async() => {

    const parameters = {
      email: email,
      password:password
    }


    const res = await fetch("http://localhost:8000/auth/login", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(parameters)
    })

    if(!res.ok) {
      throw new Error("Error al iniciar sesión")
    }
    const data = res.json()
    console.log("INICIO SESION",data)
    push("/Cuenta/Usuario")

  }


  const toggleForm = () => {
    setShowLoginForm(true);
    setShowLoginFormAdmin(false);
  };

  const toggleFormAdmin = () => {
    setShowLoginForm(false);
    setShowLoginFormAdmin(true);
  };

  const toggleRegisterForm = () => {
    setShowLoginForm(false);
    setShowLoginFormAdmin(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/registro-fondo.png')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Registro e Inicio de Sesión</h2>

        {!showLoginForm && !showLoginFormAdmin && (
          <form className="mb-8 space-y-4">
            <h3 className="text-xl font-semibold mb-2">Registro</h3>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              >
                {showPassword ? (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
            <p className="mt-4 text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-indigo-600 hover:underline focus:outline-none"
              >
                Inicia Sesión
              </button>
            </p>
            <p className="mt-4 text-center text-sm">
              ¿Eres{" "}
              <button
                type="button"
                onClick={toggleFormAdmin}
                className="text-indigo-600 hover:underline focus:outline-none"
              >
                Administrador?
              </button>
            </p>
          </form>
        )}

        {showLoginForm && (
          <form className="space-y-4" onSubmit={handleLogin}>
            <h3 className="text-xl font-semibold mb-2">Inicio de Sesión</h3>
            <div>
              <label
                htmlFor="loginEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Correo
              </label>
              <input
                type="text"
                id="loginEmail"
                name="loginEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="loginPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="loginPassword"
                name="loginPassword"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              >
                {showPassword ? (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar Sesión
            </button>
            <p className="mt-4 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <button
                type="button"
                onClick={toggleRegisterForm}
                className="text-indigo-600 hover:underline focus:outline-none"
              >
                Regístrate
              </button>
            </p>
          </form>
        )}

        {showLoginFormAdmin && (
          <form className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">
              Inicio de Sesión Administrador
            </h3>
            <div>
              <label
                htmlFor="adminUsername"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="adminUsername"
                name="adminUsername"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="adminPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="adminPassword"
                name="adminPassword"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              >
                {showPassword ? (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Iniciar Sesión
            </button>
            <p className="mt-4 text-center text-sm">
              ¿No tienes una cuenta?{" "}
              <button
                type="button"
                onClick={toggleRegisterForm}
                className="text-indigo-600 hover:underline focus:outline-none"
              >
                Regístrate
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Cuenta;

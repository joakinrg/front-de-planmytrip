"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signUp } from "../api/data/register";
function Cuenta() {
  const { push } = useRouter();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // States Registro
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apellidoM, setapellidoM] = useState("");
  const [apellidoP, setapellidoP] = useState("");
  //HandleSignup
  const handleSignUp = async (e) => {
    e.preventDefault();
    const res = await signUp(email, password, username, apellidoM, apellidoP);
    console.log("Sign up response: ", res);

    if (res?.error) {
      push("/Cuenta");
    } else {
      const login = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (login?.error) {
        push("/Cuenta");
      } else {
        push("/Usuario/Viajes");
      }
    }
  };

  // HandleLogin
  const handleLogin = async (event) => {
    event.preventDefault();

    console.log("Logging in with", { email, password });
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    console.log("Login response:", res);
    // Asegúrate de que res contiene los datos esperados
    if (res?.error) {
      push("/Cuenta");
    } else {
      push("/Usuario/Viajes");
    }
  };

  const toggleForm = () => {
    setShowLoginForm(true);
  };

  const toggleRegisterForm = () => {
    setShowLoginForm(false);
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

        {!showLoginForm && (
          <form className="mb-8 space-y-4" onSubmit={handleSignUp}>
            <h3 className="text-xl font-semibold mb-2">Registro</h3>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="appat"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido Paterno
              </label>
              <input
                type="text"
                id="appat"
                name="appat"
                value={apellidoP}
                onChange={(e) => setapellidoP(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="apmat"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido Materno
              </label>
              <input
                type="text"
                id="apmat"
                name="apmat"
                value={apellidoM}
                onChange={(e) => setapellidoM(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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

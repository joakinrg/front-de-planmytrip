import React from "react";
import Image from "next/image";
function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Primera columna con imagen */}
          <div className="col-span-3">
            <Image
              src="/footer-image.png"
              alt="Footer Image"
              width={100}
              height={100}
            />
          </div>
          {/* Segunda columna con redes sociales */}
          <div className="col-span-6">
            <h2 className="text-2xl ">Nuestras Redes Sociales</h2>
            <ul className="text-gray-400">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
          {/* Tercera columna con Acerca de */}
          <div className="col-span-3">
            <h2 className="text-2xl ">Acerca de</h2>
            <ul className="text-gray-400">
              <li>¿Quiénes Somos?</li>
              <li>Nuestro Equipo</li>
            </ul>
          </div>
          {/* Cuarta columna con derechos reservados */}
          <div className="col-span-12 text-center mt-4">
            <p>@2023 Joaquin Rojas. Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

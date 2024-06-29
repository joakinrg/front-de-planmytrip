import Image from "next/image";
import TravelCard from "@/components/TravelCard";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(options)





  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Contenedor de la sección con imagen de fondo */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/landing1.png"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="opacity-70 transition-transform duration-300 transform scale-105 hover:scale-100"
          />
        </div>
        <div className="absolute inset-0 flex items-end justify-end p-8 mb-16">
          <h1 className="text-7xl font-bold leading-tight">
            Bienvenido a Plan My Trip
          </h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-8 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Columna izquierda para el título */}
          <div className="flex items-center justify-center md:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-center">
              TO DO Bátiz
            </h2>
          </div>

          {/* Columna derecha para el texto formateado */}
          <div className="md:order-1">
            <p className="text-lg leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit in ut
              incidunt quas quam vitae officiis modi beatae. Voluptates iste nemo
              nesciunt aut dolores quis laboriosam quae placeat distinctio
              excepturi! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Sit in ut incidunt quas quam vitae officiis modi beatae. Voluptates
              iste nemo nesciunt aut dolores quis laboriosam quae placeat
              distinctio excepturi! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Sit in ut incidunt quas quam vitae officiis modi
              beatae. Voluptates iste nemo nesciunt aut dolores quis laboriosam
              quae placeat distinctio excepturi!
            </p>
          </div>
        </section>

        {/* Botón "Aprende Más" y enlace "Registrarse" */}
        <div className="flex justify-end mt-8">
          <div className="text-right">
            <h4 className="text-2xl font-bold">Aprende Más</h4>
            <a
              href="#"
              className="text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg inline-block mt-2 transition-colors duration-300"
            >
              Registrarse
            </a>
          </div>
        </div>

        {/* Sección con imagen de fondo y texto */}
        <div className="rounded-lg overflow-hidden bg-slate-700 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Columna izquierda para el título y el párrafo */}
            <div className="relative bg-cover bg-center rounded-lg overflow-hidden">
              <div
                className="bg-opacity-75 bg-black text-white rounded-lg p-6"
                style={{ backgroundImage: "url('/fondoDiv-land.png')" }}
              >
                <h3 className="text-3xl md:text-5xl font-bold mb-4">
                  ¿Por qué escogernos?
                </h3>
                <p className="text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                  autem perspiciatis labore veritatis alias voluptas, nobis
                  quibusdam accusamus nihil quidem ducimus vero, nam ipsam eaque
                  tenetur quo mollitia ex repellendus. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Non autem perspiciatis labore
                  veritatis alias voluptas, nobis quibusdam accusamus nihil
                  quidem ducimus vero, nam ipsam eaque tenetur quo mollitia ex
                  repellendus. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Non autem perspiciatis labore veritatis alias voluptas,
                  nobis quibusdam accusamus nihil quidem ducimus vero, nam ipsam
                  eaque tenetur quo mollitia ex repellendus.
                </p>
              </div>
            </div>

            {/* Columna derecha para el texto del h3 */}
            <div className="flex items-center justify-center">
              <div className="text-center md:text-right">
                <h3 className="text-3xl md:text-5xl font-bold">¿Por qué escogernos?</h3>
              </div>
            </div>
          </div>
        </div>

        <>
        
          {session ? (
            <TravelCard user= {session?.user} pagetype = {"Home"}/>
          ): (
            <h1 className="text-5xl"><a href="/Cuenta">Inicia sesión</a></h1>
          )}
        </>


        {/* Sección de Desarrolladores */}
        <div className="mt-12">
          <div className="text-center md:text-right">
            <h2 className="text-4xl font-bold">Desarrolladores</h2>
            <ul className="text-lg">
              <li>Diseñador: Joaquín Rojas González</li>
              <li>Programador front-end: Joaquín Rojas González</li>
              <li>Programador back-end: Joaquín Rojas González</li>
              <li>Documentador: Joaquín Rojas González</li>
              <li>Becario: Joaquín Rojas González</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

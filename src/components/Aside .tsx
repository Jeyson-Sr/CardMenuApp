import { useState } from "react";
import { CardMemory } from "./CardMemeryOpcion";

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Botón para móviles */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="lg:hidden fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded z-50"
      >
        ☰ Menú
      </button>

      {/* Sidebar */}
      <aside 
        className={`bg-gray-800 text-white w-full lg:w-1/5 h-screen p-5 fixed lg:static top-0 left-0 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 "
        }`}
      >
        <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="lg:hidden  top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded z-50"
      >
        ❌ Menú
      </button>
        <nav>
          <ul className="space-y-2">
            <li><a href="#" className="block p-2 rounded hover:bg-gray-700">Inicio</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-gray-700">Perfil</a></li>
            <li><a href="#" className="block p-2 rounded hover:bg-gray-700">Configuración</a></li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1  p-6 w-full h-screen   transition-all duration-300">
        <CardMemory />
      </main>
    </div>
  );
};

export default Aside;

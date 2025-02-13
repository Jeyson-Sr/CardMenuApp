import { Link } from "react-router-dom";

interface EstadoMenu {
  isOpen: boolean;
  setIsOpen: (nuevoEstado: boolean) => void;
}

export function Aside({ isOpen, setIsOpen }: EstadoMenu) {
  return (
    <aside
      className={`bg-gray-800 text-white w-full lg:w-1/5 h-screen p-5 fixed lg:static top-0 left-0 transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Botón para cerrar en móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        ❌ Menú
      </button>

      {/* Menú de navegación */}
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/inicio"
              className="block p-2 rounded hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              inicio
            </Link>
          </li>
          <li>
            <Link
              to="/flip"
              className="block p-2 rounded hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              CardMemoryFlip
            </Link>
          </li>
          <li>
            <Link
              to="/opcion"
              className="block p-2 rounded hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              CardMemoryOpcion
            </Link>
          </li>
          <li>
            <Link
              to="/config"
              className="block p-2 rounded hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Configuración
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

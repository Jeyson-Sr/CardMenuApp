import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Aside } from "../src/components/layout/Aside";
import { CardMemoryFlip } from "./components/cards/CardMemeryFlip";
import { CardMemoryOpcion } from "./components/cards/CardMemeryOpcion";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function ButtonMovile() {
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded z-50"
      >
        ☰ Menú
      </button>
    );
  }

  return (
    <Router>
      <div className="flex">
        {/* Botón para móviles */}
        <ButtonMovile />

        {/* Sidebar */}
        <Aside isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Contenido principal cambia dinámicamente */}
        <main className="flex-1 p-6 w-full h-screen transition-all duration-300">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="text-center text-5xl text-black">Bienvenido</h1>
              }
            />
            <Route path="/flip" element={<CardMemoryFlip />} />
            <Route
              path="/inicio"
              element={<h1 className="text-9xl text-black">Inicio</h1>}
            />
            <Route path="/opcion" element={<CardMemoryOpcion />} />
            <Route
              path="*"
              element={
                <h1 className="text-9xl text-red-500 text-center">
                  404 - Página no encontrada
                </h1>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

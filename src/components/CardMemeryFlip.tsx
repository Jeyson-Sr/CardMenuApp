import { useState, useEffect } from "react";
import { Palabras } from "../Types/palabra";
import { PalabraDisplay } from "../func/FunctionCardMemory";
import { data } from "../data/palabras";

export function CardMemoryFlip() {
  const [pregunta, setPregunta] = useState<Palabras[]>([]); //Lista de palabras a traducir
  const [cardisFlipped, setCardisFlipped] = useState<boolean>(false); //cambia la vista de la carta
  const [palabraActual, setPalabraActual] = useState<Palabras | null>(null); // guarda la palabra a traducir

  useEffect(() => {
    setPregunta(data);
    seleccionarPalabraAleatoria();
  }, [pregunta]);

  function FlipCard() {
    setCardisFlipped(!cardisFlipped);
  }

  function seleccionarPalabraAleatoria(lista: Palabras[] = pregunta) {
    if (lista.length > 0) {
      const palabraSeleccionada =
      lista[Math.floor(Math.random() * lista.length)];
      setPalabraActual(palabraSeleccionada);
    }
  }

  return (
    <div
      className="flex justify-center items-center h-screen"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg cursor-pointer">
        <div className="w-36 h-48 perspective-1000 cursor-pointer">
          <div
            className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
              cardisFlipped ? "rotate-y-180" : ""
            }`}
            onClick={FlipCard}
          >
            <div className=" group  absolute inset-0 w-full h-full flex items-center justify-center  ">
              <PalabraDisplay palabra={palabraActual?.palabraIngles} />
            </div>
            <div className=" group  absolute  w-full h-full flex items-center justify-center rotate-y-180 backface-hidden">
              <PalabraDisplay palabra={palabraActual?.palabraEspanol} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

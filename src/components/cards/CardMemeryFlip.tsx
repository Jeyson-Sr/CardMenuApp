import { useState, useEffect, useCallback } from "react";
import { Palabras } from "../../Types/palabra";
import { PalabraDisplay, SelectMemoryLevel } from "../../func/FunctionCard";
import { data } from "../../data/palabras";

export function CardMemoryFlip() {
  const [pregunta, setPregunta] = useState<Palabras[]>([]); //Lista de palabras a traducir
  const [cardisFlipped, setCardisFlipped] = useState<boolean>(false); //cambia la vista de la carta
  const [palabraActual, setPalabraActual] = useState<Palabras | null>(null); // guarda la palabra a traducir

  function FlipCard() {
    setCardisFlipped(!cardisFlipped);
  }

  const seleccionarPalabraAleatoria = useCallback(
    (lista: Palabras[] = pregunta) => {
      if (lista.length > 0) {
        const palabraSeleccionada =
          lista[Math.floor(Math.random() * lista.length)];
        setPalabraActual(palabraSeleccionada);
      }
    },
    [pregunta]
  );

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const respuesta = e.currentTarget.value;
    if (respuesta === "Si") {
      FlipCard();
    } else {
      if (respuesta === "No") {
        setCardisFlipped(false);
        setTimeout(() => {
          seleccionarPalabraAleatoria();
        }, 250);
      }
    }
  }
  useEffect(() => {
    setPregunta(data);
    seleccionarPalabraAleatoria();
  }, [pregunta, seleccionarPalabraAleatoria]);

  return (
    <div className="w-full h-full grid place-content-center">
      <div className="bg-white p-4 rounded-lg shadow-lg  ">
        <div className="w-36 h-48 perspective-100  ">
          <div
            className={`relative w-full h-full transition-transform duration-700 cursor-pointer [transform-style:preserve-3d] ${
              cardisFlipped ? "rotate-y-180" : ""
            }`}
          >
            <div className=" group  absolute inset-0 w-full h-full flex items-center justify-center backface-hidden ">
              <PalabraDisplay palabra={palabraActual?.palabraIngles || "perra"} />
            </div>
            <div className=" group  absolute  w-full h-full flex items-center justify-center rotate-y-180 backface-hidden">
              <PalabraDisplay palabra={palabraActual?.palabraEspanol || "perra"} />
            </div>
          </div>
          <div className="w-full flex justify-center  mt-20 ">
            <SelectMemoryLevel handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

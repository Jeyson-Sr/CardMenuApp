import { useCallback } from "react";
import {
  BarraRacha,
  Opciones,
  PalabraDisplay,
  RachaDisplay,
} from "../../func/FunctionCard";
import { useMemoryGame } from "../../hooks/useMemoryGame";

export function CardMemoryOpcion() {
  const {
    palabraActual,
    racha,
    puntuacion,
    verificarRespuesta,
    gnPregunta,
    isShow,
  } = useMemoryGame();

  const { correctas, total } = puntuacion;

  const handleOptionClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const respuesta = e.currentTarget.value;
      verificarRespuesta(respuesta);
    },
    [verificarRespuesta]
  );

  return (
    //quitar pt-15
    <div className=" w-full h-full pt-15 grid place-content-center">
      <BarraRacha correctas={correctas} total={total} />
      <div
        className={`w-full scale-90 sm:scale-100 p-4 flex flex-col md:flex-row gap-10 items-center justify-center relative`}
      >
        <RachaDisplay
          racha={racha}
          condicion={racha !== 0 ? "opacity-100" : "opacity-0"}
          elemento={`🔥 ${racha}`}
        />
        <RachaDisplay
          racha={racha}
          condicion={isShow !== true ? "opacity-0" : "opacity-100"}
          elemento={`❌`}
        />
        <PalabraDisplay palabra={palabraActual?.palabraIngles} />
        <Opciones opciones={gnPregunta} handleClick={handleOptionClick} />
      </div>
    </div>
  );
}

import { Palabras } from "../Types/palabra";
import {
  BarraRacha,
  Opciones,
  PalabraDisplay,
  RachaDisplay,
} from "../func/FunctionCardMemory";
import { useState, useEffect } from "react";
import { data } from "../data/palabras";


export function CardMemoryOpcion() {
  const [pregunta, setPregunta] = useState<Palabras[]>([]);//Lista de palabras a traducir
  
  const [palabraActual, setPalabraActual] = useState<Palabras | null>(null);// guarda la palabra a traducir
  const [gnPregunta, setGnPregunta] = useState<Palabras[]>([]);//Opciones de la traduccion de la palabra en ingles
  const [palabrasNoAcertadas, setPalabrasNoAcertadas] = useState<Palabras[]>([]);// guarda las palabras que no se acertaron
  const [racha, setRacha] = useState(0);//guarda la racha de traducciones correctas
  const [preguntasCorrectas, setPreguntasCorrectas] = useState(0);//guarda las traducciones correctas
  const [totalPreguntas, setTotalPreguntas] = useState(0);//guarda el total de traducciones respondidas
  
  useEffect(() => {
      setPregunta(data);
      generarNuevaPregunta(data);
  }, []);
  
  useEffect(() => {
    if (racha === 0) return;

    const timeout = setTimeout(() => setRacha(0), 3000);
    return () => clearTimeout(timeout);
  }, [racha]);

  const increaseracha = () => {
    setRacha((prev) => prev + 1);
  };

  function obtenerOpcionesAleatorias(lista: Palabras[], correcta: Palabras) {
    const opciones = new Set<Palabras>();
    opciones.add(correcta);

    while (opciones.size < 3) {
      const randomPalabra = lista[Math.floor(Math.random() * lista.length)];
      opciones.add(randomPalabra);
    }

    return Array.from(opciones).sort(() => Math.random() - 0.5);
  }

  function generarNuevaPregunta(lista: Palabras[] = pregunta) {
    if (lista.length === 0) return;

    const palabraSeleccionada = lista[Math.floor(Math.random() * lista.length)];
    setPalabraActual(palabraSeleccionada);
    setGnPregunta(obtenerOpcionesAleatorias(lista, palabraSeleccionada));
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const respuesta = e.currentTarget.value;
    setTotalPreguntas((prev) => prev + 1);

    if (respuesta === palabraActual?.palabraEspanol) {
      setPreguntasCorrectas((prev) => prev + 1);
      increaseracha();
      generarNuevaPregunta();
    } else {
      if (!palabrasNoAcertadas.some((p) => p.id === palabraActual?.id)) {
        setPalabrasNoAcertadas((prev) => [...prev, palabraActual!]);
      }
      setRacha(0);
      generarNuevaPregunta();
    }
  }

  return (
    //quitar pt-15
    <div className=" w-full h-full pt-15 grid place-content-center">
      <BarraRacha correctas={preguntasCorrectas} total={totalPreguntas} />
      <div className=" w-full scale-90 sm:scale-100 p-4 flex flex-col md:flex-row gap-10 items-center justify-center relative">
        <RachaDisplay racha={racha} />
        <PalabraDisplay palabra={palabraActual?.palabraIngles} />
        <Opciones opciones={gnPregunta} handleClick={handleClick} />
      </div>
    </div>
  );
}

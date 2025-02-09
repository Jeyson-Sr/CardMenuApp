import { Palabras } from "../Types/palabra";
import {
  BarraProgreso,
  Opciones,
  PalabraDisplay,
  StreakDisplay,
} from "../func/FunctionCardMemory";
import { useState, useEffect } from "react";

export function CardMemory() {
  const fetchUser = async (): Promise<Palabras[]> => {
    const response = await fetch("/public/data/palabras.json");
    return response.json();
  };
  const [pregunta, setPregunta] = useState<Palabras[]>([]);
  const [gnPregunta, setGnPregunta] = useState<Palabras[]>([]);
  const [palabraCorrecta, setPalabraCorrecta] = useState<Palabras | null>(null);
  const [palabrasNoAcertadas, setPalabrasNoAcertadas] = useState<Palabras[]>(
    []
  );
  const [streak, setStreak] = useState(0);
  const [preguntasCorrectas, setPreguntasCorrectas] = useState(0);
  const [totalPreguntas, setTotalPreguntas] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const datos = await fetchUser();
      setPregunta(datos);
      generarNuevaPregunta(datos);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (streak === 0) return;

    const timeout = setTimeout(() => setStreak(0), 3000);
    return () => clearTimeout(timeout);
  }, [streak]);

  const increaseStreak = () => {
    setStreak((prev) => prev + 1);
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
    setPalabraCorrecta(palabraSeleccionada);
    setGnPregunta(obtenerOpcionesAleatorias(lista, palabraSeleccionada));
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const respuesta = e.currentTarget.value;
    setTotalPreguntas((prev) => prev + 1);

    if (respuesta === palabraCorrecta?.palabraEspanol) {
      setPreguntasCorrectas((prev) => prev + 1);
      increaseStreak();
      generarNuevaPregunta();
    } else {
      if (!palabrasNoAcertadas.some((p) => p.id === palabraCorrecta?.id)) {
        setPalabrasNoAcertadas((prev) => [...prev, palabraCorrecta!]);
      }
      setStreak(0);
      generarNuevaPregunta();
    }
  }

  return (
    //quitar pt-15
    <div className=" w-full h-full pt-15 grid place-content-center">
      <BarraProgreso correctas={preguntasCorrectas} total={totalPreguntas} />
      <div className=" w-full p-4 flex flex-col md:flex-row gap-10 items-center justify-center relative">
        <StreakDisplay streak={streak} />
        <PalabraDisplay palabra={palabraCorrecta?.palabraIngles} />
        <Opciones opciones={gnPregunta} handleClick={handleClick} />
      </div>
    </div>
  );
}

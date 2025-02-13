import { useState, useEffect, useCallback, useMemo } from "react";
import { Palabras } from "../Types/palabra";
import { data } from "../data/palabras";

export function useMemoryGame() {
  const [pregunta, setPregunta] = useState<Palabras[]>([]); // Lista de palabras a traducir
  const [palabraActual, setPalabraActual] = useState<Palabras | null>(null);
  const [racha, setRacha] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [puntuacion, setPuntuacion] = useState({ correctas: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener opciones aleatorias
  function obtenerOpcionesAleatorias(lista: Palabras[], correcta: Palabras) {
    const opciones = new Set<Palabras>();
    opciones.add(correcta);

    while (opciones.size < 3) {
      const randomPalabra = lista[Math.floor(Math.random() * lista.length)];
      opciones.add(randomPalabra);
    }

    return Array.from(opciones).sort(() => Math.random() - 0.5);
  }

  // Memoización de opciones aleatorias
  const gnPregunta = useMemo(
    () => (palabraActual ? obtenerOpcionesAleatorias(pregunta, palabraActual) : []),
    [pregunta, palabraActual]
  );

  // Función para generar una nueva pregunta
  const generarNuevaPregunta = useCallback(
    (lista: Palabras[] = pregunta) => {
      if (lista.length === 0) return;

      const palabraSeleccionada = lista[Math.floor(Math.random() * lista.length)];
      setPalabraActual(palabraSeleccionada);
    },
    [pregunta]
  );

  // Función para verificar la respuesta del usuario
  const verificarRespuesta = useCallback(
    (respuesta: string) => {
      setPuntuacion((prev) => ({
        ...prev,
        total: prev.total + 1,
        correctas: respuesta === palabraActual?.palabraEspanol ? prev.correctas + 1 : prev.correctas,
      }));

      if (respuesta === palabraActual?.palabraEspanol) {
        setRacha((prev) => prev + 1);
        generarNuevaPregunta();
        setIsShow(false);
      } else {
        setRacha(0);
        setIsShow(true);
        if (!isShow) {
          setTimeout(() => {
            setIsShow(() => false);
          }, 1000);
        }
      }
    },
    [palabraActual, generarNuevaPregunta, isShow]
  );

  // Carga inicial de preguntas
  useEffect(() => {
    try {
      setPregunta(data);
      generarNuevaPregunta(data);
    } catch (err) {
      setError(String(err) + " Error al cargar las palabras");
      console.log(error)
    } finally {
      setIsLoading(false);
      console.log(isLoading)
    }
  }, [generarNuevaPregunta, error, isLoading]);

  // Reinicio de la racha después de 3 segundos
  useEffect(() => {
    if (racha === 0 || isShow) return;

    const timeout = setTimeout(() => setRacha(0), 3000);
    return () => clearTimeout(timeout);
  }, [racha, isShow]);

  return {
    palabraActual,
    racha,
    puntuacion,
    verificarRespuesta,
    gnPregunta,
    isShow,
  };
}

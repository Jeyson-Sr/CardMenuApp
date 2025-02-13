import { Palabras } from "../Types/palabra";
import React, { createContext, useReducer } from "react";


interface GameState {
    palabras: Palabras[];
    puntuacion: {
      correctas: number;
      total: number;
      racha: number;
    };
    configuracion: {
      idioma: string;
      dificultad: string;
    };
  }
  
  const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
  }>({ /* valores iniciales */ });
  
  export function GameProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    
    return (
      <GameContext.Provider value={{ state, dispatch }}>
        {children}
      </GameContext.Provider>
    );
  }
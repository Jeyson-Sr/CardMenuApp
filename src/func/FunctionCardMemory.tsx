import { Palabras } from "../Types/palabra";
import { motion } from "framer-motion";

function BarraRacha({
  correctas,
  total,
}: {
  correctas: number;
  total: number;
}) {
  return (
    <>
      <div className=" scale-80 sm:scale-100 w-70 flex flex-col  md:items-end md:justify-center float-end absolute top-5 right-0 sm:right-7 ">
        <div className="md:w-40  bg-gray-200 rounded-full h-6 md:h-3 overflow-hidden ">
          <div
            className="bg-green-500 h-full transition-all"
            style={{
              width: total > 0 ? `${(correctas / total) * 100}%` : "0%",
            }}
          ></div>
        </div>
        <p className="text-lg font-bold">{`Correctas: ${correctas} / ${total}`}</p>
      </div>
    </>
  );
}

function PalabraDisplay({ palabra }: { palabra?: string }) {
  return (
    <div className="bg-blue-300 rounded-4xl shadow-2xl ">
      <div className="w-80 h-70 rounded-2xl flex items-center justify-center">
        <h2 className="text-3xl select-none ">{palabra ?? "Cargando..."}</h2>
      </div>
    </div>
  );
}

function Opciones({
  opciones,
  handleClick,
}: {
  opciones: Palabras[];
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="w-full h-70 flex flex-col items-center justify-around">
      {opciones.map((opcion, index) => (
        <button
          key={index}
          onClick={handleClick}
          value={opcion.palabraEspanol}
          className="w-full md:w-90 h-18 rounded-2xl bg-blue-600 text-blue-50 shadow-2xl uppercase cursor-pointer"
        >
          {opcion.palabraEspanol}
        </button>
      ))}
    </div>
  );
}

function RachaDisplay({ racha }: { racha: number }) {
  return (
    <div className=" flex flex-col items-center gap-4 absolute -top-8 left-1/2 transform -translate-x-1/2">
      <motion.div
        key={racha}
        initial={{ scale: 1 }}
        animate={{ scale: 1.5, color: racha >= 5 ? "#FFD700" : "#FF4500" }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`text-4xl font-bold ${
          racha == 0 ? "opacity-0" : "opacity-100"
        }`}
      >
        🔥 {racha}
      </motion.div>
    </div>
  );
}




export { BarraRacha, PalabraDisplay, Opciones, RachaDisplay };

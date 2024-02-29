import { createContext, useContext, useState } from "react";
import { getAllItems } from '../services/itemService'


const MainContext = createContext();

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <MainContext.Provider value={{user, setUser}} >
      { children }
    </MainContext.Provider>
  )
}

export function useMainContext() {
  return useContext(MainContext);
}
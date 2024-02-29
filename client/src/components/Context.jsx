import { createContext, useContext, useState, useEffect } from "react";
import { getAllItems } from '../services/itemService'


const MainContext = createContext();

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    async function fetchAndSet () {
      const data = await getAllItems();
      const sortedList = data.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB
      });
      setList(sortedList);
    }
    fetchAndSet();
  }, []);


  return (
    <MainContext.Provider value={{user, setUser, list, setList}} >
      { children }
    </MainContext.Provider>
  )
}

export function useMainContext() {
  return useContext(MainContext);
}
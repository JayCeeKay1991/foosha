import { createContext, useContext, useState, useEffect } from "react";
import { getAllItems } from '../services/itemService'
import { getAllConversations } from "../services/ConversationService";


const MainContext = createContext();

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [conversationList, setConversationList] = useState([]);

  // fetch itemlist and conversationlist at init
  useEffect(() => {
    async function fetchAndSet () {
      const itemData = await getAllItems();
      const convoData = await getAllConversations();
      const sortedItems = itemData.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB
      });
      const sortedConvos = convoData.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB
      });
      setList(sortedItems);
      setConversationList(sortedConvos);
    }
    fetchAndSet();
  }, []);


  return (
    <MainContext.Provider value={{user, setUser, list, setList, conversationList, setConversationList}} >
      { children }
    </MainContext.Provider>
  )
}

export function useMainContext() {
  return useContext(MainContext);
}
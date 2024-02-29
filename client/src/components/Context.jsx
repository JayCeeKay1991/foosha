import { createContext, useContext, useState, useEffect } from "react";
import { getAllItems } from '../services/itemService'
import { getAllConversations } from "../services/conversationService";
import { getAllMessages } from "../services/messageService";


const MainContext = createContext();

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [conversationList, setConversationList] = useState([]);
  const [messageList, setMessageList] = useState([]);

  // fetch itemlist and conversationlist at init
  useEffect(() => {
    async function fetchAndSet () {
      const itemData = await getAllItems();
      const convoData = await getAllConversations();
      const messageData = await getAllMessages();


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
      const sortedMessages = messageData.sort((a, b) => {
        let dateA = new Date(a.dateTime);
        let dateB = new Date(b.dateTime);
        return dateA - dateB
      });

      setList(sortedItems);
      setConversationList(sortedConvos);
      setMessageList(sortedMessages);
    }
    fetchAndSet();
  }, []);


  return (
    <MainContext.Provider value={{user, setUser, list, setList, conversationList, setConversationList, messageList, setMessageList}} >
      { children }
    </MainContext.Provider>
  )
}

export function useMainContext() {
  return useContext(MainContext);
}
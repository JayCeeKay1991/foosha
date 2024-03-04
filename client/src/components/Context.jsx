import { createContext, useContext, useState, useEffect } from "react";
import { getAllItems } from '../services/itemService'
import { getAllConversations } from "../services/conversationService";
import { getAllMessages } from "../services/messageService";
import { fetchUserLocation } from "../services/mapApiService";
import { sortByDate } from "../services/utils";


const MainContext = createContext();

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [conversationList, setConversationList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [location, setLocation] = useState(null);

  // init of the app:
  // fetch location of user
  // fetch data lists
  useEffect(() => {
    async function fetchAndSet () {
      fetchUserLocation(setLocation);

      const itemData = await getAllItems();
      const convoData = await getAllConversations();
      const messageData = await getAllMessages();

      const sortedItems = sortByDate(itemData, 'date');
      const sortedConvos = sortByDate(convoData, 'date');
      const sortedMessages = sortByDate(messageData, 'dateTime');

      setList(sortedItems);
      setConversationList(sortedConvos);
      setMessageList(sortedMessages);
    }
    fetchAndSet();
  }, []);

  return (
    <MainContext.Provider value={{ user, setUser, list, setList, conversationList, setConversationList, messageList, setMessageList, location }} >
      { children }
    </MainContext.Provider>
  )
}

export function useMainContext() {
  return useContext(MainContext);
}
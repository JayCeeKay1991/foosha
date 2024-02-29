import { useState, useEffect } from "react";
import { getAllMessages } from "../services/messageService";
import { getAllConversations } from "../services/ConversationService";
import Conversation from "../components/Conversation";
import { useMainContext } from '../components/Context';


function Messages () {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const {user} = useMainContext();

  useEffect(() => {
    async function fetchAndSet () {
      const data = await getAllConversations();
      const filtered = data.filter(elem => elem.owner === user._id || elem.contact === user._id )
      const sortedConversations = filtered.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB
      });
      setConversations(sortedConversations);
    }
    fetchAndSet();
  }, []);


  return (
    <>
      <h2>Messages</h2>
      <div id="messages-thread-container" >
        {
           (!conversations.length) ? (<p>No conversations yet. Slide into someine's DMs! 🕊️</p>) : (conversations.map(elem => <Conversation key={elem._id} item={elem} ></Conversation>))
        }
      </div>
    </>
  )


}

export default Messages;
import { useState, useEffect } from "react";
import { getAllMessages } from "../services/messageService";
import { getAllConversations } from "../services/ConversationService";
import Conversation from "../components/Conversation";


function Messages () {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

    // load the full list when the route is loaded
  // sort by date for now, maybe by distance later
  useEffect(() => {
    async function fetchAndSet () {
      const data = await getAllConversations();
      const sortedConversations = data.sort((a, b) => {
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
           (!conversations.length) ? (<p>No conversations at the moment 🕊️</p>) : (conversations.map(elem => <Conversation key={elem._id} item={elem} ></Conversation>))
        }
      </div>
    </>
  )


}

export default Messages;
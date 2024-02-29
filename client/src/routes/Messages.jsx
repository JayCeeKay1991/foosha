import { useState } from "react";
import Conversation from "../components/Conversation";
import { useMainContext } from '../components/Context';


function Messages () {
  const [messages, setMessages] = useState([]);
  const {user, conversationList, setConversationList} = useMainContext();


  return (
    <>
      <h2>Messages</h2>
      <div id="messages-thread-container" >
        {
           (!conversationList.length) ? (<p>Slide into their DMs! 💚</p>) : (conversationList.map(elem => <Conversation key={elem._id} item={elem} ></Conversation>))
        }
      </div>
    </>
  )


}

export default Messages;
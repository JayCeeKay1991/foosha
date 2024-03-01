import { useState } from "react";
import Conversation from "../components/Conversation";
import { useMainContext } from '../components/Context';


function Messages () {
  const {user, conversationList } = useMainContext();

  // fixme ? maybe sort by newest message

  return (
    <>
      <h2>Messages</h2>
      <div id="messages-thread-container" >
        {
           (!conversationList.length) ? <p>Slide into their DMs! 💚</p> : conversationList.map(elem => elem.owner === user._id || elem.contact === user._id ? <Conversation key={elem._id} item={elem} ></Conversation> : null)
        }
      </div>
    </>
  )


}

export default Messages;
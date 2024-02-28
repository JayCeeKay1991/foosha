import { useState, useEffect } from "react";
import { getAllMessages } from "../services/messageService";
import Thread from "../components/Thread";


function Messages () {
  const [messages, setMessages] = useState([]);

    // load the full list when the route is loaded
  // sort by date for now, maybe by distance later
  useEffect(() => {
    async function fetchAndSet () {
      const data = await getAllMessages();
      const sortedMessages = data.sort((a, b) => a.thread - b.thread);
      setMessages(sortedMessages);
    }
    fetchAndSet();
  }, []);


  return (
    <>
      <h2>Messages</h2>
      <div id="messages-thread-container" >
        {
           (!messages.length) ? (<p>No conversations at the moment 🕊️</p>) : (messages.map(elem => <Thread key={elem._id} item={elem} ></Thread>))
        }
      </div>
    </>
  )


}

export default Messages;
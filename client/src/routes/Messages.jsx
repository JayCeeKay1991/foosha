import Conversation from "../components/Conversation";
import { useMainContext } from '../components/Context';


function Messages () {
  const {user, conversationList, setConversationList } = useMainContext();

  // hide conversations for saved items?
  // const [showSavedItems, setShowSavedItems] = useState(false);

  // function toggleList () {
  //   async function filterAndSet () {
  //     if (!showSavedItems) {
  //       const filteredList = list.filter(elem => elem.available === false && elem.owner === user._id)
  //       setConversationList(filteredList);
  //       setShowSavedItems(true)
  //     } else {
  //       const filteredList = list.filter(elem => elem.available === true && elem.owner === user._id)
  //       setConversationList(filteredList);
  //       setShowSavedItems(false)
  //     }
  //   }
  //   filterAndSet();
  // }

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
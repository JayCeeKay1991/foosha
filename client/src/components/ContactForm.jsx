import { useState } from "react";
import './ContactForm.css';
import { getConversationByItemId, postConversation } from "../services/conversationService";
import { useMainContext } from "./Context";
import { postMessage } from "../services/messageService";


function ContactForm ({item, setShowContactForm}) {

  const { user, setConversationList, setMessageList } = useMainContext();

  const initialState = {
    message: '',
    author: user._id,
    thread: '',
    dateTime: Date.now()
  }

  const [formValues, setFormValues] = useState(initialState);

  // changes in the form
  function changeHandler (event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value});
  }

  // submitting the form
  async function submitHandler (e) {
    e.preventDefault();
    try {
    async function createConversationAndMessage (formValues) {

      // Is there already a conversation for this item?
      const conversationInDb = await getConversationByItemId(item._id, user._id);

      // if so:
      if (conversationInDb) {
        const newMessage = await postMessage({...formValues, thread: conversationInDb._id});
        // update message list
        setMessageList(prevList => [...prevList, newMessage]);
      } else {
         // create a new conversation first
        const newConversation = await postConversation({
        itemName: item.title,
        itemId: item._id,
        itemImage: item.image,
        contact: user._id,
        owner: item.owner,
        });
        // then post the message and add it to the new convo
        const newMessage = await postMessage({...formValues, thread: newConversation._id});

        // add the new convo to list of conversations and update message list
        setConversationList(prevList => [...prevList, newConversation]);
        setMessageList(prevList => [...prevList, newMessage]);
      }
      // in any case:
      setFormValues(initialState);
      setShowContactForm(false);
    }
    createConversationAndMessage(formValues);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <form id="contact-form" onSubmit={submitHandler} >

      <input name="message" type="textarea" value={formValues.message} onChange={changeHandler} placeholder="message" required={true} ></input>

      <button className="save-button button-turqouise" type="submit">send</button>
    </form>
  )
}

export default ContactForm;
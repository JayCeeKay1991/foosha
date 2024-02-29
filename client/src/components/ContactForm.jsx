import { useState } from "react";
import './ContactForm.css';
import { postConversation } from "../services/conversationService";
import { useMainContext } from "./Context";


function ContactForm ({item, setShowContactForm, setConversationList}) {

  const { user } = useMainContext();

  const initialState = {
    itemName: item.title,
    itemId: item._id,
    contact: user._id,
    owner: item.owner
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
    async function createAndSet (formValues) {
      const newConversation = await postConversation(formValues);
      setConversationList((prevList) => [...prevList, newConversation]);
      setFormValues(initialState);
      setShowContactForm(false);
    }
    createAndSet(formValues);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <form id="add-form" onSubmit={submitHandler} >
      <button className="save-button button-turqouise" type="submit">save</button>
    </form>
  )
}

export default ContactForm;
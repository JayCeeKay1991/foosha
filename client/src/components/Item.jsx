import { useState } from 'react';
import './Item.css';
import { postConversation } from '../services/conversationService';
import { useMainContext } from "./Context";
import { FaLocationDot } from 'react-icons/fa6';
import { FaCommentDots } from 'react-icons/fa6';
import { formatDate } from '../services/utils';

function Item ({item}) {

  const { user, setConversationList } = useMainContext();

  function clickContact () {
    async function createConversation () {
      try {
        const newConversation = await postConversation({
        itemName: item.title,
        itemId: item._id,
        contact: user._id,
        owner: item.owner
      });
      setConversationList((prevList) => [...prevList, newConversation]);
    } catch (error) {
      console.error(error)
    }
  }
  createConversation();
  }


  return (
    <div id="item-container">
      <div id="item-info" >
        <img id="item-image" src={item.image} ></img>
        <p id="item-date" >{formatDate(item.date)}</p>
         <p id="item-location" > <FaLocationDot></FaLocationDot>location </p>
      </div>

      <div id="item-text" >
        <h3>{item.title}</h3>
        <p id="item-description" >{item.description}</p>
      </div>
      <img></img>
      {item.available ? (
          <div id="item-tools" >
        <button> <FaCommentDots onClick={clickContact} ></FaCommentDots> </button>
      </div>
        ) : (
          <p id="saved-stamp" >saved</p>
        )}
    </div>
  )
}

export default Item;
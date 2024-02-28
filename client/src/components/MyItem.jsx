import { useState } from 'react';
import './MyItem.css';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPencil } from 'react-icons/fa6';
import { FaTrashCan } from 'react-icons/fa6';
import { FaCircleCheck } from 'react-icons/fa6';

function MyItem ({item}) {

  function formatDate (dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
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
      <div id="item-tools" >
        <button> <FaPencil></FaPencil> </button>
        <button> <FaCircleCheck></FaCircleCheck> </button>
        <button> <FaTrashCan></FaTrashCan> </button>
      </div>
      <p id="saved-stamp" >{item.available ? '' : saved} </p>
    </div>
  )
}

export default MyItem;
import { useState } from 'react';
import './Item.css';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCommentDots } from 'react-icons/fa6';
import { formatDate } from '../services/utils';

function Item ({item}) {


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
        <button> <FaCommentDots></FaCommentDots> </button>
      </div>
        ) : (
          <p id="saved-stamp" >saved</p>
        )}
    </div>
  )
}

export default Item;
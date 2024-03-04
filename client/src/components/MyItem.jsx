import { useState } from 'react';
import './MyItem.css';
import './Item.css';
import { FaLocationDot, FaPencil, FaTrashCan, FaCircleCheck } from 'react-icons/fa6';
import { formatDate } from '../services/utils';
import { deleteItem } from '../services/itemService';
import { editItem } from '../services/itemService';
import { useMainContext } from './Context';
import { postImageToCloudinary } from '../services/itemService';
import Map from './Map';
import { formatLocation } from '../services/mapApiService';



function MyItem ({item}) {
  const { setList } = useMainContext();
  const [showEdit, setShowEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const initialState = {
    title: item.title || '',
    description: item.description || '',
    location: {
      lat: 0,
      lng: 0,
    },
    locationName: item.locationName || '',
    image: item.image || ''
  }

  const [formValues, setFormValues] = useState(initialState);

  // Handle changes for all inputs
  function changeHandler(e) {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setImageFile(files[0]);
    }
    else {
      setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
      }));
    }
  }

  // choosing a location by clicking on the map
  function handleLocationSelect (location) {
    setFormValues((prev) => ({ ...prev, location }));
  };

  // edit form submit
  async function submitHandler (e) {
    e.preventDefault();
    let imageUrl = '';
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'nwvjjpdw');
        imageUrl = await postImageToCloudinary(formData);
      } catch (error) {
        console.error(error);
      }
    }

    const locationName = await formatLocation(formValues.location.lat, formValues.location.lng);
    const newItemData = {
      ...formValues,
      image: imageUrl,
      locationName
    };

    try {
      const updatedItem = await editItem(item._id, newItemData);
      setFormValues(updatedItem);
      setList((list) => list.map(elem => {
        if (elem._id === item._id) return updatedItem;
        else return elem;
      }));
      setShowEdit(false);
    } catch (error) {
      console.error(error);
    }
  }


   // check button
  const markAsSaved = async () => {
    try {
      const body = item;
      const data = await editItem(item._id, {...body, available: false});
      setList((list) => list.map(elem => {
        if (elem._id === item._id) return data;
        else return elem;
        }
      ));
    } catch (error) {
      console.log(error);
    }
  }

  // delete button
  const handleDelete = async () => {
    try {
      async function deleteAndSet (id) {
      await deleteItem(id);
      setList((list) => list.filter(elem => elem._id !== item._id ));
    }
    deleteAndSet(item._id);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div id="item-edit-mode" >
    <div id="item-container">
      <div id="item-info" >
        <img id="item-image" src={item.image} ></img>
        <p id="item-date" >{formatDate(item.date)}</p>
         <p id="item-location" > <FaLocationDot></FaLocationDot>{item.locationName}</p>
      </div>

      <div id="item-text" >
        <h3>{item.title}</h3>
        <p id="item-description" >{item.description}</p>
      </div>
      <img></img>
        {item.available ? (
          <div id="item-tools" >
        <button onClick={()=> setShowEdit(!showEdit)} > <FaPencil></FaPencil> </button>
        <button onClick={markAsSaved} > <FaCircleCheck></FaCircleCheck> </button>
        <button onClick={handleDelete} > <FaTrashCan></FaTrashCan> </button>
      </div>
        ) : (
          <p id="saved-stamp" >saved</p>
          )}
    </div>
    {
      showEdit ? (
      <form id="edit-form" onSubmit={submitHandler} >
        <label>title</label>
        <input name="title" type="text" value={formValues.title} onChange={changeHandler} placeholder="user name" required={true} ></input>
        <label>description</label>
        <input name="description" type="text" value={formValues.description} onChange={changeHandler} placeholder="description" required={true} ></input>
        <label>location</label>
        <Map mapAsInput={true} onLocationSelect={handleLocationSelect} zoom={13}></Map>
        <label>image</label>
        <input id="upload-button-item-image" name="image" type="file" onChange={changeHandler} ></input>
        <button type="submit" className="button-turqouise save-edit-button" >save changes</button>
      </form>
      ) : null
    }
    </div>
  )
}

export default MyItem;
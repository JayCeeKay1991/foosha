import { useState } from "react";
import './AddForm.css';
import { postItem } from "../services/itemService";
import { useMainContext } from "./Context";
import Map from "./Map";
import { formatLocation } from "../services/mapApiService";


function AddForm ({setShowAddForm}) {

  const { user, setList } = useMainContext();

  const initialState = {
    title: "",
    description: "",
    owner: user._id,
    location: {
      lat: 0,
      lng: 0,
    },
    locationName: '',
    available: true,
    image: ""
  }

  const [formValues, setFormValues] = useState(initialState);

  // changes in the form
  function changeHandler (e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value});
  }

  // choosing a location by clicking on the map
  function handleLocationSelect (location) {
    setFormValues((prev) => ({ ...prev, location }));
  };

  // submitting the form
  async function submitHandler (e) {
    e.preventDefault();
    try {
      async function createAndSet (formValues) {
      const locationName = await formatLocation(formValues.location.lat, formValues.location.lng);
      const newItem = await postItem({...formValues, locationName: locationName});
      setList((prevList) => [...prevList, newItem]);
      setFormValues(initialState);
      setShowAddForm(false);
    }
    createAndSet(formValues);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form id="add-form" onSubmit={submitHandler} >

      <h3>Add new item</h3>

      <input name="title" type="text" value={formValues.title} onChange={changeHandler} placeholder="title" required={true} ></input>

      <input name="description" type="textarea" value={formValues.description} onChange={changeHandler} placeholder="description" required={true} ></input>

      <Map mapAsInput={true} onLocationSelect={handleLocationSelect} ></Map>

      <input id="upload-button" name="image" type="file" value={formValues.image} onChange={changeHandler} ></input>

      <button className="save-button button-turqouise" type="submit">save</button>
    </form>
  )
}

export default AddForm;
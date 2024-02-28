import { useState } from "react";
import './AddForm.css';

function AddForm () {

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: Date.now(new Date()),
    location: "",
    available: true
  });

  // changes in the form
  function changeHandler (event) {
    const { title, description, date, image, location } = event.target;
    setFormValues({ ...formValues, [name]: value});
  }

  // submitting the form
    // post item to database
    // getting all food items from database
    // loading updated item list interface


  return (
    <form id="add-form" >

      <h3>New item</h3>

      <input name="title" type="text" value={formValues.title} onChange={changeHandler} placeholder="title" required={true} ></input>

      <input name="description" type="textarea" value={formValues.description} onChange={changeHandler} placeholder="description" required={true} ></input>

      <input name="date" type="date" value={formValues.date} onChange={changeHandler} placeholder="date" required={true} ></input>

      <input name="location" type="text" value={formValues.location} onChange={changeHandler} placeholder="pick up location" required={true} ></input>

      <input id="upload-button" name="image" type="file" value={formValues.image} onChange={changeHandler} ></input>


      <button className="save-button button-turqouise" type="submit" >save</button>
    </form>
  )
}

export default AddForm;
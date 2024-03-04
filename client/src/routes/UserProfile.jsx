import React, { useState } from 'react';
import { useMainContext } from '../components/Context';
import './UserProfile.css';
import { updateUser } from '../services/userService';
import { postImageToCloudinary } from '../services/itemService';

function UserProfile () {
  const { user, setUser } = useMainContext();
  const [formValues, setFormValues] = useState({
    name: user.name || '',
    email: user.email || '',
    preferences: user.preferences || [],
    image: user.image || ''
  })
  const [imageFile, setImageFile] = useState(null);


  // Handle changes for all inputs
  function changeHandler(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormValues(prevValues => {
        const newPreferences = checked
          ? [...prevValues.preferences, name] // add preference
          : prevValues.preferences.filter(preference => preference !== name); // remove preference
        return { ...prevValues, preferences: newPreferences };
      });
    } else if (type === 'file') {
      setImageFile(files[0]);
    }
    else {
      setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
      }));
    }
  }

  // Submit handler
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

    const newUserData = {
      ...formValues,
      image: imageUrl,
    };

    try {
      const updatedUser = await updateUser(user._id, newUserData);
      setFormValues(updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <div id="user-header" >
    <img id="user-image-profile" src={user.image}></img>
    </div>
    <div>
      <form id="user-form" onSubmit={submitHandler} >
      <label>username</label>
        <input
          type='text' name='name' value={formValues.name} required={true} onChange={changeHandler} >
        </input>

        <label>email</label>
        <input type='email' name='email' value={formValues.email} required={true} onChange={changeHandler} ></input>

        <label>profile image</label>
        <input id="upload-button-profile" name="image" type="file" onChange={changeHandler} ></input>

        <label>food preferences</label>
        <fieldset id='preferences-list' >
          <div>
            <input type="checkbox" id="vegetarian" name="vegetarian" checked={formValues.preferences.includes('vegetarian')} onChange={changeHandler} />
            <label>vegetarian</label>
          </div>

          <div>
            <input type="checkbox" id="vegan" name="vegan" checked={formValues.preferences.includes('vegan')} onChange={changeHandler}/>
            <label>vegan</label>
          </div>

          <div>
            <input type="checkbox" id="pescetarian" name="pescetarian" checked={formValues.preferences.includes('pescetarian')} onChange={changeHandler}/>
            <label>pescetarian</label>
          </div>

          <div>
            <input type="checkbox" id="gluten-free" name="gluten-free" checked={formValues.preferences.includes('gluten-free')} onChange={changeHandler} />
            <label>gluten free</label>
          </div>

          <div>
            <input type="checkbox" id="omnivore" name="omnivore" checked={formValues.preferences.includes('omnivore')} onChange={changeHandler}/>
            <label>omnivore</label>
          </div>
        </fieldset>
        <button className='save-button button-turqouise' type='submit'>save</button>
      </form>
    </div>
    </>
  )
}

export default UserProfile;
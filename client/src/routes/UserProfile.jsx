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
  })
  const [imageFile, setImageFile] = useState(null);


  // Handle changes for all inputs
  function changeHandler(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormValues(prevValues => {
        // Add or remove the preference based on the checkbox state
        const newPreferences = checked
          ? [...prevValues.preferences, name] // Add preference
          : prevValues.preferences.filter(preference => preference !== name); // Remove preference
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
      setImageFile(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <div id="user-header" >
    <img id="user-image-profile" src={user.image} ></img>
      <p>User status</p>
    </div>
    <div>
      <form id="user-form" onSubmit={submitHandler} >
      <label>username</label>
        <input
          type='text' name='name' value={formValues.name} required={true} onChange={changeHandler} >
        </input>

        <label>email</label>
        <input type='email' name='email' value={formValues.email} required={true} onChange={changeHandler} ></input>

        <label>Preferences</label>
        <fieldset id='preferences-list' >
          <div>
            <input type="checkbox" id="vegetarian" name="vegetarian" checked={formValues.preferences.includes('vegetarian')} onChange={changeHandler} />
            <label>Vegetarian</label>
          </div>

          <div>
            <input type="checkbox" id="vegan" name="vegan" checked={formValues.preferences.includes('vegan')} onChange={changeHandler}/>
            <label>Vegan</label>
          </div>

          <div>
            <input type="checkbox" id="pescetarian" name="pescetarian" checked={formValues.preferences.includes('pescetarian')} onChange={changeHandler}/>
            <label>Pescetarian</label>
          </div>

          <div>
            <input type="checkbox" id="gluten-free" name="gluten-free" checked={formValues.preferences.includes('gluten-free')} onChange={changeHandler} />
            <label>Gluten free</label>
          </div>

          <div>
            <input type="checkbox" id="omnivore" name="omnivore" checked={formValues.preferences.includes('omnivore')} onChange={changeHandler}/>
            <label>Omnivore</label>
          </div>
        </fieldset>

        <input id="upload-button-profile" name="image" type="file" onChange={changeHandler} ></input>

        {/* <input type='password' name='password' value={formValues.password} required={true} onChange={changeHandler} ></input> */}
        <button className='save-button button-turqouise' type='submit'>save</button>
      </form>
    </div>
    </>
  )
}

export default UserProfile;
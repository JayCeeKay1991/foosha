import React, { useState, useRef, useEffect } from 'react';
import { useMainContext } from '../components/Context';
import './UserProfile.css';
import { updateUser } from '../services/userService';
import { useParams, useNavigate } from "react-router";

function UserProfile () {
  const { user, setUser } = useMainContext();
  const [formValues, setFormValues] = useState({
    name: user.name || '',
    email: user.email || '',
    password: '',
    preferences: user.preferences || []
  })


    // Handle changes for all inputs
    function changeHandler(e) {
      const { name, value } = e.target;
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
      }));
    }

      // Submit handler
  async function submitHandler(e) {
    e.preventDefault();
    async function updateAndSet (formValues) {
      const updatedUser = await updateUser(user._id, formValues);
      setUser((prevUser) => {
        if (user._id === prevUser._id) return updatedUser;
      });
      setFormValues(updatedUser);
    };
    updateAndSet(formValues);
  }


  return (
    <>
    <div id="user-header" >
      <img/>
      <button>upload</button>
      <p>User status</p>
    </div>
    <div>
      <form id="user-form" onSubmit={submitHandler} >
        <input
          type='text'
          name='name'
          value={formValues.name}
          required={true}
          onChange={changeHandler} >
        </input>

        <fieldset id='preferences-list' >
          <legend>Preferences</legend>
          <div>
            <input type="checkbox" id="vegetarian" name="vegetarian" />
            <label>Vegetarian</label>
          </div>

          <div>
            <input type="checkbox" id="vegan" name="vegan" />
            <label>Vegan</label>
          </div>

          <div>
            <input type="checkbox" id="pescetarian" name="pescetarian" />
            <label>Pescetarian</label>
          </div>

          <div>
            <input type="checkbox" id="gluten-free" name="gluten-free" />
            <label>Gluten free</label>
          </div>

          <div>
            <input type="checkbox" id="omnivore" name="omnivore" />
            <label>Omnivore</label>
          </div>
        </fieldset>

        <input type='email' name='email' value={formValues.email} required={true} onChange={changeHandler} ></input>
        {/* <input type='password' name='password' value={formValues.password} required={true} onChange={changeHandler} ></input> */}
        <button className='save-button button-turqouise' type='submit'>save</button>
      </form>
    </div>
    </>
  )
}

export default UserProfile;
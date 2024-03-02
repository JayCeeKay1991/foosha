import { useState } from 'react';
import { useMainContext } from '../components/Context';
import './UserProfile.css';
import { updateUser } from '../services/userService';

function UserProfile () {
  const { user, setUser } = useMainContext();

  const initialState = {
    name: user.name,
    email: user.email,
    password: user.password,
    image: user.image,
    status: user.status,
    preferences: user.preferences
  }

  const [formValues, setFormValues] = useState(initialState);

  // changes in the form
  function changeHandler (e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value});
  }

    // edit the information
    async function submitHandler (e) {
      e.preventDefault();
      try {
        async function updateUserProfile (formValues) {
          const updatedUser = await updateUser(formValues);
          setUser(updatedUser);
          setFormValues(initialState);
        }
        updateUserProfile(formValues);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <>
    <div id="user-header" >
      <img/>
      <button>upload</button>
      <p>User status</p>
    </div>
    <div>
      <form id="user-form" onSubmit={submitHandler} >
        <input type='text' name='name' required={true} onChange={changeHandler} ></input>

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

        <input type='email' name='email' required={true} onChange={changeHandler} ></input>
        <input type='password' name='password' required={true} onChange={changeHandler} ></input>
        <button className='save-button button-turqouise' type='submit'>save</button>
      </form>
    </div>
    </>
  )
}

export default UserProfile;
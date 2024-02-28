import { useState } from "react";
import './Login.css';

function LoginForm () {

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  // changes in the form
  function changeHandler (event) {
    const { email, password } = event.target;
    setFormValues({ ...formValues, [name]: value});
  }

  // submitting the form
    // getting user from database
    // getting all food items from database
    // loading item list interface


  return (
    <form id="login-form" >
      <input name="email" type="text" value={formValues.email} onChange={changeHandler} placeholder="email" required={true} ></input>
      <input name="password" type="text" value={formValues.password} onChange={changeHandler} placeholder="password" required={true} ></input>
      <button className="login-button button-turqouise" type="submit" >login</button>
    </form>
  )
}

export default LoginForm;
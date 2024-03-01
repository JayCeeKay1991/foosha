import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { login } from "../services/userService";
import { useMainContext } from '../components/Context';
import './root.css';
import mainLogo from '../assets/logo-crop.jpg';
import { FaRightFromBracket, FaParachuteBox, FaMapLocationDot, FaPaperPlane } from 'react-icons/fa6';


const initialState = {
  _id: "",
  email: "",
  password: "",
  location: {},
  image: {},
  preferences: [],
}

function Root() {
  const { user, setUser } = useMainContext();

  const navigate = useNavigate();

  // Login form
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  // changes in the login form
  function changeHandler (event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value});
  }

  // submitting the login form: login and navigate to all items
  const handleLogin = async (e) => {
    e.preventDefault();
    async function logInAndSet (formValues) {
      const { email, password } = formValues;

      const user = { email, password };
      const loggedInUser = await login(user);
      setFormValues({email: "", password: ""});
      setUser(loggedInUser);
      navigate('/items');
    }
    logInAndSet(formValues);
  };

  // logout button redirects back to start
  const handleLogout = async () => {
    function logoutAndRedirect () {
      setUser(initialState);
      navigate('/');
    }
    logoutAndRedirect();
  }



  // if logged in: showing app container, else: start screen
  return (
    <>
    {user?._id ? (
        <div id="app-container">
          <div id="top-menu" >
            <button id='user-button' ></button>
            <h4 className='background-logo'>Foosha</h4>
            <button className='button-turqouise' id='logout-button' onClick={handleLogout} >
            <FaRightFromBracket size={15}/>
            </button>
          </div>
          <div id='app-background'>
            <div id='item-list' >
              <Outlet />
            </div>
          </div>
          <nav id="bottom-menu" >
            <Link to={`/items/mine/{user._id}`} >
              <FaParachuteBox size={30} style={{ color: 'var(--icon-color-grey)' }} ></FaParachuteBox>
            </Link>
            <Link to={`/items`} >
            <FaMapLocationDot size={30} style={{ color: 'var(--icon-color-grey)' }} ></FaMapLocationDot>
            </Link>
            <Link to={`/messages`} >
            <FaPaperPlane size={30} style={{ color: 'var(--icon-color-grey)' }}></FaPaperPlane>
            </Link>
          </nav>
        </div>
    ) : (
      <>
        <div>
          <img src={mainLogo} className="logo-image" alt="Logo" />
          <h1 className='logo-name' >Foosha</h1>
        </div>

        <form id="login-form" onSubmit={handleLogin} >
          <input name="email" type="text" value={formValues.email} onChange={changeHandler} placeholder="email" required={true} ></input>

          <input name="password" type="text" value={formValues.password} onChange={changeHandler} placeholder="password" required={true} ></input>

          <button className="login-button button-turqouise" type="submit"  >login</button>
        </form>
      </>
    )}
    </>
  )
}

export default Root;
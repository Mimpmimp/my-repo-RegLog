import React, { useState } from "react";
import './index.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginRegister() {
  const [isSignUp, setIsSignUp] = useState(false); // To track whether the user is on Sign Up or Sign In

  const toggleForms = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const [fldUsername, setfldUsername] = useState("");
  const [fldPassword, setfldPassword] = useState("");
  const navigate = useNavigate()

  function register(event){
    event.preventDefault()
    axios.post("http://192.168.1.29:5000/api/add_user", { fldUsername, fldPassword }, {
      headers: {  
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      navigate("/home");
    })
    .catch((err) => {
      console.error("error during signup: ",err)
    })
  }

  
  function login(event) {
    event.preventDefault();

    axios.post("http://192.168.1.29:5000/auth/login", {fldUsername,fldPassword})
    .then(res => {
      console.log('Login Successful: ', res)
      navigate('/home')
    })
    .catch(err => {
      console.log("Request error: ", err);
    });
}

  return (
    <div className={`container ${isSignUp ? "active" : ""}`} id="container">
      {/* Sign Up Form */}
      <div className={`form-container sign-up ${isSignUp ? "active" : ""}`}>
        <form onSubmit={register}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" onChange={e => setfldUsername(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={e => setfldPassword(e.target.value)}/>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className={`form-container sign-in ${!isSignUp ? "active" : ""}`}>
        <form onSubmit={login}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your user password</span>
          <input type="username" 
          placeholder="Username" 
          onChange={e => setfldUsername(e.target.value)}/>

          <input type="password" placeholder="Password" onChange={e => setfldPassword(e.target.value)}/>
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle Between Forms */}
      <div className="toggle-container">
        <div className="toggle">
          <div className={`toggle-panel toggle-left ${!isSignUp ? "active" : ""}`}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login" onClick={toggleForms}>Sign In</button>
          </div>
          <div className={`toggle-panel toggle-right ${isSignUp ? "active" : ""}`}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of site features</p>
            <button className="hidden" id="register" onClick={toggleForms}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
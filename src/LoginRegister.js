import React, { useState } from "react";
import './index.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginRegister() {
  const [isSignUp, setIsSignUp] = useState(false); // To track whether the user is on Sign Up or Sign In

  const toggleForms = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  function register(event){
    event.preventDefault()
    axios.post("http://localhost:8001/register", { username, email, password }, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(res => {
      navigate("/home");
    })
    .catch(err => console.log(err))
  }

  const [values, setValues] = useState({
    email:"",
    password:""
  })
  function login(event) {
    event.preventDefault();
    axios.post("http://localhost:8001/login", values, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => {
      if (res.data.status === "Success") {
        navigate("/home");
      } else {
        alert("Error: " + res.data.error);
        console.log(res.data.error);
      }
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
          <input type="text" placeholder="Name" onChange={e => setUsername(e.target.value)}/>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
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
          <span>or use your email password</span>
          <input type="email" placeholder="Email" onChange={e => setValues({...values,email:e.target.value})}/>
          <input type="password" placeholder="Password" onChange={e => setValues({...values,password:e.target.value})}/>
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
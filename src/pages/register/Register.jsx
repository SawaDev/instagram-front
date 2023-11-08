import "./register.css";
import logo from "../../img/logo.PNG"
import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react";
import axios from "axios";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="register-wrapper">
        <div>
          <img src={logo} alt="" className="logo" />
        </div>
        <span className="register-desc">Connect with friends and the world around you on Instagram.</span>
        <div className="register-box">
          <input placeholder="username" className="register-input" type="text" ref={username} />
          <input placeholder="email" className="register-input" type="email" ref={email} />
          <input placeholder="password" className="register-input" type="password" ref={password} />
          <input placeholder="password again" className="register-input" type="password" ref={passwordAgain} />
          <button className="register-btn" onClick={handleClick}>Register</button>
          <span className="login-forget">Already have account?</span>
          <button className="login-btn_register" onClick={()=> navigate("/login")}>Login</button>
        </div>
      </div>
    </div>
  )
}
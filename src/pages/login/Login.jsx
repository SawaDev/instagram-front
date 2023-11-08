import "./login.css"
import logo from "../../img/logo.PNG"
import { useContext, useRef } from "react"
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    navigate("/extra");
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div>
          <img src={logo} alt="" className="logo" />
        </div>
        <span className="login-desc">Connect with friends and the world around you on Instagram.</span>
        <div className="login-box" >
          <input
            placeholder="username or email"
            className="login-input"
            type="email"
            required
            ref={email}
          />
          <input
            placeholder="password"
            className="login-input"
            required
            type="password"
            minLength="6"
            ref={password}
          />
          <button className="login-btn" type="submit" disabled={isFetching} onClick={handleClick}>
            {isFetching ? ("Loading...") : ("Login")}
          </button>
          <span className="login-forget">Forgot your password?</span>
          <button className="login-btn_register"><a style={{ textDecoration: "none", color: "white" }} href="/register">Create new account</a></button>
        </div>
      </div>
    </div>
  )
}
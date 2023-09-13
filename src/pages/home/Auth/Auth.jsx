import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import "./Auth.css";
import Logo from "../../../img/logo.png";
import { logIn,signUp } from "../../../actions/AuthAction";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const isLoading = useSelector(state=>state.authReducer.loading);
  console.log(isLoading);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    username: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSignUp){
      if(data.password === data.confirmpass){
        dispatch(signUp(data));
      } else{
        setConfirmPass(false);
      }
    } else{
      dispatch(logIn(data));
    }
  }
  const resetForm=()=>{
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
      username: "",
    })
  }
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas through the world</h6>
        </div>
      </div>
      <div className="a-right">
        <form  className="infoform authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                className="infoInput"
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
                value={data.value}
              />
              <input
                type="text"
                className="infoInput"
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
                value={data.value}

              />
            </div>
          )}
          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={data.value}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="infoInput"
              value={data.value}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                type="password"
                name="confirmpass"
                placeholder="Confirm Password"
                value={data.value}
                className="infoInput"
                onChange={handleChange}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {setIsSignUp((prev) => !prev);resetForm()}}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account! Sign up"}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={isLoading}>
            {isLoading?"Loading..." : isSignUp ? "Signup" : "Login"}
          </button>
        </form>
      </div>
      {/* <LogIn/> */}
    </div>
  );
};
function LogIn() {
  return (
    <div className="a-right">
      <form action="" className="infoform authForm">
        <h3>Log In</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="infoInput"
          />
        </div>
        <div>
          <span style={{ fontSize: "12px" }}>Don't have an accountSign up</span>
        </div>
        <button className="button info-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

function SignUp() {
  return (
    <div className="a-right">
      <form action="" className="infoform authForm">
        <h3>Sign up</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="infoInput"
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            className="infoInput"
          />
        </div>
        <div>
          <span style={{ fontSize: "12px" }}>
            Already have an account. Login!
          </span>
        </div>
        <button className="button infoButton" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Auth;

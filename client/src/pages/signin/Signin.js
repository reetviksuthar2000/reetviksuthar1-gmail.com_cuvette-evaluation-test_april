import React, { useState } from "react";
import style1 from "./Signin.module.css";
import { Login } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import logoimg from "../../assets/images/logoimg.png";

function Signin() {
  const navigate = useNavigate();
  const [input, setInputs] = useState({
    email: "",
    password: "",
  });

  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function handlesubmit(e) {
    e.preventDefault();
    const { email, password } = input;
    Login(email, password);
    navigate("/");
  }

  return (
    <div className={style1.main}>
      <div className={style1.signinform}>
        <div className={style1.logo}>
          <img src={logoimg} alt="" />
          <h2>Musicart</h2>
        </div>
        <div className={style1.welcometext}>
          <p> Welcome</p>
        </div>

        <div className={style1.top}>
          <div className={style1.form}>
            <h2>
              Sign in<span>. Already a customer?</span>
            </h2>
            <form className={style1.form_signin}>
              <p>Enter your email or mobile number</p>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handlechange}
                id=""
              />
              <p>Password</p>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handlechange}
                id="password"
              />
            </form>
            <button onClick={handlesubmit}>Continue</button>
            <p className={style1.terms}>
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </div>
          <div className={style1.spaceline}>
            <p className={style1.line}></p>
            <p className={style1.newuser}>New to Musicart?</p>
            <p className={style1.line}></p>
          </div>
          <div className={style1.register}>
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create your Musicart account
            </button>
          </div>
        </div>
      </div>
      <div className={style1.bottom}>
        <p>Musicart | All rights reserved</p>
      </div>
    </div>
  );
}

export default Signin;

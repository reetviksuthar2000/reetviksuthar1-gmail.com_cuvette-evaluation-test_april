import React, { useState } from "react";
import style2 from "./Signup.module.css";
import logoimg from "../../assets/images/logoimg.png";
import { useNavigate } from "react-router-dom";
import { Register } from "../../apis/auth";

function Signup() {
  const navigate = useNavigate();
  const [input, setInputs] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();

    const { name, mobile, email, password } = input;
    Register(name, mobile, email, password);
    navigate("/");
  };

  return (
    <div className={style2.container_signup}>
      <div className={style2.top_signup}>
        <div className={style2.head_logo}>
          <img src={logoimg} alt="" />
          <h2>Musicart</h2>
        </div>
        <div className={style2.welcometext}>
          <p> Welcome</p>
        </div>
        <div className={style2.head_signup}>
          <div className={style2.captions_signup}>
            <p className={style2.create}>Create Account</p>
            <p className={style2.mobile_create}>
              Create Account. <span>Don’t have an account?</span>
            </p>
            <form className={style2.form_signup}>
              <p>Your name</p>
              <input
                type="text"
                name="name"
                value={input.name}
                onInput={(e) => setInputs({ ...input, name: e.target.value })}
                id="name"
              />
              <p>Mobile number</p>
              <input
                type="number"
                name="mobile"
                value={input.mobile}
                onInput={(e) => setInputs({ ...input, mobile: e.target.value })}
                id="number"
              />
              <p>Email id</p>
              <input
                type="email"
                name="email"
                value={input.email}
                onInput={(e) => setInputs({ ...input, email: e.target.value })}
                id="email"
              />
              <p>Password</p>
              <input
                type="password"
                name="password"
                value={input.password}
                onInput={(e) =>
                  setInputs({ ...input, password: e.target.value })
                }
                id="password"
              />
            </form>
            <p className={style2.info_signup}>
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Musicart.
              Message and data rates may apply.
            </p>
            <button onClick={handlesubmit}>Continue</button>
            <p className={style2.terms_signup}>
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </div>
          <div className={style2.login_signup}>
            <p>
              Already have an account?{" "}
              <span onClick={() => navigate("/Signin")}>Sign in</span>
            </p>
          </div>
        </div>
      </div>
      <div className={style2.bottom_signup}>
        <p>Musicart | All rights reserved</p>
      </div>
    </div>
  );
}

export default Signup;

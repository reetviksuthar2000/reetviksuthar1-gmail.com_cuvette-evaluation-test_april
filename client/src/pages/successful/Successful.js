import React from "react";
import style7 from "./Successful.module.css";
import logoimg from "../../assets/images/logoimg.png";
import successimg from "../../assets/images/successimg.png";
import homebtn from "../../assets/icons/homebtn.png";
import userbtn from "../../assets/icons/userbtn.png";
// import notlogin from "../../assets/icons/notlogin.png";
import cartbtn from "../../assets/icons/cartbtn.png";
import { useNavigate } from "react-router-dom";
import line from "../../assets/icons/Line 14.png";

function Successful() {
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
    
  };
  
  const gotohome = () => {
    localStorage.removeItem("product_id");
    navigate("/");
    
  };


  return (
    <div className={style7.container_successful}>
      <div className={style7.top_successful}>
        <img src={logoimg} alt="" />
        <h1>Musicart</h1>
      </div>
      <div className={style7.middle_successful}>
        <div className={style7.success_message}>
          <img src={successimg} alt="" />
          <p className={style7.firsttext}>Order is placed successfully!</p>
          <p className={style7.secondtext}>
            You will be receiving a confirmation email with order details
          </p>
          <button onClick={gotohome}>Go back to Home page</button>
        </div>
      </div>
      <div className={style7.bottom_successful}>
        <p>Musicart | All rights reserved</p>
      </div>
      <div className={style7.bottom_buttons}>
        <div className={style7.home_btn}>
          <img className={style7.line} src={line} alt="" />
          <img
            onClick={gotohome}
            className={style7.img1}
            src={homebtn}
            alt=""
          />{" "}
          <p>Home</p>
        </div>
        <div className={style7.cart_btn}>
          <img onClick={() => navigate("/viewcart")} src={cartbtn} alt="" />{" "}
          <p>Cart</p>
        </div>
        <div className={style7.logout_btn}>
          <img onClick={handlelogout} src={userbtn} alt="" /> <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Successful;

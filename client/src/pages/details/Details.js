import React, { useState, useEffect } from "react";
import style4 from "./Details.module.css";
import contacticon from "../../assets/icons/contact icon.png";
import logoimg from "../../assets/images/logoimg.png";
import carticon from "../../assets/icons/cartimg.png";
import topimg from "../../assets/images/topimg (2).png";
import star from "../../assets/icons/Star.png";
import arrow from "../../assets/icons/arrow.png";
import homebtn from "../../assets/icons/homebtn.png";
import notlogin from "../../assets/icons/notlogin.png";
import userbtn from "../../assets/icons/userbtn.png";
import cartbtn from "../../assets/icons/cartbtn.png";
import line from "../../assets/icons/Line 14.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Details() {
  const navigate = useNavigate();
  const [productdetails, setProductDetails] = useState({});
  const [islogin, setIsLogin] = useState(false);
  const [image, setImage] = useState("");

  const selectedimg = (item) =>{
   setImage(item);
  }


  const fetchproductdetails = async () => {
    const productid = localStorage.getItem("product_id");
    try {
      const reqUrl = `${backendUrl}/products/get-products/${productid}`;
      const response = await axios.get(reqUrl);

      setProductDetails(response.data.data);

      let token = localStorage.getItem("token");

      if (!token) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const addtocart = (id) => {
    if (islogin) {
      localStorage.setItem("product_id", id);
      navigate("/viewcart");
    }
    else(navigate('/signin'))
  };

  const buynowproduct = (id) => {
    if (islogin) {
      localStorage.setItem("product_id", id);
      navigate("/checkout");
    } else navigate("/signin");
  };

  const handleview = () => {
    navigate('/viewcart')
  };

  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
    setIsLogin(false);
  };

  useEffect(() => {
    fetchproductdetails();
  }, [setProductDetails]);

  if (
    !productdetails ||
    !productdetails.image_url ||
    productdetails.image_url.length === 0
  ) {
    return null;
  }
  return (
    <div className={style4.container_details}>
      <div className={style4.top_details}>
        <div className={style4.contact}>
          <img src={contacticon} alt="" />
          <p>7878787878</p>
        </div>
        <div className={style4.sale}>
          <p>Get 50% off on selected items</p>
        </div>
        <div className={style4.auth_details}>
          {!islogin && (
            <>
              <button onClick={() => navigate("/signin")}>Login</button>
              <p className={style4.line}></p>
              <button onClick={() => navigate("/signup")}>Signup</button>
            </>
          )}
          {islogin && <button onClick={handlelogout}>Logout</button>}
        </div>
      </div>
      <div className={style4.mobile_search_home}>
        <input
          type="search"
          name=""
          id=""
          placeholder="Search Musicart"
          // onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={style4.middle_details}>
        <div className={style4.first_details}>
          <div className={style4.logo_details}>
            <img src={logoimg} alt="" />
            <h1>Musicart</h1>
            <p>Home/ {productdetails.product_name}</p>
          </div>
          <div className={style4.viewcart_details}>
            {islogin && (
              <button onClick={handleview}>
                <img  src={carticon} alt="" />
                View Cart
              </button>
            )}
          </div>
        </div>
        <div className={style4.backbtn}>
          <button className={style4.firstbtn} onClick={() => navigate("/")}>
            Back to products
          </button>
          <button className={style4.secondbtn} onClick={() => navigate("/")}>
            <img src={arrow} alt="" />
          </button>
          <button
            onClick={() => buynowproduct(productdetails._id)}
            className={style4.buynow_btn_mob}
          >
            Buy Now
          </button>
        </div>
        <div className={style4.information_details}>
          <p>
            {productdetails.company} WH-CH720N, Wireless Over-Ear Active Noise
            Cancellation Headphones with Mic, up to 50 Hours Playtime,
            Multi-Point Connection, App Support, AUX & Voice Assistant Support
            for Mobile Phones (Black)
          </p>
        </div>
        <div className={style4.product_details}>
          <div className={style4.images_details}>
            <div className={style4.top_images_details}>
              <img src={ image || productdetails.image_url[0] || { topimg }} alt="" />
            </div>
            <div className={style4.bottom_images_details}>
              {productdetails.image_url.map((item,i)=>{
             return <img onClick={() => selectedimg(item)} key={i} src={item} alt="" />
              })}
              
            </div>
          </div>
          <div className={style4.description_details}>
            <div className={style4.description}>
              <h1>{productdetails.product_name} </h1>
              <p className={style4.rating}>
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                (50 Customer reviews)
              </p>
              <p className={style4.short_info}>
                {productdetails.product_name}, Wireless Over-Ear Active Noise Cancellation
                Headphones with Mic, up to 50 Hours Playtime, Multi-Point
                Connection, App Support, AUX & Voice Assistant Support for
                Mobile Phones (Black)
              </p>
              <p className={style4.price}>Price - ₹ {productdetails.price}</p>
              <p className={style4.color}>
                {productdetails.color}| {productdetails.type} headphone
              </p>
              <p className={style4.about}>
                About this item <br />
                Sony’s lightest Wireless Noise-cancelling headband ever Up to
                50-hour battery life with quick charging (3 min charge for up to
                1 hour of playback) Multi-Point Connection helps to pair with
                two Bluetooth devices at the same time Take noise cancelling to
                the next level with Sony’s Integrated Processor V1,so you can
                fully immerse yourself in the music Super comfortable and
                lightweight design ( 192 Grams ) High sound quality and
                well-balanced sound tuning
              </p>
              <p className={style4.available}>
                <span>Available</span> - In stock
              </p>
              <p className={style4.brand}>
                <span>Brand </span>- {productdetails.company}
              </p>
            </div>
            <div className={style4.btns}>
              <button
                className={style4.addtocart_btn}
                onClick={() => addtocart(productdetails._id)}
              >
                Add to Cart
              </button>
              <button
                onClick={() => buynowproduct(productdetails._id)}
                className={style4.buynow_btn}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div className={style4.bottom_details}>
          <p>Musicart | All rights reserved</p>
        </div>
      </div>
      <div className={style4.bottom_buttons}>
        <div className={style4.home_btn}>
          <img className={style4.cart_line} src={line} alt="" />
          <img
            onClick={() => navigate("/")}
            className={style4.img1}
            src={homebtn}
            alt=""
          />{" "}
          <p>Home</p>
        </div>
        <div className={style4.cart_btn}>
          <img onClick={() => navigate("/viewcart")} src={cartbtn} alt="" />{" "}
          <p>Cart</p>
        </div>
        <div className={style4.logout_btn}>
          {islogin && (
            <>
              <img onClick={handlelogout} src={userbtn} alt="" /> <p>Logout</p>
            </>
          )}
          {!islogin && (
            <>
              <img onClick={() => navigate("/signin")} src={notlogin} alt="" />{" "}
              <p>Login</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;

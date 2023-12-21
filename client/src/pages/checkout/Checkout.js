import React, { useState, useEffect } from "react";
import style6 from "./Checkout.module.css";
import contacticon from "../../assets/icons/contact icon.png";
import logoimg from "../../assets/images/logoimg.png";
import productimg from "../../assets/images/productimg.png";
import arrow from "../../assets/icons/arrow.png";
import homebtn from "../../assets/icons/homebtn.png";
import userbtn from "../../assets/icons/userbtn.png";
import notlogin from "../../assets/icons/notlogin.png";
import cartbtn from "../../assets/icons/cartbtn.png";
import { deleteProduct } from "../../apis/product";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import line from "../../assets/icons/Line 14.png";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Checkout() {
  const navigate = useNavigate();
  const [productdetails, setProductDetails] = useState([]);
  const [islogin, setIsLogin] = useState(false);

  const [selectedProductIds, setSelectedProductIds] = useState(() => {
    const storedIds = localStorage.getItem("selectedProductIds");
    return storedIds ? JSON.parse(storedIds) : [];
  });

  const fetchproductdetails = async () => {
    try {
      const reqUrl = `${backendUrl}/products/checkout`;
      const response = await axios.get(reqUrl, {
        params: {
          productIds: selectedProductIds,
        }
      });
      setProductDetails(response.data.product);
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

  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
    setIsLogin(false);
  };

  const calculateTotal = () => {
    let total = 0;
    productdetails.forEach((val) => {
      total += val.price ;
    });
    return total;
  }


  const gotosuccespage = (id) => {
    deleteProduct(id)
    localStorage.removeItem("selectedProductIds");
    navigate("/successful");
  };

  useEffect(() => {
    fetchproductdetails();
  }, [selectedProductIds]);


  return (
    <div className={style6.container_checkout}>
      <div className={style6.top_checkout}>
        <div className={style6.contact}>
          <img src={contacticon} alt="" />
          <p>7878787878</p>
        </div>
        <div className={style6.sale}>
          <p>Get 50% off on selected items</p>
        </div>
        <div className={style6.auth_checkout}>
          {!islogin && (
            <>
              <button>Login</button>
              <p className={style6.line}></p>
              <button>Signup</button>
            </>
          )}
          {islogin && <button>Logout</button>}
        </div>
      </div>
      <div className={style6.top_successful}>
        <img src={logoimg} alt="" />
        <h1>Musicart</h1>
      </div>
      <div className={style6.middle_checkout}>
        <div className={style6.first_checkout}>
          <div className={style6.logo_checkout}>
            <img src={logoimg} alt="" />
            <h1>Musicart</h1>
            <p>Home/Checkout</p>
          </div>
        </div>
        <div className={style6.backbtn}>
          <button
            onClick={() => navigate("/viewcart")}
            className={style6.firstbtn}
          >
            Back to cart
          </button>
          <button
            onClick={() => navigate("/viewcart")}
            className={style6.secondbtn}
          >
            <img src={arrow} alt="" />
          </button>
        </div>
        <div className={style6.checkout}>
          <p>Checkout</p>
        </div>
        <div className={style6.overview_checkout}>
          <div className={style6.left_checkout}>
            <div className={style6.address_title}>
              <p className={style6.first_title}>1. Delivery address</p>
              <p className={style6.add_p}>
                Akash Patel <br />
                104 <br />
                kk hh nagar, Lucknow <br />
                Uttar Pradesh 226025
              </p>
            </div>
            <div className={style6.payment_title}>
              <p className={style6.second_title}>2. Payment method</p>
              <p className={style6.pay_p}>Pay on delivery ( Cash/Card</p>
            </div>
            <div className={style6.review_title}>
              <p className={style6.third_title}>3. Review items and delivery</p>
              {productdetails?.map((item, i) => {
                return ( 
              <div className={style6.reviewofproduct} key={i}>
                <img src={item.image_url?.[0]} alt="" />
                <p className={style6.product_name}>
                  {item.company} {item.product_name}
                </p>
                <p className={style6.product_color}>Clour : {item.color}</p>
                <p className={style6.product_availability}>In Stock</p>
                <p className={style6.product_time}>
                  Estimated delivery : Monday — FREE Standard Delivery
                </p>
              </div>
              )})}
            </div>
            <div className={style6.ordertotal}>
              <button onClick={() => gotosuccespage()}>Place your order</button>
              <p>
                <span>Order Total : ₹{calculateTotal() + 45}</span> <br />
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </div>
          </div>
          <div className={style6.right_checkout}>
            <div className={style6.last_price}>
              <button onClick={() => gotosuccespage()}>Place your order</button>
              <p className={style6.conditions}>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
              <hr style={{ color: "#E1E1E1", marginTop: "10px" }} />
              <p className={style6.order_summary}>Order Summary</p>
              <p className={style6.items}>
                Items : <span>₹{calculateTotal()}</span>
              </p>
              <p className={style6.delivery}>
                Delivery : <span>₹45.00</span>
              </p>
              <hr style={{ color: "#E1E1E1", marginTop: "10px" }} />
              <p className={style6.paidtotal}>
                Order Total : <span>₹{calculateTotal() + 45}</span>
              </p>
            </div>
            <div className={style6.last_price_mobile}>
              <p className={style6.order_summary}>Order Summary</p>
              <p className={style6.items}>
                Items : <span>₹{calculateTotal()}</span>
              </p>
              <p className={style6.delivery}>
                Delivery : <span>₹45.00</span>
              </p>
              <hr style={{ color: "#E1E1E1", marginTop: "10px" }} />
              <p className={style6.paidtotal}>
                Order Total : <span>₹{calculateTotal() + 45}</span>
              </p>
              <button onClick={() => gotosuccespage()}>Place your order</button>
            </div>
          </div>
        </div>
        <div className={style6.bottom_checkout}>
          <p>Musicart | All rights reserved</p>
        </div>
      </div>
      <div className={style6.bottom_buttons}>
        <div className={style6.home_btn}>
          <img className={style6.line} src={line} alt="" />
          <img
            onClick={() => navigate("/")}
            className={style6.img1}
            src={homebtn}
            alt=""
          />{" "}
          <p>Home</p>
        </div>
        <div className={style6.cart_btn}>
          <img onClick={() => navigate("/viewcart")} src={cartbtn} alt="" />{" "}
          <p>Cart</p>
        </div>
        <div className={style6.logout_btn}>
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

export default Checkout;

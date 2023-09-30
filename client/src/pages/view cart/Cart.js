import React, { useState, useEffect } from "react";
import style5 from "./Cart.module.css";
import contacticon from "../../assets/icons/contact icon.png";
import logoimg from "../../assets/images/logoimg.png";
import carticon from "../../assets/icons/cartimg.png";
import mycart from "../../assets/icons/mycart.png";
import arrow from "../../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import productimg from "../../assets/images/productimg.png";
import homebtn from "../../assets/icons/homebtn.png";
import userbtn from "../../assets/icons/userbtn.png";
import cartbtn from "../../assets/icons/cartbtn.png";
import notlogin from "../../assets/icons/notlogin.png";
import line from "../../assets/icons/Line 14.png";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Cart() {
  const navigate = useNavigate();
  const [cartproduct, setCartProduct] = useState({});
  const [islogin, setIsLogin] = useState(false);


  const fetchcartproduct = async () => {
    const cartproductid = localStorage.getItem("cartproduct_id");
    try {
      const reqUrl = `${backendUrl}/products/get-products/${cartproductid}`;
      const response = await axios.get(reqUrl);

      setCartProduct(response.data.data);

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

  const addtocheckout = (id) => {
    localStorage.setItem("cartproduct_id", id);
    navigate("/checkout");
  };



  useEffect(() => {
    const cartproductid = localStorage.getItem("cartproduct_id");
    if(cartproductid){
      fetchcartproduct();
    }
    
  }, [setCartProduct]);

  
  return (
    <div className={style5.container_cart}>
      <div className={style5.top_cart}>
        <div className={style5.contact}>
          <img src={contacticon} alt="" />
          <p>7878787878</p>
        </div>
        <div className={style5.sale}>
          <p>Get 50% off on selected items</p>
        </div>
        <div className={style5.auth_cart}>
          {islogin && <button onClick={handlelogout}>Logout</button>}
        </div>
      </div>
      <div className={style5.mobile_search_home}>
        <input
          type="search"
          name=""
          id=""
          placeholder="Search Musicart"
          // onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={style5.middle_cart}>
        <div className={style5.first_cart}>
          <div className={style5.logo_cart}>
            <img src={logoimg} alt="" />
            <h1>Musicart</h1>
            <p>Home/ View Cart</p>
          </div>
          <div className={style5.viewcart_cart}>
            <button>
              <img src={carticon} alt="" />
              View Cart
            </button>
          </div>
        </div>
        <div className={style5.backbtn}>
          <button className={style5.firstbtn} onClick={() => navigate("/")}>
            Back to products
          </button>
          <button className={style5.secondbtn}>
            <img onClick={() => navigate("/")} src={arrow} alt="" />
          </button>
        </div>
        <div className={style5.mycart}>
          <img src={mycart} alt="" />
          <p>My Cart</p>
        </div>
        <div className={style5.card_overview}>
          <div className={style5.left_cart}>
            <div className={style5.cart_product_details}>
              <div className={style5.productimg_Cart}>
                <img src={productimg} alt="" />
              </div>
              <div className={style5.company}>
                <p className={style5.p1}>{cartproduct.product_name}</p>
                <p className={style5.p2}>Clour : {cartproduct.color}</p>
                <p className={style5.p3}>In Stock</p>
              </div>
              <div className={style5.prices_cart}>
                <p className={style5.price}>Price</p>
                <p className={style5.rupee}>₹{cartproduct.price}</p>
              </div>
              <div className={style5.quantity}>
                <p>Quantity</p>
                <select name="" id="">
                  <option value="1">1</option>
                </select>
              </div>
              <div className={style5.total_price}>
                <p className={style5.total}>Total</p>
                <p className={style5.alloverprice}>₹{cartproduct.price}</p>
              </div>
            </div>
            <div className={style5.bottom_pricecart}>
              <p className={style5.left}>1 Item</p>
              <p className={style5.right}>₹3500</p>
            </div>
          </div>
          <div className={style5.left_cart_mobile}>
            <div className={style5.productimg_Cart}>
              <img src={productimg} alt="" />
            </div>
            <div className={style5.company}>
              <p className={style5.p1}>{cartproduct.product_name} </p>
              <p className={style5.p5}>₹{cartproduct.price}</p>
              <p className={style5.p2}>Clour : {cartproduct.color}</p>
              <p className={style5.p3}>In Stock</p>
              <p className={style5.totalmrp}>
                Convenience Fee <span>{cartproduct.price}+₹45</span>
              </p>
              <p className={style5.totalamount}>
                Total: <span>₹3545</span>
              </p>
            </div>
          </div>
          <div className={style5.bottom_cart_mobile}>
            <hr />
            <p className={style5.totalamount}>
              Total Amount <span>₹3545</span>
            </p>
            <button onClick={() => addtocheckout(cartproduct._id)}>
              PLACE ORDER
            </button>
          </div>
          <p className={style5.line}></p>
          <div className={style5.cart_price_details}>
            <p className={style5.tophead}>PRICE DETAILS</p>
            <p className={style5.totalmrp}>
              Total MRP <span>₹{cartproduct.price}</span>
            </p>
            <p className={style5.totalmrp}>
              Discount MRP <span>₹0</span>
            </p>
            <p className={style5.totalmrp}>
              Convenience Fee <span>₹45</span>
            </p>
            <p className={style5.totalamount}>
              Total Amount <span>₹3545</span>
            </p>
            <button onClick={() => addtocheckout(cartproduct._id)}>
              PLACE ORDER
            </button>
          </div>
        </div>
        <div className={style5.bottom_cart}>
          <p>Musicart | All rights reserved</p>
        </div>
      </div>
      <div className={style5.bottom_buttons}>
        <div className={style5.home_btn}>
          <img className={style5.cart_line} src={line} alt="" />
          <img
            onClick={() => navigate("/")}
            className={style5.img1}
            src={homebtn}
            alt=""
          />{" "}
          <p>Home</p>
        </div>
        <div className={style5.cart_btn}>
          <img onClick={() => navigate("/viewcart")} src={cartbtn} alt="" />{" "}
          <p>Cart</p>
        </div>
        <div className={style5.logout_btn}>
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

export default Cart;

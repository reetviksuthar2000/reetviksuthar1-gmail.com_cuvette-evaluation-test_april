import React, { useState, useEffect } from "react";
import style5 from "./Cart.module.css";
import contacticon from "../../assets/icons/contact icon.png";
import logoimg from "../../assets/images/logoimg.png";
import mycart from "../../assets/icons/mycart.png";
import arrow from "../../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";
import {updateItemQuantity} from '../../apis/product'
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
  const [cartproduct, setCartProduct] = useState([]);
  const [islogin, setIsLogin] = useState(false);
  const [view, setView] = useState(false);

  const [selectedProductIds, setSelectedProductIds] = useState(() => {
    const storedIds = localStorage.getItem("selectedProductIds");
    return storedIds ? JSON.parse(storedIds) : [];
  });
 

  const fetchcartproduct = async () => {
    const email = localStorage.getItem("email");
    
    try {
      const reqUrl = `${backendUrl}/products/get_cart`;
      const response = await axios.get(reqUrl, {
        params: {
          userId: email,
        }
      });
      
      setCartProduct(response.data);
    
      let token = localStorage.getItem("token");
      if (!token) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
      if(cartproduct){
        setView(true);
      }else{
        setView(false);
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


  function placeOrder(productId){ 
    
    setSelectedProductIds((prevSelectedIds) => [...prevSelectedIds, productId]);
    setTimeout(()=>{
      navigate("/checkout");
    },1000)
    
  }

  const calculateTotal = () => {
    let total = 0;
    cartproduct.forEach((val) => {
      total += val.product.price * val.quantity;
    });
    return total;
  }

  const userId = localStorage.getItem('email');

  function updatequantity(productId, newQuantity){
    updateItemQuantity(userId, productId, newQuantity);
    const updatecartData = cartproduct.map((item) => {
      if(item.productId === productId){
        return{
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCartProduct(updatecartData);
  }
  


  useEffect(() => {
    fetchcartproduct();
    const flatSelectedIds = selectedProductIds.flat();
    localStorage.setItem("selectedProductIds", JSON.stringify(flatSelectedIds))  

  }, [selectedProductIds]);


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
        {!view && (
        <div className={style5.empty} style={{fontWeight: 600, fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center'}}>Your Card is Empty</div>)}

        {view && (
        <div className={style5.card_overview}>
          
            <div className={style5.left_cart} >
            {cartproduct.map((item, i)=> {
            return (
            <div className={style5.cart_product_details} key={i}>
              <div className={style5.productimg_Cart}>
                <img src={item.product.image_url?.[0]} alt="" />
              </div>
              <div className={style5.company}>
                <p className={style5.p1}>{item.product.product_name}</p>
                <p className={style5.p2}>Clour : {item.product.color}</p>
                <p className={style5.p3}>In Stock</p>
              </div>
              <div className={style5.prices_cart}>
                <p className={style5.price}>Price</p>
                <p className={style5.rupee}>₹{item.product.price}</p>
              </div>
              <div className={style5.quantity}>
                <p>Quantity</p>
                <select name="" id="" onChange={(e) =>
                            updatequantity(item.productId, e.target.value)
                          }>
                  <option selected>{item.quantity}</option>
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <div className={style5.total_price}>
                <p className={style5.total}>Total</p>
                <p className={style5.alloverprice}>₹{item.product.price * item.quantity}</p>
              </div>
            </div>
            )})}
            <div className={style5.bottom_pricecart}>
              <p className={style5.left}>{cartproduct.length} Item</p>
              <p className={style5.right}>₹{calculateTotal()}</p>
            </div>
          </div>
          {islogin && (
          <>
          {cartproduct.map((item, i) => { 
            return (
          <div className={style5.left_cart_mobile} key={i}>
            <div className={style5.productimg_Cart}>
              <img src={item.product.image_url[0]} alt="" />
            </div>
            <div className={style5.company}>
              <p className={style5.p1}>{item.product.product_name} </p>
              <p className={style5.p5}>₹{item.product.price}</p>
              <p className={style5.p2}>Clour : {item.product.color}</p>
              <p className={style5.p3}>In Stock</p>
              <select name="" id="" onChange={(e) =>
                            updatequantity(item.productId, e.target.value)
                          }>
                  <option selected>{item.quantity}</option>
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              <p className={style5.totalmrp}>
                Convenience Fee <span>₹45</span>
              </p>
              <p className={style5.totalamount}>
                Total: <span>₹{item.product.price * item.quantity}</span>
              </p>
            </div>
          </div>
          )})}
          <div className={style5.bottom_cart_mobile}>
            <hr />
            <p className={style5.totalamount}>
              Total Amount <span>{calculateTotal()}</span>
            </p>
            <button onClick={() => placeOrder(cartproduct.map((item)=> {
              return item.product._id;
            }))}>
              PLACE ORDER
            </button>
          </div>
        </>
        )}
          <p className={style5.line}></p>
          <div className={style5.cart_price_details}>
            <p className={style5.tophead}>PRICE DETAILS</p>
            <p className={style5.totalmrp}>
              Total MRP <span>₹{calculateTotal()}</span>
            </p>
            <p className={style5.totalmrp}>
              Discount MRP <span>₹0</span>
            </p>
            <p className={style5.totalmrp}>
              Convenience Fee <span>₹45</span>
            </p>
            <p className={style5.totalamount}>
              Total Amount <span>₹{calculateTotal() + 45}</span>
            </p>
            <button onClick={() => placeOrder(cartproduct.map((item)=> {
              return item.product._id;
            }))}>
              PLACE ORDER
            </button>
          </div>
        </div>)}
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

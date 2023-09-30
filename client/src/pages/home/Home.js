import React, { useState, useEffect } from "react";
import style3 from "./Home.module.css";
import logoimg from "../../assets/images/logoimg.png";
import contacticon from "../../assets/icons/contact icon.png";
import carticon from "../../assets/icons/cartimg.png";
import gridicon from "../../assets/icons/gridicon (2).png";
import listicon from "../../assets/icons/listicon.png";
import Product from "../../components/Product";
import Listview from "../../components/Listview";
import actorimg from "../../assets/images/addactorimg.png";
import textimg from "../../assets/images/textimg.png";
import buybtn from "../../assets/images/buybtn.png";
import homebtn from "../../assets/icons/homebtn.png";
import userbtn from "../../assets/icons/userbtn.png";
import cartbtn from "../../assets/icons/cartbtn.png";
import line from "../../assets/icons/Line 14.png";
import notlogin from "../../assets/icons/notlogin.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Home() {
  const navigate = useNavigate();
  const [product, setProducts] = useState([]);
  const [islogin, setIsLogin] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setTypes] = useState([]);
  const [company, setCompany] = useState([]);
  const [color, setColors] = useState([]);
  const [view, setView] = useState("grid");

  const handlegridbtn = () => {
    setView("grid");
  };

  const handlelistbtn = () => {
    setView("list");
  };

  const fetchproduct = async () => {
    try {
      const reqUrl = `${backendUrl}/products/list-products`;
      const response = await axios.get(reqUrl, {
        params: {
          search: search,
          type: type,
          company: company,
          color: color,
          
        },
      });

      setProducts(response.data.products);

      let token = localStorage.getItem("token");
      if (!token) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
        // setRecruiter(localStorage.getItem("recruiter"));
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const viewdetails = (id) => {
    localStorage.setItem("product_id", id);
    navigate("/details");
  };

  const addtocart = (id) => {
    localStorage.setItem("cartproduct_id", id);
    // const arrayid = [id]
    // localStorage.setItem("cartproduct_id", JSON.stringify(arrayid));
  
  };

  const handlelogout = () => {
    localStorage.clear();
    navigate("/");
    setIsLogin(false);
  };


  const handleview = () => {

    navigate('/viewcart');
  }

  useEffect(() => {
    fetchproduct();
  }, [search, type, company, color]);

  return (
    <div className={style3.container_home}>
      
      <div className={style3.top_home}>
        <div className={style3.contact}>
          <img src={contacticon} alt="" />
          <p>7878787878</p>
        </div>
        <div className={style3.sale}>
          <p>Get 50% off on selected items</p>
        </div>
        <div className={style3.auth_home}>
          {!islogin && (
            <>
              {" "}
              <button onClick={() => navigate("/signin")}>Login</button>
              <p className={style3.line}></p>
              <button onClick={() => navigate("/signup")}>Signup</button>
            </>
          )}
          {islogin && <button onClick={handlelogout}>Logout</button>}
        </div>
      </div>
      <div className={style3.mobile_search_home}>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search Musicart"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      <div className={style3.middle_home}>
        <div className={style3.first_home}>
          <div className={style3.logo_home}>
            <img src={logoimg} alt="" />
            <h1>Musicart</h1>
            <p>Home</p>
          </div>
          <div className={style3.viewcart_home}>
            {islogin && (
              <button onClick={handleview}>
                <img src={carticon} alt="" />
                View Cart
              </button>
            )}
          </div>
        </div>
        <div className={style3.advertiest_home}>
          <div className={style3.left}>
            <img className={style3.firstimg} src={textimg} alt="" />
            <img className={style3.secondimg} src={buybtn} alt="" />
          </div>
          <div className={style3.right}>
            <img src={actorimg} alt="" />
          </div>
        </div>
        <div className={style3.search_home}>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search Product"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={style3.allfilters_home}>
          <div className={style3.scroll_filter}>
          <div className={style3.view}>
            <img
              src={gridicon}
              onClick={handlegridbtn}
              style={{ backgroundColor: view === "grid" ? "black" : "" }}
              alt=""
            />
            <img
              src={listicon}
              onClick={handlelistbtn}
              style={{ backgroundColor: view === "list" ? "black" : "" }}
              alt=""
            />
          </div>
          <div className={style3.filters}>
            <select
              name="Headphone type"
              id=""
              onChange={(e) => setTypes(e.target.value)}
            >
              <option value="Headphone type" disabled selected hidden>
                Headphone type
              </option>
              <option value="Featured" disabled>
                Featured
              </option>
              <option value="In-Ear">In-ear headphone</option>
              <option value="On-Ear">On-ear headphone</option>
              <option value="Over-Ear">Over-ear headphone</option>
            </select>
            <select
              name="Company"
              id=""
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="Company" disabled selected hidden>
                Company
              </option>
              <option value="Featured">Featured</option>
              <option value="JBL">JBL</option>
              <option value="Sony">Sony</option>
              <option value="Boat">Boat</option>
              <option value="Zebronics">Zebronics</option>
              <option value="Marshall">Marshall</option>
              <option value="Ptron">Ptron</option>
            </select>
            <select
              name="Colour"
              id=""
              onChange={(e) => setColors(e.target.value)}
            >
              <option value="Colour" disabled selected hidden>
                Colour
              </option>
              <option value="Featured">Featured</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
            </select>
            <select name="Price" id="" >
              <option value="Price" disabled selected hidden>
                Price
              </option>
              <option value="Featured">Featured</option>
              <option value="0 - 1000">₹0 - ₹1,000</option>
              <option value="1000 - 10000">₹1,000 - ₹10,000</option>
              <option value="10000 - 20000">₹10,000 - ₹20,000</option>
            </select>
          </div>
          <div className={style3.sort}>
            <select name="Sort by : Featured" id="">
              <option value="Sort by : Featured" disabled selected hidden>
                Sort by : Featured
              </option>
              <option value="Featured">Featured</option>
            </select>
          </div>
          </div>
        </div>
        <hr/>
        <div className={style3.bottomcontent_home}>
          {view === "grid" ? (
            <Product
              viewdetails={viewdetails}
              product={product}
              islogin={islogin}
              addtocart={addtocart}
            />
          ) : (
            <Listview
              viewdetails={viewdetails}
              product={product}
              islogin={islogin}
              addtocart={addtocart}
            />
          )}
          {/* <Product viewdetails={viewdetails} product={product} islogin = {islogin} addtocart = {addtocart}/> */}
        </div>
        <div className={style3.bottom_home}>
          <p>Musicart | All rights reserved</p>
        </div>

      </div>
      <div className={style3.bottom_buttons}>
        <div className={style3.home_btn}>
          <img className={style3.line} src={line} alt="" />
          <img onClick={()=>navigate('/')} className={style3.img1} src={homebtn} alt="" /> <p>Home</p>
        </div>
        <div className={style3.cart_btn}>
          <img onClick={()=>navigate('/viewcart')} src={cartbtn} alt="" /> <p>Cart</p>
        </div>
        <div className={style3.logout_btn}>
          {islogin && (
            <>
          <img onClick={handlelogout} src={userbtn} alt="" /> <p>Logout</p>
          </>
          )}
          {!islogin && (
             <>
             <img onClick={()=>navigate('/signin')} src={notlogin} alt="" /> <p>Login</p>
             </>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Home;

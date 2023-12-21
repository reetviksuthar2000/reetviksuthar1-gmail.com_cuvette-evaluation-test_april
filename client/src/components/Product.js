import React from "react";
import style3 from "../pages/home/Home.module.css";
import addtocardbtn from "../assets/icons/addtocardbtn.png";
import { useNavigate } from "react-router-dom";

function Product({ product, islogin, handleadd_item }) {
  const navigate = useNavigate();
  function viewdetails(id) {
    localStorage.setItem("product_id", id);
    navigate("/details");
  }

  return (
    <>
      {product.map((item) => {
        return (
          <div key={item._id} className={style3.component_product}>
            <div className={style3.top_product}>
              <img
                className={style3.testtrial}
                src={item.image_url[0]}
                alt=""
                onClick={() => viewdetails(item._id)}
              />

              {islogin && (
                <span onClick={() => handleadd_item(item._id)}>
                  <img src={addtocardbtn} alt="" />
                </span>
              )}
            </div>
            <div className={style3.bottom_product}>
              <p className={style3.product_title}>{item.product_name}</p>
              <p className={style3.product_price}>Price- ₹ {item.price}</p>
              <p className={style3.product_color}>
                {item.color}|{item.type} headphone{" "}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Product;

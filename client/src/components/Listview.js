import React from "react";
import style3 from "../pages/home/Home.module.css";
import addtocardbtn from "../assets/icons/addtocardbtn.png";
import productimg from "../assets/images/productimg.png";

function Listview({ viewdetails, product, islogin, addtocart}) {
  return (
    <>
      {product.map((item) => {
        return (
          <div key={item._id} className={style3.list_component_product}>
            <div className={style3.top_product}>
              <img
                className={style3.testtrial}
                src={item.image_url[0] || { productimg }}
                alt=""
                
              />

              {islogin && (
                <span onClick={() => addtocart(item._id)}>
                  <img src={addtocardbtn} alt="" />
                </span>
              )}
            </div>
            <div className={style3.list_bottom_product}>
              <p className={style3.product_title}>{item.product_name}</p>
              <p className={style3.product_price}>Price- ₹ {item.price}</p>
              <p className={style3.product_color}>
                {item.color}|{item.type} headphone{" "}
              </p>
              <p className={style3.list_description}>{item.description}</p>
              <button className={style3.list_button} onClick={() => viewdetails(item._id)} >Details</button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Listview;

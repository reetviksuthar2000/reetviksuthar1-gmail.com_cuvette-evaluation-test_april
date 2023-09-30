import React from "react";
import style3 from "../pages/home/Home.module.css";
import addtocardbtn from "../assets/icons/addtocardbtn.png";

function Product({ viewdetails, product, islogin, addtocart}) {
  
  return (
    <>
      {product.map((item) => {
        return (
          <div key={item._id} className={style3.component_product}>
            <div
              className={style3.top_product}
             
            >
              <img
                className={style3.testtrial}
                src={ item.image_url[0] }
                alt=""
                onClick={() => viewdetails(item._id)}
              />

              {islogin && (
                <span onClick={() => addtocart(item._id)} >
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

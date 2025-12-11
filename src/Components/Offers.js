import React, { useEffect, useState } from "react";
import "./Offers.css";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import axios from "axios";
import { useCart } from "./Cartcontext"; // ✅ Adjust path as needed

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const { addToCart } = useCart(); // ✅ Access addToCart from context

  useEffect(() => {
    axios
      .get("https://ecomart-backend-2-h3fw.onrender.com/ecomart/getoffers")
      .then((res) => {
        setOffers(res.data);
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <div className="offers-page">
      <motion.div
        className="offers-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>🎉 EcoMart's Offers Festival 🎉</h1>
        <p className="slogan">Low Price with High Quality</p>
      </motion.div>

      <div className="offers-grid">
        {Array.isArray(offers) && offers.length > 0 ? (
          offers.map((offer, index) => (
            <div key={index} className="offers">
              <div className="offers-details">
                <h1 className="offer-name">{offer.offerName}</h1>

                <div className="offer-dates">
                  <h5>
                    From{" "}
                    {new Date(offer.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h5>
                  <h5>
                    To{" "}
                    {new Date(offer.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h5>
                </div>
                <div className="offer-percentagecont">
                  <h4>Saves Upto {offer.percentage}%</h4>
                </div>
              </div>

              {/* Products Card */}
              <div className="products-list">
                {Array.isArray(offer.products) &&
                  offer.products.map((x, i) => (
                    <div key={i} className="product-card">
                      <div className="offers-prodimgcont">
                        <img
                          src={x.image}
                          alt="offers-img"
                          className="offers-prodimg"
                        />
                      </div>
                      <div className="offers-proddetails">
                        <h4 className="offers-prodname">{x.productName}</h4>
                        <label>Quantity : {x.quantity}</label>
                        <div className="pricecont">
                          <label className="offers-price">Price :</label>
                          <p className="mrp-rate">₹ {x.originalPrice}</p>
                          <h4 className="discount-rate">₹ {x.discountPrice} </h4>
                        </div>
                        <button
                          className="offers-cartbtn"
                          onClick={() =>
                            addToCart({
                              _id: x._id,
                              pname: x.productName,
                              pimg: x.image,
                              pprice: x.discountPrice,
                              quantity: 1
                            })
                          }                                                   
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <h3 className="no-orders">Loading...</h3>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "./Cartcontext";
import "./Products.css";
import './Category.css'
export default function Category() {
  const { categoryName } = useParams();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 slug → original format
  const formattedCategory = categoryName
    .replace(/-/g, " ")
    .toUpperCase();

  // 🔥 API call
  useEffect(() => {
    axios
      .get(`https://api.ecomartsangai.in/ecomart/category/${formattedCategory}`)
      .then((res) => {
        console.log(res.data);   // 👈 inside block
        setProducts(res.data);
        })
      .catch((err) => console.log(err));
  }, [formattedCategory]);

  // 🔍 search filter
  const filteredProducts = products.filter((p) =>
    p.itemname.toLowerCase().includes(search.toLowerCase())
  );

  const navigate  = useNavigate()

  return (
    <div className="products">

      {/* <h2>{formattedCategory}</h2> */}

      <div className="category-main">
        <h1 className="category-title">{formattedCategory}</h1> 
        <button className="categories-back-btn" onClick={()=>navigate(-1)}>⟵ Back</button>
      </div>

      {/* 🔍 SEARCH */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          className="search-field"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🛒 PRODUCTS */}
      <div className="product-menu">
        <div className="product-wrapper">

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (

                <div key={index} className="product-card">

                  <img
                    src={product.itemimg}
                    alt={product.itemname}
                    className="product-image"
                  />

                  <h3 className="product-title">
                    {product.itemname}
                  </h3>

                  <div className="price">
                    Rs. {product.selling}
                    <span className="mrp">
                      Rs. {product.mrp}
                    </span>
                  </div>

                  <button
                    className="add-cart-btn"
                    onClick={() =>
                      addToCart({
                        ...product,
                        price: product.netamt
                      })
                    }
                  >
                    Add
                  </button>

                </div>

              ))
            ) : (
              <h3 style={{ textAlign: "center" }}>No products found</h3>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
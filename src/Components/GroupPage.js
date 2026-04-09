import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { groupData } from "./groupData";
import "./GroupPage.css";

const GroupPage = () => {
  const { groupName } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const categories = groupData[groupName] || [];

  // 🔍 filter logic
  const filteredCategories = categories.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="group-container">

      <div className="group-title-container">
        <h1 className="group-title">{groupName}</h1> 
        <button className="back-btn" onClick={()=>navigate(-1)}>⟵ Back</button>
      </div>

      {/* 🔍 SEARCH BOX */}
      <div className="group-search">
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="category-grid">
        {filteredCategories.map((cat, index) => (
          
          <div key={index} className="category-card">

            <h3>{cat}</h3>

            <button
              className="category-btn"
              onClick={() =>
                navigate(`/category/${cat.toLowerCase().replace(/ /g, '-')}`)
              }
            >
              View
            </button>

          </div>

        ))}
      </div>

    </div>
  );
};

export default GroupPage;
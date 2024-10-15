import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  const [foodItem, setFoodItem] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      let response = await fetch(
        "https://orderfastbackend.onrender.com/api/foodData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();

      setFoodItem(response[0]);
    };

    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          style={{ objectFit: "contain " }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div
                className="d-flex justify-content-center"
                role="search"
              ></div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?juice"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(50%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container row mx-auto">
        {foodItem.length !== 0
          ? foodItem.map((filterItems) => (
              <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                <Card options={filterItems.options[0]} foodItem={filterItems} />
              </div>
            ))
          : ""}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;

import React, { useRef, useState, useEffect } from "react";

import { useDispatchCart, useCart } from "./ContextReducer";

function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item?.id === foodItem?._id) {
        food = item;

        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-4"
          style={{ width: "18rem", maxheight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "180px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">
              <strong>{props.foodItem.name}</strong>
            </h5>

            <div className="container w-100">
              <select
                className="m-2 h-100 "
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100   "
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-6">₹{finalPrice}/-</div>
            </div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <hr />
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Ingredients: </strong> {props.foodItem.ingredients}
              </li>
              <li className="list-group-item">
                <strong>Nutritions: </strong>
                {props.foodItem.nutritions}
              </li>
              <li className="list-group-item">
                <strong>Allergic: </strong>
                {props.foodItem.allergic}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

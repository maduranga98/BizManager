import React, { useRef } from "react";
import { addItems } from "../../../server_data/api";
import { useParams } from "react-router-dom";

const AddStock = (props) => {
  const { business_id, user_id } = useParams();
  const nameRef = useRef();
  const priceRef = useRef();
  const unitsRef = useRef();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const units = unitsRef.current.value;

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const sec = date.getSeconds();
    const min = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Create the formatted string
    const batchID = `${year}${month}${day}${formattedHours}${min}${sec}${ampm}`;
    console.log(date);
    const result = await addItems(
      user_id,
      business_id,
      batchID,
      name,
      price,
      units,
      date
    );
    console.log(result);
    props.onClose();
  };

  return (
    <div className="flex flex-col justify-center items-center text-chars text-center font-serif bg-buttons rounded-xl">
      <form
        className="flex flex-col w-full max-w-md p-4 bg-gray-100 rounded-lg shadow-md"
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="name">Item Name</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          className="text-bag p-2 rounded-md mb-1"
          autoComplete="off"
        />

        <label htmlFor="price">Unit Price</label>
        <input
          type="number"
          id="price"
          ref={priceRef}
          className="text-bag p-2 rounded-md mb-2"
          autoComplete="off"
        />
        <label htmlFor="nofPieces">Number of Pieces per Case</label>
        <input
          type="number"
          id="nofPieces"
          ref={unitsRef}
          className="text-bag p-2 rounded-md mb-2"
          autoComplete="off"
        />
        <div className="flex justify-center ">
          <button
            type="submit"
            className="mt-2  border-2 border-chars rounded-md p-2 w-20"
          >
            + Add
          </button>
          <button
            type="button"
            onClick={props.onClose}
            className="bg-gray-300 text-stacks px-4 py-2 rounded ml-10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStock;

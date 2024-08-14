import React, { useRef } from "react";
import { addItems } from "../../../server_data/api";
import { useParams } from "react-router-dom";
const AddStock = () => {
  const { business_id, user_id } = useParams(); // Get the business_id from URL parameters

  const nameRef = useRef();
  const casesRef = useRef();
  const piecesRef = useRef();
  const freecasesRef = useRef();
  const freepicesRef = useRef();
  const priceRef = useRef();
  const unitsRef = useRef();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const cases = casesRef.current.value;
    const pieces = piecesRef.current.value;
    const freecase = freecasesRef.current.value;
    const freepieces = freepicesRef.current.value;
    const price = priceRef.current.value;
    const units = unitsRef.current.value;
    const date = new Date(); // Example date and time

    const year = date.getFullYear(); // Get the full year
    const month = date.getMonth() + 1; // Get the month (0-11), add 1 to get 1-12
    const day = date.getDate(); // Get the day of the month (1-31)
    const hours = date.getHours(); // Get hours (0-23)
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Create the formatted string
    const batchID = `${year}${month}${day}${formattedHours}${ampm}`;

    const result = await addItems(
      user_id,
      business_id,
      batchID,
      name,
      cases,
      pieces,
      price,
      freecase,
      freepieces,
      units,
      date
    );
    console.log(result);
  };

  return (
    <div className="bg-bag min-h-screen flex flex-col justify-center items-center text-chars text-center font-serif">
      <form className="flex flex-col" onSubmit={onSubmitHandler}>
        <label htmlFor="name">Item Name</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          className="text-bag p-2 rounded-md mb-1"
          autoComplete="off"
        />
        <label htmlFor="cases">Cases</label>
        <input
          type="text"
          id="cases"
          ref={casesRef}
          className="text-bag p-2 rounded-md mb-1"
          autoComplete="off"
        />
        <label htmlFor="pieces">Pieces</label>
        <input
          type="text"
          id="pieces"
          ref={piecesRef}
          className="text-bag p-2 rounded-md mb-1"
          autoComplete="off"
        />
        <label htmlFor="free_cases">Free Cases</label>
        <input
          type="text"
          id="free_cases"
          ref={freecasesRef}
          className="text-bag p-2 rounded-md mb-1"
          autoComplete="off"
        />
        <label htmlFor="free_pieces">Free Pieces</label>
        <input
          type="text"
          id="free_pieces"
          ref={freepicesRef}
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
        <button
          type="submit"
          className="mt-2 ml-auto mr-auto border-2 border-chars rounded-md p-2 w-20"
        >
          + Add
        </button>
      </form>
    </div>
  );
};

export default AddStock;

import React, { useRef } from "react";
import { addRoutes } from "../../../../server_data/api";

const AddRoute = (props) => {
  const { id: business_id, onClose } = props;

  const nameRef = useRef();
  const detailsRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      details: detailsRef.current.value,
    };
    try {
      const responce = await addRoutes(business_id, data.name, data.details);
      console.log(responce);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center text-gray-800 text-center font-serif">
      <form
        className="w-full max-w-md p-6 bg-chars rounded-lg shadow-md"
        onSubmit={submitHandler}
      >
        <label htmlFor="name" className="block text-left mt-1 font-semibold">
          Route Name
        </label>
        <input
          className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
          ref={nameRef}
          type="text"
          required
          placeholder="Route Name"
          id="name"
        />

        <label className="block text-left mt-1 font-semibold" htmlFor="details">
          Details
        </label>
        <input
          className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
          ref={detailsRef}
          type="text"
          placeholder="Details"
          id="details"
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoute;

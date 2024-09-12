import React, { useRef } from "react";
import { addVehicle } from "../../../../server_data/api";

const AddVehicle = (props) => {
  const { id: business_id, onClose } = props;
  const vehicle_number = useRef();
  const typeRef = useRef();
  const detailsRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(business_id);
    const data = {
      v_id: vehicle_number.current.value,
      type: typeRef.current.value,
      details: detailsRef.current.value,
    };
    try {
      const response = await addVehicle(
        business_id,
        data.v_id,
        data.type,
        data.details
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    onClose();
  };
  return (
    <div className="flex flex-col justify-center items-center text-gray-800 text-center font-serif">
      <form
        className="w-full max-w-md p-6 bg-chars rounded-lg shadow-md"
        onSubmit={submitHandler}
      >
        <label htmlFor="name" className="block text-left mt-1 font-semibold">
          Vehicle Number
        </label>
        <input
          className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
          ref={vehicle_number}
          type="text"
          required
          placeholder="Vehicle Number"
          id="name"
        />
        <label className="block text-left mt-1 font-semibold" htmlFor="type">
          Vehicle Type
        </label>
        <input
          className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
          ref={typeRef}
          type="text"
          required
          placeholder="Vehicle Type"
          id="type"
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

export default AddVehicle;

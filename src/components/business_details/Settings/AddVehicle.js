import React, { useRef } from "react";

const AddVehicle = (props) => {
  const { id: business_id, onClose } = props;
  const vehicle_number = useRef();
  const typeRef = useRef();
  const detailsRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(business_id);
    onClose();
  };
  return (
    <div className="flex flex-col justify-center items-center  text-chars text-center font-serif ">
      <form
        className="w-full max-w-md p-4 bg-bag rounded-lg shadow-md"
        onSubmit={submitHandler} // Move the onSubmit here
      >
        <label htmlFor="name" className="block text-left mt-1">
          Vehicle Number
        </label>
        <input
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={vehicle_number}
          type="text"
          placeholder="Vehicle Number"
          id="name"
        />
        <label className="block text-left mt-1" htmlFor="type">
          Vehicle Type
        </label>
        <input
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={typeRef}
          type="text"
          placeholder="Vehicle Type"
          id="type"
        />
        <label className="block text-left mt-1" htmlFor="details">
          Details
        </label>
        <input
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={detailsRef}
          type="text"
          placeholder="Details"
          id="details"
        />

        <button type="submit">Save</button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-stacks px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;

import React, { useRef } from "react";
import { addBusiness } from "../../../server_data/api";

const AddBusiness = ({ onClose, user_id }) => {
  const nameRef = useRef();
  const addressRef = useRef();
  const detailsRef = useRef();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      details: detailsRef.current.value,
    };
    try {
      const responce = await addBusiness(
        user_id,
        data.name,
        data.address,
        data.details
      );
      console.log(responce);
    } catch (error) {
      console.error(error.message);
    }
    console.log(user_id);
    onClose();
  };
  return (
    <div className="flex flex-col justify-center items-center text-chars text-center font-serif ">
      <form
        className="w-full max-w-md p-4 bg-gray-100 rounded-lg shadow-md"
        onSubmit={onSubmitHandler}
      >
        <label className="block text-left mt-1">Business Name</label>
        <input
          type="text"
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={nameRef}
          required
        />

        <label className="block text-left mt-1">Address</label>
        <input
          type="text"
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={addressRef}
        />

        <label className="block text-left mt-1">Other details</label>
        <input
          type="text"
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={detailsRef}
        />

        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Business
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-stacks px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBusiness;

import React, { useRef } from "react";

const AddWorkers = (props) => {
  const { id: business_id, onClose } = props;
  const nameRef = useRef();
  const addressRef = useRef();
  const roleRef = useRef();
  const nicRef = useRef();
  const mobileRef = useRef();
  const teleRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      role: roleRef.current.value,
      nic: nicRef.current.value,
      mobile: mobileRef.current.value,
      tele: teleRef.current.value,
    };
    console.log(data, business_id);
      onClose();
  };

  return (
    <div className="flex flex-col justify-center items-center  text-chars text-center font-serif ">
      <form
        className="w-full max-w-md p-4 bg-bag rounded-lg shadow-md"
        onSubmit={submitHandler} // Move the onSubmit here
      >
        <label htmlFor="name" className="block text-left mt-1">
          Name
        </label>
        <input
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={nameRef}
          type="text"
          required
          id="name"
        />
        <label className="block text-left mt-1" htmlFor="address">
          Address
        </label>
        <input
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={addressRef}
          type="text"
          required
          id="address"
        />
        <label className="block text-left mt-1" htmlFor="role">
          Role
        </label>
        <input
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={roleRef}
          type="text"
          required
          id="role"
        />
        <label className="block text-left mt-1" htmlFor="nic">
          NIC
        </label>
        <input
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={nicRef}
          type="text"
          required
          id="nic"
        />
        <label className="block text-left mt-1" htmlFor="mobi">
          Mobile
        </label>
        <input
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={mobileRef}
          type="tel"
          required
          id="mobi"
        />
        <label className="block text-left mt-1" htmlFor="tele">
          Tele
        </label>
        <input
          className="text-bag p-2 rounded-md mb-4 w-full"
          ref={teleRef}
          type="tel"
          required
          id="tele"
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

export default AddWorkers;

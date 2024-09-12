import React, { useRef } from "react";
import { addEmployee } from "../../../../server_data/api";

const AddWorkers = (props) => {
  const { id: business_id, onClose } = props;
  const nameRef = useRef();
  const addressRef = useRef();
  const roleRef = useRef();
  const nicRef = useRef();
  const mobileRef = useRef();
  const teleRef = useRef();
  const detailsRef = useRef();
  const daySalaryRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      role: roleRef.current.value,
      nic: nicRef.current.value,
      mobile: mobileRef.current.value,
      tele: teleRef.current.value,
      details: detailsRef.current.value,
      daySalary: daySalaryRef.current.value,
    };
    try {
      const response = await addEmployee(
        business_id,
        data.name,
        data.address,
        data.role,
        data.mobile,
        data.tele,
        data.nic,
        data.details,
        data.daySalary
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    console.log(data, business_id);
    onClose();
  };

  return (
    <div className="flex flex-col justify-center items-center text-gray-800 text-center font-serif">
      <form
        className="w-full max-w-md p-6 bg-chars rounded-lg shadow-md"
        onSubmit={submitHandler}
      >
        <label htmlFor="name" className="block text-left mt-1 font-semibold">
          Name
        </label>
        <input
          className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
          ref={nameRef}
          type="text"
          required
          id="name"
        />

        <label htmlFor="address" className="block text-left mt-1 font-semibold">
          Address
        </label>
        <input
          className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
          ref={addressRef}
          type="text"
          required
          id="address"
        />

        <label htmlFor="role" className="block text-left mt-1 font-semibold">
          Role
        </label>
        <input
          className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
          ref={roleRef}
          type="text"
          required
          id="role"
        />

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="nic" className="block text-left mt-1 font-semibold">
              NIC
            </label>
            <input
              className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
              ref={nicRef}
              type="text"
              required
              id="nic"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="daySalary"
              className="block text-left mt-1 font-semibold"
            >
              Salary for a Day
            </label>
            <input
              className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
              ref={daySalaryRef}
              type="number"
              required
              id="daySalary"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="mobile"
              className="block text-left mt-1 font-semibold"
            >
              Mobile
            </label>
            <input
              className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
              ref={mobileRef}
              type="tel"
              required
              id="mobile"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label
              htmlFor="tele"
              className="block text-left mt-1 font-semibold"
            >
              Tele
            </label>
            <input
              className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
              ref={teleRef}
              type="tel"
              required
              id="tele"
            />
          </div>
        </div>

        <label htmlFor="details" className="block text-left mt-1 font-semibold">
          Details
        </label>
        <input
          className="text-gray-800 p-2 rounded-md mb-4 w-full border border-gray-300"
          ref={detailsRef}
          type="text"
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

export default AddWorkers;

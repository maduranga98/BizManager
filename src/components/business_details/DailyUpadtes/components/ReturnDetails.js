import React, { useState } from "react";

const ReturnDetails = () => {
  const [creditTable, setCreditTable] = useState(0);

  const onCreditTable = () => {
    setCreditTable((prevCreditTable) => prevCreditTable + 1);
  };

  return (
    <div className="flex justify-center">
      <div className="mb-10 w-1/2">
        <table className="border border-black w-full table-auto">
          <caption className="text-lg font-semibold mb-4 text-bag">
            Return Details
          </caption>
          <thead>
            <tr className="bg-bag">
              <th className="px-2 py-2 border text-center text-chars">Item</th>
              <th className="px-2 py-2 border text-center text-chars">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: creditTable + 1 }).map((_, index) => (
              <tr key={index}>
                <td className="px-2 py-2 border">
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-1 w-full focus:outline-none"
                    placeholder="Enter Item"
                  />
                </td>
                <td className="px-2 py-2 border">
                  <input
                    type="number"
                    className="border border-gray-300 rounded p-1 w-full focus:outline-none"
                    placeholder="Enter Amount"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onCreditTable}
          className="mt-4 bg-color1 text-chars p-2 rounded hover:bg-buttons w-full"
        >
          + Add a Row
        </button>
      </div>
    </div>
  );
};

export default ReturnDetails;

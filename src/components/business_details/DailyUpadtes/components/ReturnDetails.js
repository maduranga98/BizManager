import React, { useState } from "react";

const ReturnDetails = () => {
  const [creditTable, setCreditTable] = useState(0);
  const onCreditTable = () => {
    setCreditTable((prevCreditTable) => prevCreditTable + 1);
  };
  return (
    <div>
      <div className="mb-10">
        <table className="border border-gray-300 w-full">
          <caption className="text-lg font-semibold mb-2 text-gray-700">
            Return Details
          </caption>
          <thead>
            <tr>
              <th className="px-4 py-2 border">Item</th>
              <th className="px-4 py-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: creditTable + 1 }).map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-1 w-full"
                    placeholder="Enter Item"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    className="border border-gray-300 rounded p-1 w-full"
                    placeholder="Enter Amount"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onCreditTable}
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          + Add a Row
        </button>
      </div>
    </div>
  );
};

export default ReturnDetails;

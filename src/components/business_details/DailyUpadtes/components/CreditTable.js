import React, { useState } from "react";

const CreditTable = () => {
  const [creditTable, setCreditTable] = useState(0);

  const onCreditTable = () => {
    setCreditTable((prevCreditTable) => prevCreditTable + 1);
  };

  return (
    <div className="w-50">
      <div className="mb-10 text-center">
        <table className="border border-gray-300 w-[400px]">
          <caption className="font-serif font-bold py-2">
            Credit Details
          </caption>
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Customer Name</th>
              <th className="px-4 py-2 border">Bill Value</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: creditTable + 1 }).map((_, index) => (
              <tr key={index} className="border">
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-1 text-sm w-full focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="border border-gray-300 rounded w-full p-1 text-sm focus:outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={onCreditTable}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            + Add a Row
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Save Credits
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditTable;

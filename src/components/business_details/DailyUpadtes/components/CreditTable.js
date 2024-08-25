import React, { useState } from "react";

const CreditTable = () => {
  const [creditTable, setCreditTable] = useState(0);
  const onCreditTable = () => {
    setCreditTable((prevCreditTable) => prevCreditTable + 1);
  };
  return (
    <div>
      <div className="mb-10 w-50 text-center">
        <table className="border border-bag w-[400px]">
          <caption className="font-serif font-semibold">Credit Details</caption>
          <thead>
            <tr>
              <th className="px-4 py-2 border font-serif">Customer Name</th>
              <th className="px-4 py-2 border font-serif">Bill Value</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: creditTable + 1 }).map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-1 text-sm"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    className="border border-gray-300 rounded w-20 text-sm"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between">
          <button onClick={onCreditTable}>+ Add a Row</button>
          <button>Save Credits</button>
        </div>
      </div>
    </div>
  );
};

export default CreditTable;

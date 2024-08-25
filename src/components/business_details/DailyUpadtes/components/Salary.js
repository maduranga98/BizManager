import React, { useState } from "react";

const Salary = () => {
  const [creditTable, setCreditTable] = useState(0);
  const onCreditTable = () => {
    setCreditTable((prevCreditTable) => prevCreditTable + 1);
  };
  return (
    <div>
      <div className="mb-10">
        <table className="border border-gray-300 ">
          <caption>Salaray</caption>
          <thead>
            <tr>
              <th className="px-4 py-2 border">Perosn</th>
              <th className="px-4 py-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: creditTable + 1 }).map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-1"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    className="border border-gray-300 rounded "
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onCreditTable}>+ Add a Row</button>
      </div>
    </div>
  );
};

export default Salary;

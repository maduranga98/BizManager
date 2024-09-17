import React, { useState } from "react";
import { addExpences } from "../../../../server_data/api";

function Expences(props) {
  const [creditTable, setCreditTable] = useState([{ reason: "", value: "" }]);

  const onCreditTable = () => {
    setCreditTable((prevCreditTable) => [
      ...prevCreditTable,
      { reason: "", value: "" },
    ]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTable = [...creditTable];
    updatedTable[index][name] = value;
    setCreditTable(updatedTable);
  };

  const onSave = async (event) => {
    event.preventDefault();
    try {
      const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
      const response = await addExpences(props.id, currentDate, creditTable);
      console.log(response);
      // You could add feedback here, like a success message
    } catch (error) {
      console.error("Error saving expenses:", error);
    }
  };

  return (
    <div>
      <div className="mb-10">
        <table className="border border-gray-300 w-full">
          <caption className="font-bold text-lg mb-2">Expenses</caption>
          <thead>
            <tr>
              <th className="px-4 py-2 border">Reason</th>
              <th className="px-4 py-2 border">Value</th>
            </tr>
          </thead>
          <tbody>
            {creditTable.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    name="reason"
                    className="border border-gray-300 rounded p-1 w-full"
                    value={row.reason}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder="Enter reason"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    name="value"
                    className="border border-gray-300 rounded p-1 w-full"
                    value={row.value}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder="Enter value"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row space-x-3 mt-4">
          <button
            onClick={onCreditTable}
            className="bg-color1 text-white p-2 rounded hover:bg-chars"
          >
            + Add a Row
          </button>
          <button
            onClick={onSave}
            className="bg-color1 text-white p-2 rounded hover:bg-chars"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Expences;

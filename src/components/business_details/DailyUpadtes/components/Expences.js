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
      const addData = async () => {
        const response = await addExpences(props.id, "2024-09-06", creditTable);
        console.log(response);
      };
      addData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-10">
        <table className="border border-gray-300 ">
          <caption>Expenses</caption>
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
                    className="border border-gray-300 rounded p-1"
                    value={row.reason}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    name="value"
                    className="border border-gray-300 rounded"
                    value={row.value}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row space-x-3">
          <button
            onClick={onCreditTable}
            className="mt-4 bg-color1 text-white p-2 rounded hover:bg-chars text-center"
          >
            + Add a Row
          </button>
          <button
            onClick={onSave}
            className="mt-4 bg-color1 text-white p-2 rounded hover:bg-chars text-center"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Expences;

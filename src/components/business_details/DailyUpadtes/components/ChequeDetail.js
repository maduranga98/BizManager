import React, { useState } from "react";
import { addCheques } from "../../../../server_data/api";

const ChequeDetail = (props) => {
  const [tableRows, setTableRows] = useState([
    { bank: "", branch: "", number: "", date: "", value: "", customerName: "" },
  ]);

  const addRow = () => {
    setTableRows([
      ...tableRows,
      {
        bank: "",
        branch: "",
        number: "",
        date: "",
        value: "",
        customerName: "",
      },
    ]);
  };

  const addingCheques = () => {
    const now = new Date(); // Get the current date and time
    console.log(props.id);
    const year = now.getFullYear(); // Get the full year
    const month = now.getMonth() + 1; // Get the month (0-11), add 1 to get 1-12
    const day = now.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    // console.log(tableRows);
    tableRows.forEach((e) => {
      const response = addCheques(
        props.id,
        e.customerName,
        e.bank,
        e.branch,
        e.value,
        e.number,
        e.date,
        formattedDate,
        "route"
      );
      console.log(response);
    });
  };

  return (
    <div className="w-50 text-center">
      <div className="mt-4">
        <table className="border border-gray-300 w-[80%] mx-auto">
          <caption className=" text-black font-serif font-bold">
            Cheque Details
          </caption>
          <thead>
            <tr>
              <th className="px-2 py-1 border border-color1">Customer Name</th>
              <th className="px-2 py-1 border border-color1">Bank</th>
              <th className="px-2 py-1 border border-color1">Branch</th>
              <th className="px-2 py-1 border border-color1">Cheque Number</th>
              <th className="px-2 py-1 border border-color1">Date</th>
              <th className="px-2 py-1 border border-color1">Value</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr key={index}>
                <td className="px-2 py-1 border border-color1">
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-1 w-full"
                    placeholder="Customer Name"
                    value={row.customerName}
                    onChange={(e) =>
                      setTableRows((prevRows) =>
                        prevRows.map((r, i) =>
                          i === index
                            ? { ...r, customerName: e.target.value }
                            : r
                        )
                      )
                    }
                  />
                </td>
                <td className="px-2 py-1 border border-color1">
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-1 w-full"
                    placeholder="Bank"
                    value={row.bank}
                    onChange={(e) =>
                      setTableRows((prevRows) =>
                        prevRows.map((r, i) =>
                          i === index ? { ...r, bank: e.target.value } : r
                        )
                      )
                    }
                  />
                </td>
                <td className="px-2 py-1 border border-color1">
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-1 w-full"
                    placeholder="Branch"
                    value={row.branch}
                    onChange={(e) =>
                      setTableRows((prevRows) =>
                        prevRows.map((r, i) =>
                          i === index ? { ...r, branch: e.target.value } : r
                        )
                      )
                    }
                  />
                </td>
                <td className="px-2 py-1 border border-color1">
                  <input
                    type="number"
                    className="border border-gray-300 rounded p-1 w-full"
                    placeholder="Cheque Number"
                    value={row.number}
                    onChange={(e) =>
                      setTableRows((prevRows) =>
                        prevRows.map((r, i) =>
                          i === index ? { ...r, number: e.target.value } : r
                        )
                      )
                    }
                  />
                </td>
                <td className="px-2 py-1 border border-color1">
                  <input
                    type="date"
                    className="border border-gray-300 rounded p-1 w-full"
                    value={row.date}
                    onChange={(e) =>
                      setTableRows((prevRows) =>
                        prevRows.map((r, i) =>
                          i === index ? { ...r, date: e.target.value } : r
                        )
                      )
                    }
                  />
                </td>
                <td className="px-2 py-1 border border-color1">
                  <input
                    type="number"
                    className="border border-gray-300 rounded p-1 w-full"
                    placeholder="Value"
                    value={row.value}
                    onChange={(e) =>
                      setTableRows((prevRows) =>
                        prevRows.map((r, i) =>
                          i === index ? { ...r, value: e.target.value } : r
                        )
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addRow}
          className="mt-4 bg-color1 text-white p-2 rounded hover:bg-chars text-center"
        >
          + Add a Row
        </button>
        <button
          onClick={addingCheques}
          className="mt-4 bg-color1 text-white p-2 rounded hover:bg-chars text-center"
        >
          + Add Cheques
        </button>
      </div>
    </div>
  );
};

export default ChequeDetail;

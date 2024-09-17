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
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const formattedDate = `${year}-${month}-${day}`;

    tableRows.forEach((e) => {
      const response = addCheques(
        props.id,
        e.customerName,
        e.bank,
        e.branch,
        e.number,
        e.value,
        e.date,
        formattedDate,
        props.routeName
      );
      console.log(response);
    });
  };

  return (
    <div className="w-full text-center">
      <div className="mt-4">
        <table className="border border-gray-300 w-[90%] mx-auto">
          <caption className="text-black font-serif font-bold mb-4">
            Cheque Details
          </caption>
          <thead>
            <tr>
              <th className="px-2 py-1 border">Customer Name</th>
              <th className="px-2 py-1 border">Bank</th>
              <th className="px-2 py-1 border">Branch</th>
              <th className="px-2 py-1 border">Cheque Number</th>
              <th className="px-2 py-1 border">Date</th>
              <th className="px-2 py-1 border">Value</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr key={index}>
                <td className="px-2 py-1 border">
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
                <td className="px-2 py-1 border">
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
                <td className="px-2 py-1 border">
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
                <td className="px-2 py-1 border">
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
                <td className="px-2 py-1 border">
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
                <td className="px-2 py-1 border">
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
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={addRow}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            + Add a Row
          </button>
          <button
            onClick={addingCheques}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            + Add Cheques
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChequeDetail;

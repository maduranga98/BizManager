import React, { useEffect, useState } from "react";
import { getChequesByRouteAndDate } from "../../../../server_data/api";

const TodaysCheques = (props) => {
  const { business_id, route, date } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChequesByRouteAndDate(
          business_id,
          date,
          route
        );
        setData(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching cheques data:", error);
      }
    };
    fetchData();
  }, [business_id, date]);

  // Calculate total value
  const totalValue = data.reduce((acc, cheque) => acc + cheque.value, 0);

  return (
    <div>
      <div className="m-5 flex flex-row">
        <h1>Todays cheques: </h1>
        <table className="border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Bank</th>
              <th className="px-4 py-2 border">Branch</th>
              <th className="px-4 py-2 border">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.emp_id}>
                <td className="px-4 py-2 border">{e.name}</td>
                <td className="px-4 py-2 border">{e.bank}</td>
                <td className="px-4 py-2 border">{e.branch}</td>
                <td className="px-4 py-2 border">{e.value}</td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 border font-bold" colSpan="3">
                Total
              </td>
              <td className="px-4 py-2 border font-bold">{totalValue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodaysCheques;

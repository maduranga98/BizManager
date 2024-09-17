import React, { useEffect, useState } from "react";
import { getCreditBillsByRoute } from "../../../../server_data/api";

const TodaysCreditBills = (props) => {
  const { business_id, route } = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getCreditBillsByRoute(business_id, route);
      setData(Array.isArray(response) ? response : []);
    };
    fetchData();
  }, [business_id]);

  const totalValue = data.reduce((acc, cheque) => acc + cheque.value, 0);

  return (
    <div>
      <div className="m-5 flex flex-row">
        <h1>Todays Credit bills: </h1>
        <table className="border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Value</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.emp_id}>
                <td className="px-4 py-2 border">{e.name}</td>
                <td className="px-4 py-2 border">{e.value}</td>
                <td className="px-4 py-2 border">{e.date}</td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 border font-bold">Total</td>
              <td className="px-4 py-2 border font-bold">{totalValue}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodaysCreditBills;

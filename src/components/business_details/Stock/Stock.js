import React, { useState, useEffect } from "react";
import { getStock } from "../../../server_data/api";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const Stock = () => {
  const { business_id } = useParams();
  const [dataList, setDataList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getStock(business_id);
        setDataList(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };

    if (business_id) {
      getData();
    }
  }, [business_id]);

  const calculateValue = (item) => {
    const { unit_price, cases, number_of_items_per_case, pieces } = item;
    return unit_price * (cases * number_of_items_per_case + pieces);
  };

  useEffect(() => {
    const total = dataList.reduce((acc, item) => acc + calculateValue(item), 0);
    setTotalValue(total);
  }, [dataList]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="p-2 bg-bag">
        <div className="flex items-center space-x-2 text-xl hover:text-color1">
          <IoArrowBackCircleSharp className="text-chars" />
          <button onClick={goBack} className="text-chars">
            Back
          </button>
        </div>
      </div>

      <div className="p-5">
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          className="table-auto w-full text-center rounded border border-2 border-black overflow-auto"
        >
          <thead className="bg-bag text-chars font-serif p-2">
            <tr>
              <th>Batch Number</th>
              <th>Item Name</th>
              <th>Unit Price</th>
              <th>Number of Items per Case</th>
              <th>Cases</th>
              <th>Pieces</th>
              <th>Free Cases</th>
              <th>Free Pieces</th>
              <th>Date</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item, index) => (
              <tr key={index} className="m-1">
                <td>{item.batch_number}</td>
                <td>{item.item_name}</td>
                <td>{item.unit_price}</td>
                <td>{item.number_of_items_per_case}</td>
                <td>{item.cases}</td>
                <td>{item.pieces}</td>
                <td>{item.free_case}</td>
                <td>{item.free_pieces}</td>
                <td>{formatDate(item.date)}</td>
                <td>{calculateValue(item).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                Total Value:
              </td>
              <td>{totalValue.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Stock;

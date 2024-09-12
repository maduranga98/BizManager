import React, { useEffect, useState } from "react";
import { getRoutes } from "../../../../server_data/api";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Divider } from "@mui/material";
import Modal from "../../../../Modal/Modal";
import AddRoute from "./AddRoute";
import { TbRouteScan } from "react-icons/tb";

const Route = (props) => {
  const [route, setRoute] = useState([]);
  const [workers, setWorkers] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRoutes(props.id);
      if (response && Array.isArray(response)) {
        setRoute(response);
      } else {
        setRoute([]);
      }
    };

    fetchData();
  }, [props.id, workers]);

  const onAddWorker = () => {
    setWorkers(true);
  };

  const closeForm = () => {
    setWorkers(false);
  };
  return (
    <div className="container mx-auto px-4 font-serif">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold">Routes</h1>
        <div className="flex items-center space-x-2 text-xl">
          <TbRouteScan />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onAddWorker}
          >
            Add Route
          </button>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-2 px-4 border-b">Name</th>

              <th className="text-left py-2 px-4 border-b">Details</th>
              <th className="border-b"></th>
              <th className="border-b"></th>
            </tr>
          </thead>
          <tbody>
            {route.map((employee) => (
              <tr key={employee.emp_id}>
                <td className="py-2 px-4 border-b">{employee.route}</td>
                <td className="py-2 px-4 border-b">{employee.details}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaPencilAlt />
                  </button>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <button className="text-red-500 hover:text-red-700">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {workers && (
        <Modal onClose={closeForm}>
          <AddRoute id={props.id} onClose={closeForm} />
        </Modal>
      )}
    </div>
  );
};

export default Route;

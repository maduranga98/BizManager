import React, { useState, useEffect } from "react";
import { getEmployees } from "../../../../server_data/api";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete, MdPeople } from "react-icons/md";
import { Divider } from "@mui/material";
import AddWorkers from "./AddWorkers";
import Modal from "../../../../Modal/Modal";

const Employee = (props) => {
  const [employees, setEmployees] = useState([]);
  const [workers, setWorkers] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmployees(props.id);
        if (response && Array.isArray(response)) {
          setEmployees(response);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [props.id]);

  const onAddWorker = () => {
    setWorkers(true);
  };

  const closeForm = () => {
    setWorkers(false);
  };

  return (
    <div className="container mx-auto px-4 font-serif">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <div className="flex items-center space-x-2 text-xl">
          <MdPeople />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onAddWorker}
          >
            Add Workers
          </button>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-2 px-4 border-b">Name</th>
              <th className="text-left py-2 px-4 border-b">Address</th>
              <th className="text-left py-2 px-4 border-b">NIC</th>
              <th className="text-left py-2 px-4 border-b">Role</th>
              <th className="text-left py-2 px-4 border-b">Mobile</th>
              <th className="text-left py-2 px-4 border-b">Tele</th>
              <th className="text-left py-2 px-4 border-b">Details</th>
              <th className="text-left py-2 px-4 border-b">Salary for a Day</th>
              <th className="border-b"></th>
              <th className="border-b"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.emp_id}>
                <td className="py-2 px-4 border-b">{employee.name}</td>
                <td className="py-2 px-4 border-b">{employee.address}</td>
                <td className="py-2 px-4 border-b">{employee.nic}</td>
                <td className="py-2 px-4 border-b">{employee.role}</td>
                <td className="py-2 px-4 border-b">{employee.mobile}</td>
                <td className="py-2 px-4 border-b">{employee.tele}</td>
                <td className="py-2 px-4 border-b">{employee.details}</td>
                <td className="py-2 px-4 border-b">{employee.daysalary}</td>
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
          <AddWorkers id={props.id} onClose={closeForm} />
        </Modal>
      )}
    </div>
  );
};

export default Employee;

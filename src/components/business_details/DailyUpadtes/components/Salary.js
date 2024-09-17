import React, { useEffect, useState } from "react";
import { getEmployees, addSalary } from "../../../../server_data/api";

const Salary = (props) => {
  const [employees, setEmployees] = useState([]);
  const [salaries, setSalaries] = useState({});

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

  const onSalaryChange = (empId, amount) => {
    setSalaries((prevSalaries) => ({
      ...prevSalaries,
      [empId]: amount,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const addFunc = async () => {
        for (const [empId, salary] of Object.entries(salaries)) {
          await addSalary(empId, salary);
        }
      };
      await addFunc();
      console.log("Salaries added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-10">
        <table className="border border-gray-300 w-full mx-auto">
          <caption className="text-xl font-bold mb-4">Salaries</caption>
          <thead>
            <tr>
              <th className="px-4 py-2 border">Person</th>
              <th className="px-4 py-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.emp_id}>
                <td className="px-4 py-2 border">{employee.name}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    className="border border-gray-300 rounded p-1 w-full"
                    value={salaries[employee.emp_id] || ""}
                    onChange={(e) =>
                      onSalaryChange(employee.emp_id, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onSubmitHandler}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Salary
        </button>
      </div>
    </div>
  );
};

export default Salary;

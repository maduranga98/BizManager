import React, { useEffect, useRef, useState } from "react";
import { getEmployees, addSalary } from "../../../../server_data/api";
const Salary = (props) => {
  const [employees, setEmployees] = useState([]);
  const salaryRef = useRef();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await getEmployees(props.id);
        if (response && Array.isArray(response)) {
          setEmployees(response);
        } else {
          setEmployees([]);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [props.id]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    try {
      const addFunc = async () => {
        const response = await addSalary();
      };
    } catch (error) {}
  };
  return (
    <div>
      <div className="mb-10">
        <table className="border border-gray-300 ">
          <caption>Salaray</caption>
          <thead>
            <tr>
              <th className="px-4 py-2 border">Person</th>
              <th className="px-4 py-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.emp_id}>
                <td className="px-4 py-2 border">{e.name}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="number"
                    className="border border-gray-300 rounded"
                    ref={salaryRef}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onSubmitHandler}>Add Salary</button>
      </div>
    </div>
  );
};

export default Salary;

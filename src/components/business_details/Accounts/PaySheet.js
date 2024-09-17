import React from "react";
import EmployeeSelector from "./paySheet/employeeSelector";
import MonthSelector from "./paySheet/MonthSelector";
import { useParams } from "react-router-dom";

const PaySheet = () => {
  const { business_id } = useParams();

  const onEmployeeSelector = (emp_id) => {
    console.log(emp_id);
  };

  const onMonthSelector = (date) => {
    console.log(date);
  };
  return (
    <div>
      <div className="bg-bag p-3">
        <h1>PaySheet</h1>
      </div>
      <div>
        <EmployeeSelector
          id={business_id}
          onEmployeeSelect={onEmployeeSelector}
        />
        <MonthSelector onMonthSelector={onMonthSelector} />
      </div>
    </div>
  );
};

export default PaySheet;

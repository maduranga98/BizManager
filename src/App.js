import React from "react";
import Login from "./components/logins/Login";
import Register from "./components/logins/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import BusinessDashboard from "./components/business_details/BusinessDashboard";
import AddStock from "./components/business_details/stock/AddStock";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Login} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/business_dashboard" element={<BusinessDashboard />} />
        <Route path="/addStock/:business_id/:user_id" element={<AddStock />} />
      </Routes>
    </Router>
  );
};

export default App;

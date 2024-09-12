import React from "react";
import Login from "./components/logins/Login";
import Register from "./components/logins/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import BusinessDashboard from "./components/business_details/BusinessDashboard";
import ItemsDetails from "./components/business_details/Items/ItemsDetails";
import MainDashBoard from "./components/business_details/DailyUpadtes/MainDashBoard";
import Stock from "./components/business_details/Stock/Stock";
import Settings from "./components/business_details/Settings/Settings";
import CreditBills from "./components/business_details/Accounts/CreditBills";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/business_dashboard" element={<BusinessDashboard />} />
        <Route
          path="/addStock/:business_id/:user_id"
          element={<ItemsDetails />}
        />
        <Route path="/dailyreport/:business_id" element={<MainDashBoard />} />
        <Route path="/stock/:business_id" element={<Stock />} />
        <Route path="/settings/:business_id" element={<Settings />} />
        <Route
          path="/accounts/credits/:business_id"
          element={<CreditBills />}
        />
      </Routes>
    </Router>
  );
};

export default App;

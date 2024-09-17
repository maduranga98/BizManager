import { StayCurrentLandscapeTwoTone } from "@mui/icons-material";
import axios from "axios";

const api_url = process.env.API_URL || "http://localhost:3001";

export const userList = async (uid) => {
  try {
    const responce = await axios.get(`${api_url}/${uid}`);
    return responce.data;
  } catch (error) {
    console.error(error.message);
  }
};
export const login = async (email, password) => {
  try {
    const responce = await axios.post(`${api_url}/login`, {
      email,
      password,
    });
    console.log(responce.data);
    return responce.data;
  } catch (error) {
    console.error(error.message);
  }
};
export const register = async (username, email, password) => {
  try {
    const responce = await axios.post(`${api_url}/register`, {
      username,
      email,
      password,
    });
    return responce.data;
  } catch (error) {
    console.error(error.message);
  }
};

// business

export const addBusiness = async (userId, businessName, address, details) => {
  try {
    const responce = await axios.post(`${api_url}/business`, {
      userId,
      businessName,
      address,
      details,
    });
    return responce.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getBusiness = async (userId) => {
  try {
    const responce = await axios.get(`${api_url}/business/${userId}`);
    return responce.data;
  } catch (error) {
    console.error(error.message);
  }
};

//items

export const addItems = async (
  user_id,
  business_id,
  batch_number,
  item_name,
  unit_price,
  number_of_items_per_case,
  date
) => {
  try {
    const responce = await axios.post(
      `${api_url}/business/${business_id}/item`,
      {
        user_id,
        business_id,
        batch_number,
        item_name,
        unit_price,
        number_of_items_per_case,
        date,
      }
    );
    return responce.data;
  } catch (error) {
    console.error(error.message);
  }
};

// get all items
export const getallItems = async (business_id, user_id) => {
  try {
    const responce = await axios.get(`${api_url}/business/${business_id}/item`);
    return responce.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const dailyLoading = async (
  business_id,
  batchnumber,
  itemname,
  cases,
  pieces,
  unitprice,
  totalprice,
  freecases,
  freepieces,
  date,
  climate,
  route
) => {
  try {
    const responce = await axios.post(`${api_url}/loading/${business_id}`, {
      business_id,
      batchnumber,
      itemname,
      cases,
      pieces,
      unitprice,
      totalprice,
      freecases,
      freepieces,
      date,
      climate,
      route,
    });
    console.log(responce);
  } catch (error) {
    console.error(error.message);
  }
};

export const getDailyLoading = async (business_id) => {
  console.log(business_id);
  try {
    const responce = await axios.get(`${api_url}/loading/${business_id}`);
    console.log(responce.data);
    return responce.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendDailyUnloading = async (
  business_id,
  batchnumber,
  itemname,
  cases,
  pieces,
  unitprice,
  totalprice,
  freecases,
  freepieces,
  date,
  climate,
  route
) => {
  try {
    const responce = await axios.post(`${api_url}/unloading/${business_id}`, {
      business_id,
      batchnumber,
      itemname,
      cases,
      pieces,
      unitprice,
      totalprice,
      freecases,
      freepieces,
      date,
      climate,
      route,
    });
    console.log(responce);
  } catch (error) {
    console.error(error);
  }
};

//stock
export const addStock = async (
  business_id,
  batch_number,
  item_name,
  cases,
  pieces,
  unit_price,
  free_case,
  free_pieces,
  number_of_items_per_case,
  date
) => {
  try {
    const responce = await axios.post(
      `${api_url}/business/${business_id}/stock`,
      {
        business_id,
        batch_number,
        item_name,
        cases,
        pieces,
        unit_price,
        free_case,
        free_pieces,
        number_of_items_per_case,
        date,
      }
    );
    console.log(responce);
  } catch (error) {
    console.error(error);
  }
};

export const getStock = async (business_id) => {
  try {
    const responce = await axios.get(
      `${api_url}/business/${business_id}/stock`
    );
    return responce.data;
  } catch (error) {
    console.error(error);
  }
};

export const getDetails = async (business_id) => {
  try {
    const responce = await axios.get(`${api_url}/details/${business_id}`);
    console.log(responce);
    return responce.data;
  } catch (error) {
    console.error(error);
  }
};

//* cheques
export const addCheques = async (
  business_id,
  name,
  bank,
  branch,
  value,
  number,
  c_date,
  r_date,
  route
) => {
  try {
    const responce = await axios.post(`${api_url}/cheque/${business_id}`, {
      name,
      bank,
      branch,
      value,
      number,
      c_date,
      r_date,
      route,
    });
    console.log(responce);
    return responce.status;
  } catch (error) {
    console.error(error);
    return error.responce ? error.responce.status : 500;
  }
};

export const getChequesByRouteAndDate = async (business_id, date, route_id) => {
  console.log(date);
  try {
    const response = await axios.get(
      `${api_url}/cheque/${business_id}/${date}/${route_id}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return error.responce ? error.responce.status : 500;
  }
};
//* employees
export const addEmployee = async (
  business_id,
  name,
  address,
  role,
  mobile,
  tele,
  nic,
  details,
  daySalary
) => {
  try {
    const responce = await axios.post(
      `${api_url}/bizManager/employee/${business_id}`,
      {
        business_id,
        name,
        address,
        role,
        mobile,
        tele,
        nic,
        details,
        daySalary,
      }
    );
    console.log(responce);
    return responce.status;
  } catch (error) {
    console.error(error);
    return error.responce ? error.responce.status : 500;
  }
};
export const getEmployees = async (business_id) => {
  try {
    const responce = await axios.get(
      `${api_url}/bizManager/employee/${business_id}`
    );
    console.log(responce);
    return responce.data;
  } catch (error) {
    console.error(error);
    return error.responce ? error.responce.status : 500;
  }
};
// vehicle
export const addVehicle = async (business_id, v_number, type, details) => {
  try {
    const responce = await axios.post(
      `${api_url}/bizManager/vehicle/${business_id}`,
      {
        business_id,
        v_number,
        type,
        details,
      }
    );
    console.log(responce);
    return responce.status;
  } catch (error) {
    console.error(error);
    return error.responce ? error.responce.status : 500;
  }
};

export const getVehicle = async (business_id) => {
  try {
    const responce = await axios.get(
      `${api_url}/bizManager/vehicle/${business_id}`
    );

    return responce.data;
  } catch (error) {
    console.error(error);
    return error.responce ? error.responce.status : 500;
  }
};

//routes
export const addRoutes = async (business_id, route, details) => {
  try {
    const responce = await axios.post(
      `${api_url}/bizManager/routes/${business_id}`,
      { route, details }
    );
    console.log(responce);
    return responce.status;
  } catch (error) {
    return error.responce ? error.responce.status : 500;
  }
};

export const getRoutes = async (business_id) => {
  try {
    const responce = await axios.get(
      `${api_url}/bizManager/routes/${business_id}`
    );
    // console.log(responce);
    return responce.data;
  } catch (error) {
    return error.responce ? error.responce.status : 500;
  }
};

//* add salary
export const addSalary = async (business_id) => {
  try {
    const responce = await axios.post();
  } catch (error) {
    return error.responce ? error.responce.status : 500;
  }
};

//* expences
export const addExpences = async (business_id, date, reason, value) => {
  try {
    const responce = await axios.post(
      `${api_url}/bizManager/expences/${business_id}`,
      { date, reason, value }
    );
    return responce.status;
  } catch (error) {
    return error.responce ? error.responce.status : 500;
  }
};

export const getExpences = async (business_id) => {
  try {
    const responce = await axios.get(
      `{api_url}/bizManager/expences/${business_id}`
    );
    return responce.data;
  } catch (error) {
    return error.responce ? error.responce.status : 500;
  }
};
export const getExpencesByMonth = async (business_id, month) => {
  try {
    const responce = await axios.post(
      `{api_url}/bizManager/expences/${business_id}`,
      { month }
    );
    return responce.data;
  } catch (error) {
    return error.responce ? error.responce.status : 500;
  }
};
export const deleteExpences = async (business_id, expense_id) => {
  try {
    const responce = await axios.delete(
      `{api_url}/bizManager/expences/${business_id}/${expense_id}`
    );
    return responce.status;
  } catch (error) {
    return error.responce ? error.responce.status : 500;
  }
};

//* credit bills
export const addCreditBills = async (business_id, name, value, route, date) => {
  try {
    const response = await axios.post(`${api_url}/credit/${business_id}`, {
      name,
      value,
      route,
      date,
    });
    return response.status;
  } catch (error) {
    return error.response ? error.response.status : 500;
  }
};

export const getCreditBillsByDateAndRoute = async (
  business_id,
  route,
  date
) => {
  try {
    const response = await axios.get(`${api_url}/credit/${business_id}`, {
      params: {
        route,
        date,
      },
    });
    return response.data;
  } catch (error) {
    // Ensure `error.response` is safely accessed
    return error.response
      ? error.response.data
      : { status: 500, message: "Server Error" };
  }
};

export const getCreditBillsByRoute = async (business_id, route) => {
  try {
    const response = await axios.get(
      `${api_url}/credit/${business_id}/${route}`
    );
    return response.data;
  } catch (error) {
    // Ensure `error.response` is safely accessed
    return error.response
      ? error.response.data
      : { status: 500, message: "Server Error" };
  }
};

//* company cheques

export const addCompanyCheques = async (business_id, value, due_date, date) => {
  try {
    const response = await axios.post(
      `${api_url}/bizManager/company_cheques/${business_id}`,
      {
        value,
        due_date,
        date,
      }
    );
    return response.status;
  } catch (error) {
    return error.response ? error.response.status : 500;
  }
};

//* attendence

export const markAttendence = async (business_id, emp_id, date, absent) => {
  try {
    const responce = await axios.post(
      `${api_url}/bizManager/attendence/${business_id}/${emp_id}`,
      {
        date,
        absent,
      }
    );
    return responce.status;
  } catch (error) {
    return error.response ? error.response.status : 500;
  }
};

export const getAttendance = async (
  business_id,
  emp_id,
  startdate,
  enddate
) => {
  try {
    const response = await axios.get(
      `${api_url}/bizManager/attendance/${business_id}/${emp_id}`,
      {
        params: {
          startdate,
          enddate,
        },
      }
    );

    return response.data; // return the response data after successful call
  } catch (error) {
    return error.response ? error.response.status : 500; // handle the error
  }
};

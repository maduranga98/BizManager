import axios from "axios";

const api_url = process.env.API_URL;

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

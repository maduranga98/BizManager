import axios from "axios";
// http://localhost:3001
const api_url = process.env.API_URL;
console.log(api_url);
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
        user_id,
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
    return responce.data;
  } catch (error) {
    console.error(error.message);
  }
};

// get all items
export const getallItems = async (business_id, user_id) => {
  try {
    const responce = await axios.get(
      `${api_url}/business/${business_id}/stock`
    );
    return responce.data;
  } catch (error) {
    console.error(error.message);
  }
};

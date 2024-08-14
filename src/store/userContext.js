import React, { useState } from "react";

const UserContext = React.createContext({
  user_id: "",
  user_name: "",
  business_id: "",
  setUser: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    user_id: "",
    user_name: "",
    business_id: "",
  });

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

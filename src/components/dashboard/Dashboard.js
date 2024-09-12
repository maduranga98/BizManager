import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import AddBusiness from "./business/AddBusiness";
import UserContext from "../../store/userContext";
import { getBusiness } from "../../server_data/api";
import BusinessTable from "./business/BusinessTable";
import Loading from "../../Modal/Loading";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const { user_name, user_id } = useContext(UserContext);
  const [businessData, setBusinessData] = useState("");

  useEffect(() => {
    // console.log("object");
    const fetchBusiness = async () => {
      try {
        const response = await getBusiness(user_id);
        setBusinessData(JSON.stringify(response, null, 2));
        // console.log(response);
      } catch (error) {
        console.error("Error fetching business:", error);
      }
    };

    if (user_id) {
      fetchBusiness();
    }
  }, [user_id, showForm]);

  const onAddBusiness = (event) => {
    event.preventDefault();
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const now = new Date(); // Get the current date and time

  const year = now.getFullYear(); // Get the full year
  const month = now.getMonth() + 1; // Get the month (0-11), add 1 to get 1-12
  const day = now.getDate();
  const formattedDate = `${year} - ${month} -${day}`;
  return (
    <div className="bg-bag min-h-screen">
      <Header />

      <div className="bg-stacks flex flex-row justify-between p-4 relative">
        <h1>Hello {user_name}</h1>
        <h1>{formattedDate}</h1>
        <button
          type="button"
          onClick={onAddBusiness}
          className=" border border-color1 text-md bg-color1 text-chars p-1 rounded-md hover:border-chars"
        >
          + Add a Business
        </button>
      </div>

      {businessData ? (
        <div className="p-10">
          <h1 className="font-serif font-bold text-2xl text-stacks">
            Business Data
          </h1>
          <div className="h-50 overflow-y-auto">
            <BusinessTable data={businessData} />
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {showForm && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-4 rounded-lg shadow-lg max-w-md w-full">
            <AddBusiness onClose={closeForm} user_id={user_id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

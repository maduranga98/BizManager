import React, { useState } from "react";
import LoadingSheet from "./LoadingSheet";
import { useParams } from "react-router-dom";
import Unloading from "./Unloading";
import Details from "./Details";

const MainDashBoard = () => {
  const { business_id } = useParams();
  const [mainPage, setmainPage] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [unloadingPage, setUnloadingPage] = useState(false);
  const [detailsPage, setDetailsPage] = useState(false);

  const onMainHandler = (event) => {
    event.preventDefault();
    setmainPage(true);
    setLoadingPage(false);
    setUnloadingPage(false);
    setDetailsPage(false);
  };
  const onLoadingHandler = (event) => {
    event.preventDefault();
    setmainPage(false);
    setLoadingPage(true);
    setUnloadingPage(false);
    setDetailsPage(false);
  };
  const onUnloadingHandler = (event) => {
    event.preventDefault();
    setmainPage(false);
    setLoadingPage(false);
    setUnloadingPage(true);
    setDetailsPage(false);
  };
  const onDetailsHandler = (event) => {
    event.preventDefault();
    setmainPage(false);
    setLoadingPage(false);
    setUnloadingPage(false);
    setDetailsPage(true);
  };
  return (
    <div className="min-h-screen">
      <div className="w-150 bg-buttons text-chars text-xl p-3 pl-10 pr-10 flex flex-row justify-between ">
        <button onClick={onMainHandler}>Main</button>
        <button onClick={onLoadingHandler}>Loading</button>
        <button onClick={onUnloadingHandler}>Unloading</button>
        <button onClick={onDetailsHandler}>Full Report</button>
      </div>
      {mainPage && (
        <div>
          <div>
            <h1>date</h1>
            <h2>Route Name</h2>
            <h3>Business Name</h3>
          </div>
          <div>
            <p>
              Need to show the total cash, cheques, credits , credits received,
              etc
            </p>
          </div>
        </div>
      )}
      {loadingPage && (
        <div>
          <LoadingSheet id={business_id} />
        </div>
      )}
      {unloadingPage && (
        <div>
          <Unloading id={business_id} />
        </div>
      )}
      {detailsPage && (
        <div>
          <Details id={business_id} />
        </div>
      )}
    </div>
  );
};

export default MainDashBoard;

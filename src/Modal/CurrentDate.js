import React, { useState, useEffect } from "react";

const CurrentDate = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1 second

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const day = currentTime.getDate();

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const formattedDate = `${year}/${month}/${day}`;
  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;

  return (
    <div className="flex flex-row space-x-4 m-5">
      <h1 className="text-2xl font-serif font-bold text-black">
        Date: {formattedDate}
      </h1>
      <h1 className="text-2xl font-serif font-bold text-black">
        Time: {formattedTime}
      </h1>
    </div>
  );
};

export default CurrentDate;

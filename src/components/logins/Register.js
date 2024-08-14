import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { register } from "../../server_data/api";

const Register = () => {
  const username = useRef("");
  const nofbusiness = useRef("");
  const email = useRef("");
  const password = useRef("");
  const [message, setMessage] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(username.current.value);

    const movie = {
      username: username.current.value,
      nofbusiness: nofbusiness.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const userData = await register(
        movie.username,
        movie.email,
        movie.password
      );
      console.log(userData);
      setMessage("User registered successfully!");
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-bag min-h-screen flex flex-col justify-center items-center text-chars text-center font-serif">
        <h1 className="mb-5 text-xl">
          Welcome to the
          <span className="font-bold text-color1"> BizManager</span>
        </h1>
        <div className="bg-stacks w-80 flex flex-col justify-center items-center rounded-md">
          <h1 className="bg-buttons mt-5 p-2 font-semibold w-full">
            User Register
          </h1>
          <div className="p-5 w-full">
            <form className="flex flex-col" onSubmit={onSubmitHandler}>
              <label className="text-left">User Name</label>
              <input
                type="text"
                placeholder="Username"
                className="text-bag p-2 rounded-md mb-2"
                ref={username}
                required
              />
              <label className="text-left">Number of business</label>
              <input
                type="number"
                placeholder="Number of business"
                className="text-bag p-2 rounded-md mb-2"
                ref={nofbusiness}
                required
              />
              <label className="text-left">Email</label>
              <input
                type="text"
                placeholder="Email"
                className="text-bag p-2 rounded-md mb-2"
                ref={email}
                required
              />
              <label className="text-left mt-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="text-bag p-2 rounded-md mb-4"
                ref={password}
                required
              />
              <button
                type="submit"
                className="bg-buttons w-40 mx-auto mt-5 rounded-full h-10 hover:bg-bag"
              >
                Register
              </button>
              {message && <p>{message}</p>}
            </form>
            <div className="flex justify-center items-center mt-5">
              <h2 className="text-buttons">Already have an Account? </h2>

              <Link to={`/login`} className="text-buttons ml-2 underline">
                Click here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../server_data/api";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/userContext";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await login(data.email, data.password);
      const token = response.token;
      const id = response.userId;
      const name = response.username;
      localStorage.setItem("token", token);
      console.log(response);
      setUser({ user_id: id, user_name: name, business_id: "" });
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="bg-bag min-h-screen flex flex-col justify-center items-center text-chars text-center font-serif">
      <h1 className="mb-5 text-xl">
        Welcome to back the
        <span className="font-bold text-color1"> BizManager</span>
      </h1>
      <div className="bg-stacks w-80 flex flex-col justify-center items-center rounded-md">
        <h1 className="bg-buttons mt-5 p-2 font-semibold w-full">User Login</h1>
        <div className="p-5 w-full">
          <form className="flex flex-col" onSubmit={onSubmitHandler}>
            <label className="text-left">Email</label>
            <input
              type="email"
              placeholder="Email"
              value="madurangalakbima@gmail.com"
              className="text-bag p-2 rounded-md mb-2"
              ref={emailRef}
              required
            />
            <label className="text-left mt-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="text-bag p-2 rounded-md mb-4"
              ref={passwordRef}
              value="123456"
              required
            />
            <button
              type="submit"
              className="bg-buttons w-40 mx-auto mt-5 rounded-full h-10 hover:bg-bag"
            >
              Login
            </button>
            {/* <button
              type="button"
              className="bg-buttons w-40 mx-auto mt-2 rounded-full h-10 hover:bg-stacks"
            >
              Forgot Password
            </button> */}
            {message && <p>{message}</p>}
          </form>
          <div className="flex justify-center items-center mt-5">
            <h2 className="text-buttons">Don't have an Account? </h2>
            <Link to={`/register`} className="text-buttons ml-2 underline">
              Click here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

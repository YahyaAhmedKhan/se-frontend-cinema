import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, RouterProvider } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login/authenticate", {
        email: email,
        password: password,
      });

      if (response.data == "Admin Authentication") {
        console.log("Success")
        setIsLoggedIn=true;
        Navigate("/admin/movieschedule")
        // Handle successful login, redirect or update state as needed
      }else if (response.data == "User Authentication"){
        console.log("User")
        setIsLoggedIn=true;
        Navigate("/home")
      } else {
        // Handle unsuccessful login, show error message, etc.
      }
    } catch (error) {
      setRegistrationStatus("Invalid Email or Password");
      console.error("Error during login:", error);
      // Handle error, show error message, etc.
    }
  };

  const handleGuestSignIn = () => {
    // Handle guest sign-in logic here
    Navigate("/home")
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="text-center main-content">
        <div className="welcome-text">
          <h1 className="mb-4 text-5xl font-bold text-white">Logo</h1>
        </div>
        <div className="inline-block p-8 mt-8 bg-gray-800 border border-gray-300 signup-form rounded-md">
          <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Welcome back! <br /> Please login to your account.
            </h2>
            {/* Display registration status */}
            {registrationStatus && (
              <div style={{color: "red" , marginBottom: "10px"}}>
                {registrationStatus}
              </div>
            )}
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`p-2 border border-gray-300 rounded-md ${
                email &&
                !isValidEmail(email) &&
                "border-red-600 border-2 bg-red-100"
              } text-black hover:border-blue-600`}
            />

            {email && !isValidEmail(email) && (
              <div className={"text-sm pl-2 mt-1 text-red-500 text-left"}>
                Invalid Email
              </div>
            )}

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 mt-4 mb-4 text-black border border-gray-300 rounded-md hover:border-blue-600"
            />

            <p className="mb-2 text-white cursor-pointer hover:underline">
              Forgot password?
            </p>
            <button
              type="submit"
              className="py-2 font-bold text-white bg-red-600 border-none button create-account-button rounded-md hover:bg-red-700"
            >
              Login
            </button>
            <p className="pt-1 text-white">or</p>
            <button
              type="button"
              onClick={handleGuestSignIn}
              className="py-2 mt-2 font-bold text-white bg-blue-600 border-none rounded-lg button guest-signin-button hover:bg-blue-700"
            >
              Sign in as Guest
            </button>

            <div className="flex self-center mt-4">
              <p className="mr-2 text-white">Don't have an account?</p>
              <Link to={"/signup"}>
                <p className="text-red-600 cursor-pointer hover:underline">
                  Sign up
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

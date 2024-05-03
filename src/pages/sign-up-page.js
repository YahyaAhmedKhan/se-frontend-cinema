import React, { useState } from "react";
import axios from "axios";
import { Link, RouterProvider } from "react-router-dom";

export const SignUp = ({ isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/register/save", {
        email: email,
        password: password,
      });

      // Set the registration status for display
      setRegistrationStatus(response.data);
    } catch (error) {
      console.error("Error during registration:", error.response.data);
      // Set the registration status for display in case of an error
      setRegistrationStatus("Registration failed. Please try again.");
    }
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isPasswordMatch() {
    return password === confirmPassword;
  }

  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-48 bg-black">
      <div className="text-center main-content">
        <div className="welcome-text">
          <h1 className="mb-4 text-5xl font-bold text-white">
            Sign up to make an account!
          </h1>
        </div>
        <div className="inline-block p-8 mt-8 bg-gray-800 border border-gray-300 signup-form rounded-md">
          <form
            className="flex flex-col items-stretch"
            onSubmit={handleSubmit}
          >
            <div className="max-w-xs">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Create an account to make your first booking!
              </h2>
            </div>
            <label
              htmlFor="email"
              className="block mt-2 mb-1 ml-1 font-bold text-left text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={`p-2 border border-gray-300 rounded-md w-full ${
                email && (isValidEmail(email) ? "bg-green-100" : "bg-red-100")
              } text-black hover:border-blue-600`}
            />
            <div>
              {email && (
                <div
                  className={`text-sm mt-2 pl-1 text-left font-semibold ${
                    isValidEmail(email) ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isValidEmail(email) ? "Valid Email" : "Invalid Email"}
                </div>
              )}
            </div>

            <label
              htmlFor="password"
              className="block mt-2 mb-1 ml-1 font-bold text-left text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`p-2 border border-gray-300 rounded-md w-full ${
                (password || confirmPassword) &&
                (isPasswordMatch() ? "bg-green-100" : "bg-red-100")
              } text-black ${
                !password && !confirmPassword && "bg-white"
              } hover:border-blue-600`}
            />
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block mt-2 mb-1 ml-1 font-bold text-left text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`p-2 border border-gray-300 rounded-md w-full ${
                  (password || confirmPassword) &&
                  (isPasswordMatch() ? "bg-green-100" : "bg-red-100")
                } text-black ${
                  !password && !confirmPassword && "bg-white"
                } hover:border-blue-600`}
              />
              {(password || confirmPassword) && (
                <div
                  className={`text-sm absolute mt-1 pl-1 font-semibold ${
                    isPasswordMatch() ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPasswordMatch()
                    ? "Passwords Match"
                    : "Passwords do not match"}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="py-2 mt-8 font-bold text-white bg-red-600 border-none rounded-lg button create-account-button hover:bg-red-800"
            >
              Create Account
            </button>
            {/* Display registration status */}
            {registrationStatus && (
              <div style={{ marginTop: "10px", color: "green" }}>
                {registrationStatus}
              </div>
            )}
            <div className="flex self-center mt-4">
              <p className="mr-2 text-white">Already have an account?</p>
              <Link to={"/login"}>
                <p className="text-red-600 cursor-pointer hover:underline">
                  Login
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

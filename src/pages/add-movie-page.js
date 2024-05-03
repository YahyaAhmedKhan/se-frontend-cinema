import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOutAlt, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { AdminNavbar } from "./admin-navbar";

export const AddNewMovie = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [language, setLanguage] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [credits, setCredits] = useState("");
  const [format, setFormat] = useState({
    "2D": false,
    "3D": false,
  });

  const handleFormatChange = (formatType) => {
    setFormat((prevFormat) => ({
      ...prevFormat,
      [formatType]: !prevFormat[formatType],
    }));
  };

  // This function would handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here
    console.log({ movieTitle, ageRating, language, synopsis, credits, format });
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform any logout logic here

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="flex flex-col items-center justify-center py-10">
        <div className="w-3/4 max-w-4xl p-8 text-white bg-gray-800 rounded-md">
          <h1 className="mb-6 text-4xl font-bold">Add New Movie</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="movieTitle" className="block text-lg font-bold">
                Movie Title:
              </label>
              <input type="text" id="movieTitle" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} className="w-full p-2 text-black rounded-md" />
            </div>

            <div>
              <label className="block text-lg font-bold">Age Rating:</label>
              {["G", "PG", "PG-13", "R"].map((rating) => (
                <button key={rating} type="button" onClick={() => setAgeRating(rating)} className={`m-2 px-4 py-2 rounded-md ${ageRating === rating ? "bg-blue-600" : "bg-gray-500"}`}>
                  {rating}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-lg font-bold">Language:</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-2 text-black rounded-md">
                {/* Populate with actual language options */}
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                {/* ... other language options */}
              </select>
            </div>

            <div>
              <label htmlFor="synopsis" className="block text-lg font-bold">
                Synopsis:
              </label>
              <textarea id="synopsis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} className="w-full p-2 text-black rounded-md" rows="4"></textarea>
            </div>

            <div>
              <label htmlFor="credits" className="block text-lg font-bold">
                Credits:
              </label>
              <textarea id="credits" value={credits} onChange={(e) => setCredits(e.target.value)} className="w-full p-2 text-black rounded-md" rows="4"></textarea>
            </div>

            <div>
              <label className="block text-lg font-bold">Format:</label>
              {["2D", "3D"].map((formatType) => (
                <button key={formatType} type="button" onClick={() => handleFormatChange(formatType)} className={`m-2 px-4 py-2 rounded-md ${format[formatType] ? "bg-blue-600" : "bg-gray-500"}`}>
                  {formatType}
                </button>
              ))}
            </div>

            <div className="flex space-x-4">
              <button type="button" className="flex items-center px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-600">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Trailer
              </button>
              <button type="button" className="flex items-center px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-600">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Thumbnail
              </button>
            </div>

            <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOutAlt, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { AdminNavbar } from "./admin-navbar";

export const AddShow = () => {
  const [movieId, setMovieId] = useState(""); // State for Movie ID
  const [selectedMovie, setSelectedMovie] = useState(""); // State for selected Movie
  const [ticketPrice, setTicketPrice] = useState(""); // State for Ticket Price
  const [startTime, setStartTime] = useState(""); // State for Start Time

  // This function would handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here
    console.log({ movieId, selectedMovie, ticketPrice, startTime });
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform any logout logic here

    // Redirect to the login page
    navigate("/login");
  };

  const movies = [
    { id: 1, title: "Black Widow" },
    { id: 2, title: "Shang-Chi and the Legend of the Ten Rings" },
    { id: 3, title: "No Time to Die" },
    { id: 4, title: "Dune" },
    { id: 5, title: "Spider-Man: No Way Home" },
    { id: 6, title: "The Suicide Squad" },
    { id: 7, title: "Jungle Cruise" },
    { id: 8, title: "The Conjuring: The Devil Made Me Do It" },
    { id: 9, title: "A Quiet Place Part II" },
    { id: 10, title: "Fast & Furious 9" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="flex flex-col items-center justify-center py-10">
        <div className="w-3/4 max-w-4xl p-8 text-white bg-gray-800 rounded-md">
          <h1 className="mb-6 text-4xl font-bold">Add Show</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="movieId" className="block text-lg font-bold">
                Movie ID:
              </label>
              <input type="text" id="movieId" value={movieId} onChange={(e) => setMovieId(e.target.value)} className="w-full p-2 text-black rounded-md" />
            </div>

            <div>
              <label className="block text-lg font-bold">Movie:</label>
              <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)} className="w-full p-2 text-black rounded-md">
                {/* Populate with actual movie options */}
                <option value="">Select a movie</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.title}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="ticketPrice" className="block text-lg font-bold">
                Ticket Price:
              </label>
              <input type="text" id="ticketPrice" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} className="w-full p-2 text-black rounded-md" />
            </div>
            <div>
              <label htmlFor="startTime" className="block text-lg font-bold">
                Start Time:
              </label>
              <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full p-2 text-black rounded-md" step="60" />
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

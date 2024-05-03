import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear, faPlus, faPencilAlt, faTrash, faSignOutAlt, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { dummyCinemas } from "../dummydata/dummy-cinemas";

import axios from "axios";
import { AdminNavbar } from "./admin-navbar";

const getCinemas = async () => {
  try {
    const response = await axios.get("/api/cinemas");
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the cinemas!", error);
  }
};

const SearchBar = () => (
  <div className="flex items-center justify-between w-full px-4 py-3 bg-gray-700">
    <span className="text-xl font-bold text-white">Filter by:</span>
    <div className="flex justify-center space-x-2">
      <input type="text" placeholder="Search by movie name" className="flex-1 px-4 py-2 rounded-md" />
      <input type="date" placeholder="Search by date" className="flex-1 px-4 py-2 rounded-md" />
      <input type="time" placeholder="Search by time" className="flex-1 px-4 py-2 rounded-md" />
    </div>
  </div>
);

const ShowtimeCard = ({ id, movieName, startTime, duration, format, ticketPrice }) => (
  <div className="flex-shrink-0 w-64 p-4 m-2 bg-white rounded-lg shadow-md">
    <h4 className="mb-2 font-bold">{movieName}</h4>
    <p>{startTime} </p>
    <p>{duration} </p>
    <p>{format} </p>
    <p>{ticketPrice} </p>
    <div className="flex mt-4 space-x-2">
      <button className="text-blue-500 hover:text-blue-700">
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <button className="text-yellow-500 hover:text-yellow-700">
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
      <button className="text-red-500 hover:text-red-700">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  </div>
);

const CinemaList = ({ id, name, shows }) => (
  <div>
    <div className="flex flex-row items-center gap-4 mb-2">
      <h3 className="text-2xl font-bold ">{name} </h3>
      <Link to={"/admin/addshow"} className="p-2 font-semibold bg-blue-300 rounded-lg hover:bg-blue-400 ">
        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
        Add Show
      </Link>
    </div>
    <div className="flex overflow-x-auto">
      {shows.map((show) => (
        <ShowtimeCard key={show.id} id={show.id} movieName={show.movieName} startTime={show.startTime} duration={show.duration} format={show.format} ticketPrice={show.ticketPrice} />
      ))}
    </div>
  </div>
);

export const MovieSchedulePage = () => {
  const [cinemas, setCinemas] = React.useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      // Here you would call `getCinemas` if you're fetching from an API
      // const data = await getCinemas();

      // For the purpose of this example, we'll use the dummy data above
      setCinemas(dummyCinemas);
    };

    fetchCinemas();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <AdminNavbar />

      <SearchBar />
      <div className="flex flex-row justify-center my-2">
        <Link to={"/admin/addmovie"} className="px-4 py-2 text-2xl font-bold text-white bg-red-600 rounded-lg hover:bg-red-700">
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
          Add Movie
        </Link>
      </div>
      <div className="px-4 pb-6 space-y-8">
        {Array.from(cinemas).map((value, cinemaIndex) => (
          <CinemaList key={value.id} id={value.id} name={value.name} shows={value.shows} />
        ))}
      </div>
    </div>
  );
};

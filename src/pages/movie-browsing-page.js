import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { dummyCinemas } from "../dummydata/dummy-cinemas";
import { faColonSign } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../components/footer";
import { useDispatch } from "react-redux";
import { setMovieDetails } from "../slices/movie-info-slice";

export const MovieBrowsingPage = () => {
  const [selectedCinema, setSelectedCinema] = useState("all");
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [movies1, setMovies1] = useState(dummyCinemas.flatMap((cinema) => cinema.shows));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dummy data for cinemas and movies - you would replace this with data from your backend
  const cinemas = ["Cinema 1", "Cinema 2", "Cinema 3"];
  const movies = dummyCinemas.flatMap((cinema) => cinema.shows);

  console.log(movies);

  const handleCinemaChange = (e) => {
    setSelectedCinema(e.target.value);
  };

  const handleTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const filterMovies = (movie) => {
    // Filter by selected cinema
    const cinemaFilter = selectedCinema === "all" || movie.cinema === selectedCinema;

    // Filter by movie title
    const titleFilter = searchTitle === "" || movie.movieName.toLowerCase().includes(searchTitle.toLowerCase());

    // Filter by selected date
    // Assuming movie.showdate is in a format that can be compared with selectedDate
    const dateFilter = selectedDate === "" || movie.showdate === selectedDate;
    console.log(selectedDate);

    return cinemaFilter && titleFilter && dateFilter;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(9); // Number of movies you want per page

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.filter(filterMovies).slice(indexOfFirstMovie, indexOfLastMovie);

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleMovieInfoClick = (movie) => {
    console.log("Movie info clicked");
    dispatch(setMovieDetails(movie));
    navigate("/movieinfo");
  };

  const handleBookTicketClick = (movie) => {
    console.log("Book ticket clicked");
    dispatch(setMovieDetails(movie));
    navigate("/selectseats");
  };

  return (
    <div className="flex-col h-auto bg-black">
      <NavBar />

      <div className="p-4 mt-10 text-white bg-gray-800 filter-bar">
        <div className="flex items-center justify-between px-28">
          <div className="text-xl font-medium">Filter by:</div>
          <select className="p-2 text-white w-[20%] bg-gray-700 rounded" onChange={handleCinemaChange}>
            <option value="all">All Cinemas</option>
            {cinemas.map((cinema, index) => (
              <option key={index} value={cinema}>
                {cinema}
              </option>
            ))}
          </select>
          <input className="p-2 w-[20%] text-white bg-gray-700 rounded" type="text" placeholder="Search by movie title" value={searchTitle} onChange={handleTitleChange} />
          <input className="w-[20%] p-2 text-white bg-gray-700 rounded" type="date" value={selectedDate} onChange={handleDateChange} />
          <button className="px-4 py-2 text-lg font-semibold text-black bg-white rounded-xl hover:bg-gray-300">Search </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
        {currentMovies.map((movie, index) => (
          <div key={index} className="overflow-hidden text-white bg-gray-800 rounded shadow-lg">
            <img src={movie.image} alt={movie.title} className="w-full" />
            <div className="px-6 py-4">
              <div className="mb-2 text-xl font-bold">{movie.movieName}</div>
              <p className="text-base text-gray-300">Time: {movie.startTime}</p>
              <p className="text-base text-gray-300">Rating: {movie.rating}</p>
              <p className="text-base text-gray-300">Genre: {movie.genre}</p>
              <p className="text-base text-gray-300">Format: {movie.format}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700" onClick={() => handleMovieInfoClick(movie)}>
                Movie Info
              </button>
              <button className="px-4 py-2 ml-4 font-semibold text-white bg-red-500 rounded hover:bg-red-700" onClick={() => handleBookTicketClick(movie)}>
                Book Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={goToPrevPage} className="flex items-center justify-center w-10 h-10 mx-1 mr-4 text-white transition duration-300 ease-in-out transform rounded-full hover:scale-110" disabled={currentPage === 1}>
          Previous
        </button>

        {[...Array(Math.ceil(movies.filter(filterMovies).length / moviesPerPage)).keys()].map((number) => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className={`flex items-center justify-center w-10 h-10 mx-1 border font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-125 ${
              currentPage === number + 1 ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 bg-white text-gray-800"
            }`}
          >
            {number + 1}
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className="flex items-center justify-center w-10 h-10 mx-1 text-white transition duration-300 ease-in-out transform rounded-full cursor-pointer hover:scale-110"
          disabled={currentPage === Math.ceil(movies.filter(filterMovies).length / moviesPerPage)}
        >
          Next
        </button>
      </div>

      <Footer></Footer>
    </div>
  );
};

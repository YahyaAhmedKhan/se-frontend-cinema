import React, { useState } from "react";
import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../helper/helper-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { updateSelectedSeats } from "../slices/show-selection-slice";

export const SeatSelectionPage = () => {
  // Assuming you have a Redux state with movie details.
  // const movie = useSelector((state) => state.movieInfo.movieDetails);
  const selectedSeats2 = useSelector((state) => state.showSelection.selectedSeats);
  const dispatch = useDispatch();

  const movie = {
    id: 101,
    movieName: "Avatar",
    startTime: "12:00 PM",
    duration: "2h 42m",
    format: "3D",
    ticketPrice: 12.99,
    synopsis: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    rating: "PG-13",
    director: "James Cameron",
    writer: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    trailerUrl: "https://www.youtube.com/watch?v=5PSNL1qE6VY", // Regular YouTube URL
    date: "2021-10-10",
  };
  const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H"].reverse();
  const seatCols = Array.from({ length: 17 }, (_, i) => i + 1); // Create an array [1, 2, ..., 17]

  const getRandomSeat = () => {
    const randomRow = seatRows[Math.floor(Math.random() * seatRows.length)];
    const randomColumn = seatCols[Math.floor(Math.random() * seatCols.length)];
    return `${randomRow}${randomColumn}`;
  };

  const generateRandomSeats = (numSeats) => {
    const randomSeats = [];
    while (randomSeats.length < numSeats) {
      const newSeat = getRandomSeat();
      if (!randomSeats.includes(newSeat)) {
        randomSeats.push(newSeat);
      }
    }
    return randomSeats;
  };
  const isSeatTaken = (seatKey) => {
    return takenSeats.includes(seatKey);
  };

  const testTakenSeats = ["A3", "B5", "C2", "D7", "E10", "F8", "G12", "H9", "A15", "B13", "C6", "D4", "E14", "F11", "G1", "H16", "A8", "B9", "C12", "H17"];

  const nonExistentSeats = ["C1", "C17", "B1", "B2", "B16", "B17", "A1", "A2", "A3", "A4", "A14", "A15", "A16", "A17"];
  const [selectedSeats, setSelectedSeats] = useState(selectedSeats2);
  const [takenSeats, setTakenSeats] = useState(testTakenSeats);

  const handleSeatClick = (seatKey) => {
    if (!isSeatTaken(seatKey)) {
      // Check if the seat is already selected
      if (selectedSeats.includes(seatKey)) {
        // Deselect the seat
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatKey));
      } else {
        // Select the seat
        setSelectedSeats([...selectedSeats, seatKey]);
        dispatch(updateSelectedSeats({ selectedSeats: [...selectedSeats, seatKey] }));
      }
    }
  };

  const calculateTotalPrice = () => {
    return (selectedSeats.length * movie.ticketPrice).toFixed(2);
  };

  const clearSelectedSeats = () => {
    setSelectedSeats([]);
    dispatch(updateSelectedSeats({ selectedSeats: [] }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center text-white main-content">
          <h1 className="mt-10 text-4xl font-medium">Select Seats</h1>
          <MovieInfoBar movie={movie} />

          <div className="flex w-full flex-grow h-[700px] bg-gray-500 seats-and-bill-areas p-3 gap-3">
            <div className="h-full bg-black flex-[8] seats-selection-area rounded-lg border-black px-3 pt-3 flex flex-col ">
              <div className="flex flex-[12]">
                <div className="flex-[1] empty-space-left"></div>
                <div className="flex-[8] toprow&grid&screen flex flex-col">
                  <div className="flex flex-row flex-1 text-gray-500 select-none top-numbers-row">
                    {seatCols.map((col, index) => (
                      <div key={index} className="flex flex-row flex-1">
                        <div className="flex items-center justify-center flex-1">{col}</div>
                      </div>
                    ))}{" "}
                  </div>
                  <div className="flex-[8] seats-grid grid">
                    {seatRows.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex flex-row flex-1">
                        {seatCols.map((col, colIndex) => {
                          const seatKey = `${row}${col}`;
                          const isSelected = selectedSeats.includes(seatKey);
                          const isSeatAvailable = !isSeatTaken(seatKey);
                          const isNonExistentSeat = nonExistentSeats.includes(seatKey);

                          const seatClass = `flex items-center justify-center flex-1 seat-block ${isSelected ? "selected-seat" : isSeatAvailable ? "available-seat" : "taken-seat"}`;

                          return (
                            <div key={colIndex} className={seatClass} onClick={() => handleSeatClick(seatKey)} disabled={!isSeatAvailable}>
                              <Seat key={seatKey} isSelected={isSelected} isSeatAvailable={isSeatAvailable} isNonExistentSeat={isNonExistentSeat} />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 bottom-screen-rect px-[10%] flex flex-col justify-end items-center">
                    <div className="justify-center w-full py-2 font-semibold text-center bg-gray-500 border-b-0 select-none rounded-t-xl">Screen</div>
                  </div>
                </div>
                <div className="flex-[1] letter-col-right flex flex-col select-none ">
                  <div className="flex-1 empty-gap-top "></div>
                  <div className="flex-[8] letters justify-between flex flex-col text-gray-500">
                    {seatRows.map((row, index) => (
                      <div key={index} className="flex flex-row flex-1">
                        <div className="flex items-center justify-center flex-1">{row}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 empty-gap-bottom"></div>
                </div>
              </div>
              <div className="flex flex-col flex-[1] px-[11rem] seats-legend-area justify-center w-full py-1">
                <div className="flex flex-row items-center justify-between w-full seat-legend-row">
                  <div className="flex items-center gap-3 px-3 py-1 border border-white rounded-lg taken-seat">
                    <div className="font-semibold text-md">Taken</div>
                    <FontAwesomeIcon className="text-2xl text-gray-700" icon={faCouch} />
                  </div>
                  <div className="flex items-center gap-3 px-3 py-1 border border-white rounded-lg vacant-seat">
                    <div className="font-semibold text-md">Vacant</div>
                    <FontAwesomeIcon className="text-2xl text-white" icon={faCouch} />
                  </div>
                  <div className="flex items-center gap-3 px-3 py-1 border border-white rounded-lg selected-seat">
                    <div className="font-semibold text-md">Selected</div>
                    <FontAwesomeIcon className="text-2xl text-red-600" icon={faCouch} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className={`px-3 py-1 text-white rounded-lg transition duration-200 ${selectedSeats.length === 0 ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 active:bg-red-800"}`}
                      onClick={selectedSeats.length === 0 ? undefined : clearSelectedSeats}
                      disabled={selectedSeats.length === 0}
                    >
                      Clear Seats
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full flex-[4] bill-area rounded-lg flex flex-col bg-gradient-to-b from-gray-800 to-gray-900">
              <div className="flex flex-col receipt-area flex-[12] pt-20 px-12">
                <div className="flex flex-col w-full h-full px-8 pt-8 pb-12 bg-black rounded-2xl">
                  <div className="mb-4 text-3xl font-bold text-center">Total</div>
                  <div className="flex flex-col h-full py-2 pl-4 pr-2 bg-gray-100 rounded-[0.25rem] calculation-area">
                    <div className="flex-[8] flex flex-row calculation-columns ">
                      <div className="flex-[6] item-column">
                        <div className="mb-4 font-bold text-black underline">Item</div>
                        <div className="text-black ">Standard Seat</div>
                      </div>
                      <div className="flex-[2] qty-column">
                        <div className="mb-4 font-bold text-center text-black underline">Qty</div>
                        <div className="text-center text-black ">x {selectedSeats.length}</div>
                      </div>
                      <div className="flex-[3] price-column">
                        <div className="mb-4 font-bold text-center text-black underline">Price</div>
                        <div className="text-center text-black ">${movie.ticketPrice}</div>
                      </div>
                    </div>
                    <div className="flex flex-row h-full total-row-area pt-16 pb-2 flex-[2]">
                      <div className="flex flex-row items-center justify-between w-full text-black border-black border-y-2 total-row-info ">
                        <div className="font-bold flex-[8] ml-2">Total</div>
                        <div className="font-bold flex-[3] text-center">${calculateTotalPrice()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col proceed-to-payment-area flex-[2] h-full p-12">
                <Link className="w-full h-full px-4 py-2" to={"/checkout"}>
                  {/* Update the Link to direct to the payment page */}
                  <button className="w-full h-full text-lg font-semibold text-white transition duration-200 bg-red-700 rounded-xl hover:bg-red-800 active:bg-red-900 hover:scale-[103%]">Proceed to Payment</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const MovieInfoBar = ({ movie }) => {
  return (
    <div className="flex flex-col justify-center w-full h-10 mt-10 bg-gray-800 py-9 px-44 move-info-bar">
      <div className="flex justify-between w-full text-lg font-normal info-line">
        <div className="flex gap-x-2">
          <strong>Movie Name:</strong> <div>{movie.movieName}</div>
        </div>
        <div>
          <strong>Starts at:</strong> {movie.startTime}
        </div>
        <div>
          <strong>Duration:</strong> {movie.duration}
        </div>
        <div>
          <strong>Ticket Price:</strong> ${movie.ticketPrice.toFixed(2)}
        </div>
        <div>
          <strong>Date:</strong> {formatDate(movie.date)}
        </div>
      </div>
    </div>
  );
};
const Seat = ({ isSelected, isSeatAvailable, isNonExistentSeat, onClick }) => {
  if (isNonExistentSeat) {
    // Render an empty space for non-existent seats
    return <div className="text-2xl text-white select-none">{"\u00A0"}</div>;
  }

  const seatColorClass = isSelected
    ? "text-red-600" // Selected seat color
    : isSeatAvailable
    ? "text-white" // Available seat color
    : "text-gray-700"; // Taken seat color

  const hoverClass = isSeatAvailable ? "hover:text-red-600 active:text-red-900" : "";
  const cursorClass = isSeatAvailable ? "cursor-pointer" : ""; // Apply cursor-pointer class only if the seat is available

  return (
    <div className={`text-2xl ${seatColorClass} ${hoverClass} ${cursorClass}`} onClick={isSeatAvailable ? onClick : null}>
      <FontAwesomeIcon icon={faCouch} />
    </div>
  );
};

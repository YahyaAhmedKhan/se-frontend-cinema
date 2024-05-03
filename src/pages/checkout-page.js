import React, { useState } from "react";
import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { useSelector } from "react-redux";
import { formatDate, formatPrice } from "../helper/helper-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCouch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const CheckoutPage = () => {
  // Assuming you have a Redux state with movie details.
  // const movie = useSelector((state) => state.movieInfo.movieDetails);

  const showSelectionInfo = useSelector((state) => state.showSelection);

  const serviceCharge = 300;
  const tax = 0.1;
  const totalOrderAmount = showSelectionInfo.totalPrice * (1 + tax) + serviceCharge;

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
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg",
  };
  return (
    <div className="flex flex-col h-screen">
      <NavBar />

      {/* Main content area */}
      <div className="flex flex-col items-center px-[17%] main-content mt-[5%] h-full">
        <div className="w-full text-4xl mb-[2%] font-light text-white order-summary-row">Your Order Summary</div>
        <div className="flex flex-row w-full bg-gray-50 p-[1%] rounded-lg shadow-md ticket-summary-area">
          {/* Movie image */}
          <div className="movie-image flex-[2]">
            <img src={movie.posterUrl} alt="Movie Poster" className="rounded-lg shadow-md" />
          </div>
          {/* Ticket info */}
          <div className="ticket-info-area p-[1%] flex-[10] flex flex-col px-4">
            {/* Ticket details */}
            <div className="flex flex-row h-full ticket-info-columns">
              {/* Left column */}
              <div className="flex flex-col flex-1 left-column-ticket-info">
                <div className="text-lg font-semibold">Order #4832</div>
                <div className="text-lg">
                  Movie Name: <span className="font-bold">{movie.movieName}</span>
                </div>
                <div className="text-lg">
                  Cinema: <span className="font-bold">3 2D</span>
                </div>
                <div className="flex flex-row justify-between text-lg">
                  <div>
                    Seat: <span className="font-bold">{showSelectionInfo.selectedSeats.join(", ")}</span>
                  </div>
                  <div className="font-bold ml-[10%] mr-[4%]"> (x{showSelectionInfo.numSeats})</div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-row flex-[1] left-column-ticket-info">
                <div className="right-col-details"></div>
                <div className="flex flex-col flex-[8] right-col-details">
                  <div className="text-lg font-semibold ">Total Order Amount:</div>
                  <div className="text-lg">Service Charges:</div>
                  <div className="text-lg">
                    <span>Total Tax</span>
                    <span className="italic"> ({tax * 100}%)</span>
                  </div>
                  <div className="text-lg font-bold ">Total Payable:</div>
                </div>
                <div className="flex flex-col flex-[1] text-right dollar-signs">
                  <div className="text-lg font-semibold total ">$</div>
                  <div className="text-lg service-charge">$</div>
                  <div className="text-lg tax">$</div>
                  <div className="text-lg font-bold border-black grand-total border-y ">$</div>
                </div>
                <div className="flex flex-col flex-[3] text-right right-col-prices">
                  <div className="text-lg font-semibold total ">{formatPrice(showSelectionInfo.totalPrice)}</div>
                  <div className="text-lg service-charge">{formatPrice(serviceCharge)}</div>
                  <div className="text-lg tax">{formatPrice(tax * showSelectionInfo.totalPrice)}</div>
                  <div className="text-lg font-bold border-black grand-total border-y ">{formatPrice(totalOrderAmount)}</div>
                </div>
              </div>
            </div>
            {/* Loyalty points info */}
            <div className="mt-2 font-medium text-center loyalty-info-line text-md">
              You have earned <span className="font-bold">{totalOrderAmount.toFixed(0)}</span> loyalty points with this purchase!
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end justify-between w-full py-3 confirm-button-row">
          <Link to={"/selectseats"} className="flex items-center gap-3 px-4 text-xl font-bold text-white bg-red-700 rounded-lg hover:bg-red-800 ">
            <FontAwesomeIcon className="text-3xl color " icon={faCircleArrowLeft} style={{ color: "#FFFFFF" }} />
            Back to seat selection
          </Link>
          <Link to={"/billing"} className="flex items-center gap-3 p-4 text-xl font-bold text-white transition duration-300 ease-in-out transform bg-red-700 rounded-lg hover:bg-red-600 hover:scale-105">
            Confirm Tickets & Pay
            <FontAwesomeIcon className="text-3xl color " icon={faCircleArrowRight} style={{ color: "#FFFFFF" }} />
          </Link>
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

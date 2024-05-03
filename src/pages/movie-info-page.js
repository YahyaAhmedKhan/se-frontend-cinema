import React from "react";
import { NavBar } from "../components/navbar";
import { Footer } from "../components/footer";
import { useSelector } from "react-redux";

export const MovieInfoPage = () => {
  // Assuming you have a Redux state with movie details.
  // const movie = useSelector((state) => state.movieInfo.movieDetails);
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
  };

  // Function to create a YouTube embed URL from a regular YouTube URL
  const createEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      // Construct the embed URL with various player controls as query parameters
      // don't show watch later
      return `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0&autoplay=0&`;
    } catch (error) {
      // Handle URL parsing error here
      console.error("Error parsing YouTube URL:", error);
      return "";
    }
  };
  const size = "80%";

  const embedUrlValue = createEmbedUrl(movie.trailerUrl);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center text-white main-content">
          <h1 className="mt-8 mb-4 text-5xl font-bold text-center">{movie.movieName}</h1>
          <div className="flex justify-center video-container rounded-xl" style={{ position: "relative", paddingBottom: "40%", height: 0, overflow: "hidden", width: "100%", maxWidth: "1280px" }}>
            {embedUrlValue ? (
              <iframe
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: size, height: size }}
                className="absolute video-iframe"
                src={embedUrlValue}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-red-500">Error loading video</p>
            )}
          </div>

          <div className="w-full max-w-4xl p-6 mt-8 bg-gray-800 rounded-lg shadow-lg movie-details">
            <div className="mb-2">
              <strong>Showing in:</strong>
              <button className={`format-button rounded-md mx-2 ${movie.format === "2D" ? "bg-blue-500 text-white" : "bg-transparent text-blue-500"} px-2`}>2D</button>
              <button className={`format-button rounded-md   ${movie.format === "3D" ? "bg-blue-500 text-white" : "bg-transparent text-blue-500"} px-2`}>3D</button>
            </div>

            <p className="mb-2 text-lg">
              <strong>Synopsis:</strong> <span className="text-base font-light">{movie.synopsis}</span>
            </p>
            <p className="mb-2 text-lg">
              <strong>Credits:</strong>
              <div className="text-base font-light">
                <div>
                  <strong>Directed by:</strong> {movie.director}
                </div>
                <div>
                  <strong>Written by:</strong> {movie.writer}
                </div>
                <div>
                  <strong>Starring:</strong> {movie.cast.join(", ")}
                </div>
              </div>
            </p>
            <div className="mb-2 text-lg">
              <strong>Start Time:</strong> <span className="text-xl">{movie.startTime}</span>
            </div>
            <div className="mb-2 text-lg">
              <strong>Duration:</strong> <span className="text-xl">{movie.duration}</span>
            </div>
            <div className="text-lg">
              <strong>Ticket Price:</strong> <span className="text-xl">${movie.ticketPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

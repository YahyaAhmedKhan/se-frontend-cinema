import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import movieImage1 from "../dummydata/hungergames.png";
import movieImage2 from "../dummydata/napoleon.png";
import movieImage3 from "../dummydata/wish.png";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../components/navbar";

export const LandingPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    appendDots: (dots) => (
      <div className="absolute bottom-0 left-0 z-10 flex items-center justify-center w-full pb-4">
        <ul className="flex justify-center p-0 m-0 list-none">{dots}</ul>
      </div>
    ),
    customPaging: (i) => <button className="w-2 h-2 mx-1 bg-white rounded-full opacity-75 cursor-pointer focus:outline-none" style={{ transition: "opacity .2s" }} />,
  };

  const navigate = useNavigate();
  const handleLogin = () => {
    // Perform any logout logic here

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <NavBar />
      <Slider {...settings} className="mt-10">
        <div>
          <img src={movieImage1} alt="Movie 1" className="object-cover w-full" />
        </div>
        <div>
          <img src={movieImage2} alt="Movie 2" className="object-cover w-full" />
        </div>
        <div>
          <img src={movieImage3} alt="Movie 3" className="object-cover w-full" />
        </div>
      </Slider>
    </div>
  );
};

export default LandingPage;

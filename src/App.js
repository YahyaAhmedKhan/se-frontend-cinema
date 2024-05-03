import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./pages/sign-up-page";
import { Login } from "./pages/login-page";
import { MovieSchedulePage } from "./pages/movie-schedule-page";
import { AddNewMovie } from "./pages/add-movie-page";
import { LandingPage } from "./pages/landing-page";
import { MovieBrowsingPage } from "./pages/movie-browsing-page";
import { MovieInfoPage } from "./pages/movie-info-page";
import { SeatSelectionPage } from "./pages/seat-selection-page";
import { CheckoutPage } from "./pages/checkout-page";
import { BillingPage } from "./pages/billing";
import { AddShow } from "./pages/add-show-page";

function App() {
  return (
    <BrowserRouter basename="/se-frontend-cinema">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<MovieBrowsingPage />} />
        <Route path="/admin/movieschedule" element={<MovieSchedulePage />} />
        <Route path="/admin/addmovie" element={<AddNewMovie />} />
        <Route path="/admin/addshow" element={<AddShow />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/movieinfo" element={<MovieInfoPage />} />
        <Route path="/selectseats" element={<SeatSelectionPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/billing" element={<BillingPage />} />
      </Routes>
    </BrowserRouter>
    // <Login />
    // <SignUp />
  );
}

export default App;

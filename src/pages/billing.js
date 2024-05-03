import React from "react";
import { Footer } from "../components/footer";
import { NavBar } from "../components/navbar";

export const BillingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-600">
      <NavBar />

      <div className="flex flex-col justify-center min-h-screen py-6">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          {/* Retained the skewed gradient rectangle */}
          <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-slate-400 to-light-blue-500 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-black shadow-lg sm:rounded-3xl sm:p-20">
            <h1 className="mb-10 text-2xl font-bold text-center text-white">Your Order Summary</h1>
            <div className="space-y-5 text-white">
              <div className="flex justify-between">
                <span>Order #</span>
                <span>4832</span>
              </div>
              <div className="flex justify-between">
                <span>Movie Name</span>
                <span>Cinema 3 2D</span>
              </div>
              <div className="flex justify-between">
                <span>Seat</span>
                <span>D15-17</span>
              </div>
              <div className="flex justify-between">
                <span>Total Order Amount</span>
                <span>4000</span>
              </div>
              <div className="flex justify-between">
                <span>Service Charges</span>
                <span>300</span>
              </div>
              <div className="flex justify-between">
                <span>Total Tax</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Total Payable</span>
                <span>4300</span>
              </div>
              <div className="flex justify-between">
                <span>Earned Loyalty Points</span>
                <span>430</span>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className="px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700">Email me this receipt</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

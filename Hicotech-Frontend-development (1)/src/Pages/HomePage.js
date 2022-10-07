import React, { Component } from "react";
import "./assets/css/style.css";
const HomePage = ({ location }) => {
  const HandleUser = () => {
    window.location = "/LoginUser";
  };
  const HandleAdmin = () => {
    window.location = "/login";
  };
  return (
    <section class="about-us">
      <div class="row">
        <div class="col-sm-12">
          <div class="single-about-us">
            <div class="about-btn">
              <button class="about-view" onClick={() => HandleUser()}>
                Player
              </button>
            </div>
            <div class="about-btn ">
              <button class="about-view" onClick={() => HandleAdmin()}>
                Coach
              </button>
            </div>
          </div>
        </div>
        <div class="col-sm-0">
          <div class="single-about-us"></div>
        </div>
      </div>
    </section>
  );
};
export default HomePage;

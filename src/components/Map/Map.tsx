import React from "react";
import CovidMap from "./CovidMap";

function Map() {
  return (
    <div className="m-auto w-9/12 rounded-lg bg-dark pb-2 pl-2 pr-2 pt-8 text-center text-slate-200">
      <h1 className=" mb-5 rounded-lg bg-airbnb-red pb-2 pt-2 text-lg sm:ml-5 sm:w-56 sm:text-2xl sm:font-bold">
        Statistics Map (Covid-19)
      </h1>
      <CovidMap />
    </div>
  );
}

export default Map;

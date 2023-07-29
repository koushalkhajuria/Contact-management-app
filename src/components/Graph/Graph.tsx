import React from "react";
import GraphContainer from "./GraphContainer";

const Graph: React.FC = () => {
  return (
    <div className="m-auto w-9/12 rounded-lg bg-dark p-8 text-center text-slate-200">
      <h1 className="m-auto mb-5 rounded-lg bg-airbnb-red pb-2 pt-2 sm:text-lg sm:font-semibold lg:w-56 lg:text-2xl lg:font-bold">
        Cases Statistics (COVID-19)
      </h1>
      <GraphContainer />
    </div>
  );
};

export default Graph;

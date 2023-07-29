// App.tsx
import React from "react";
import { useQuery } from "react-query";
import { CasesQueryResult, CovidData } from "./types";
import axios from "axios";
import CasesLineGraph from "./CaseLineGraph";

const fetchData = async () => {
  const response = await axios.get<CovidData>(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all",
  );
  return response.data.recovered;
};

const GraphContainer: React.FC = () => {
  const { data, isLoading, error }: CasesQueryResult = useQuery(
    "casesData",
    fetchData,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <>{data ? <CasesLineGraph data={data} /> : <div>No data available</div>}</>
  );
};

export default GraphContainer;

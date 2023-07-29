// types.ts
import { ChartOptions } from "chart.js";
import { UseQueryResult } from "react-query";

// types.ts
export interface CovidData {
  cases: {
    [date: string]: number;
  };
  deaths: {
    [date: string]: number;
  };
  recovered: {
    [date: string]: number;
  };
}

export interface CasesLineGraphProps {
  data: CovidData;
}

export type LineGraphOptions = ChartOptions;

export type CasesQueryResult = UseQueryResult<CovidData, Error>;

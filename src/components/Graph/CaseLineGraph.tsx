// CasesLineGraph.tsx
import React, { useState } from "react";
import { CovidData } from "./types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
ChartJs.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
);

interface CasesLineGraphProps {
  data: CovidData;
}

const CasesLineGraph: React.FC<CasesLineGraphProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Date>(new Date("2020-01-22"));
  const [endDate, setEndDate] = useState<Date>(new Date("2020-01-29"));

  // Filter data based on selected date range
  const filteredData = Object.entries(data).reduce(
    (result, [date, cases]) => {
      const currentDate = new Date(date);
      if (currentDate >= startDate && currentDate <= endDate) {
        result[date] = cases;
      }
      return result;
    },
    {} as CovidData["cases"],
  );

  const casesArray = Object.values(filteredData);
  const chartColors = casesArray.map((cases, index) => {
    if (index > 0) {
      return cases > casesArray[index - 1] ? "red" : "green";
    }
    return "green"; // Set the initial color as green
  });

  const chartData = {
    labels: Object.keys(filteredData),
    datasets: [
      {
        label: "Total Cases",
        data: Object.values(filteredData),
        borderColor: chartColors,
        backgroundColor: chartColors.map((color) =>
          color === "red" ? "rgba(255, 0, 0, 0.3)" : "rgba(0, 128, 0, 0.3)",
        ),
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div>
      <div className="mb-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center">
        <div className="flex-start m-1 flex flex-col items-start">
          <label className="mb-2">Start Date</label>{" "}
          <DatePicker
            className="w-28 cursor-pointer rounded-md bg-airbnb-dark-gray p-1 pl-2 pr-2 sm:w-36 md:w-56"
            selected={startDate}
            onChange={(date) => setStartDate(date as Date)}
          />
        </div>
        <div className="flex-start m-2 flex flex-col items-start">
          <label className="mb-2">End Date</label>{" "}
          <DatePicker
            className="w-28 cursor-pointer rounded-md bg-airbnb-dark-gray p-1 pl-2 pr-2 sm:w-36 md:w-56"
            selected={endDate}
            onChange={(date) => setEndDate(date as Date)}
          />
        </div>
      </div>

      <Line data={chartData} height={"120rem"} />
    </div>
  );
};

export default CasesLineGraph;

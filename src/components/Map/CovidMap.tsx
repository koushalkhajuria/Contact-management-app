import React from "react";
import { useQuery } from "react-query";
import MarkerClusterGroup from "react-leaflet-cluster";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapContainerProps,
  TileLayerProps,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Icon } from "leaflet";
import locationIcon from "../../assets/location-dot-solid.svg";

interface CustomMapContainerProps extends MapContainerProps {
  center: [number, number];
  zoom: number;
  style: React.CSSProperties;
}

interface CustomTileLayerProps extends TileLayerProps {
  attribution: string;
  url: string;
}

interface CountryData {
  country: string;
  cases: number;
  active: number;
  recovered: number;
  deaths: number;
  countryInfo: { lat: number; long: number };
}

interface GlobalData {
  affectedCountries: string;
  cases: number;
  active: number;
  recovered: number;
  deaths: number;
}

const customIcon: Icon = new Icon({
  iconUrl: locationIcon,
  iconSize: [38, 38],
});

const CovidMap: React.FC = () => {
  const mapProps: CustomMapContainerProps = {
    center: [20, 77],
    zoom: 6,
    style: {
      margin: "auto",
      height: "65vh",
      width: "100%",
      borderRadius: "1rem",
    },
  };

  const tileProps: CustomTileLayerProps = {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  };
  const { data, isLoading, error } = useQuery<CountryData[], Error>(
    "countriesData", // Unique key to identify the query
    async () => {
      const response = await axios.get<CountryData[]>(
        "https://disease.sh/v3/covid-19/countries",
      );
      return response.data;
    },
  );

  const { data: globalData } = useQuery<GlobalData, Error>(
    "globalData",
    async () => {
      const response = await axios.get<GlobalData>(
        "https://disease.sh/v3/covid-19/all",
      );
      return response.data;
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 sm:m-5">
        <h2 className="rounded bg-slate-800 p-2">
          Afftected Countries:
          <span className="ml-2 text-green-400">
            {globalData?.affectedCountries}
          </span>
        </h2>
        <h2 className="rounded bg-slate-800 p-2">
          Total Cases:
          <span className="ml-2 text-green-400"> {globalData?.cases}</span>
        </h2>
        <h2 className="rounded bg-slate-800 p-2">
          Active Cases:
          <span className="ml-2 text-green-400"> {globalData?.active}</span>
        </h2>
        <h2 className=" rounded bg-slate-800 p-2">
          Total Recovered:
          <span className="ml-2 text-green-400"> {globalData?.recovered}</span>
        </h2>
        <h2 className="mb-4 rounded bg-slate-800 p-2 sm:mb-0">
          Total Deaths:
          <span className="ml-2 text-green-400"> {globalData?.deaths}</span>
        </h2>
      </div>
      <MapContainer {...mapProps}>
        <TileLayer {...tileProps} />
        <MarkerClusterGroup>
          {data?.map((countryData: CountryData, index: number) => (
            <Marker
              key={index}
              position={[
                countryData.countryInfo.lat,
                countryData.countryInfo.long,
              ]}
              icon={customIcon}
            >
              <Popup>
                <div>
                  <h2>{countryData.country}</h2>
                  <p>Total Cases: {countryData.cases}</p>
                  <p>Total Active: {countryData.active}</p>
                  <p>Total Recovered: {countryData.recovered}</p>
                  <p>Total Deaths: {countryData.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default CovidMap;

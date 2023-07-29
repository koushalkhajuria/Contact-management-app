import React from "react";
import { useState, useEffect } from "react";
import chart from "../assets/Chart.png";
import logo from "../assets/mobile-logo.png";
import control from "../assets/control.png";
import user from "../assets/User.png";
import chartFill from "../assets/Chart_fill.png";
import { Link } from "react-router-dom";

interface Menu {
  url: string;
  title: string;
  src: string;
}

const LeftNavbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);

  const Menus = [
    { url: "/", title: "Maps", src: chart },
    { url: "/graph", title: "Charts", src: chartFill },
    { url: "/contact", title: "Contacts", src: user },
  ];

  const handleMapping: (Menu: Menu, index: number) => JSX.Element = (
    Menu,
    index,
  ) => {
    const isActive = index === selectedMenuIndex;
    return (
      <Link to={Menu.url}>
        <li
          key={index}
          className={` mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2  text-sm text-gray-300 hover:bg-light-white ${
            isActive ? "bg-light-white" : ""
          } `}
          onClick={() => setSelectedMenuIndex(index)}
        >
          <img alt="navbar options icons" src={Menu.src} />
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            {Menu.title}
          </span>
        </li>
      </Link>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) setOpen(false);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener to update on window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } sticky top-0 h-screen bg-dark  p-5 pt-8 duration-300`}
    >
      <img
        src={control}
        alt="close-open"
        className={`absolute -right-3  top-9 hidden w-7 cursor-pointer rounded-full border-2
       border-dark lg:block  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex items-center gap-x-4">
        <img
          src={logo}
          alt="logo"
          className={`w-16 cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`origin-left text-xl font-medium text-airbnb-red duration-200 ${
            !open && "scale-0"
          }`}
        >
          taiyo.ai
        </h1>
      </div>
      <ul className="pt-6">{Menus.map(handleMapping)}</ul>
    </div>
  );
};

export default LeftNavbar;

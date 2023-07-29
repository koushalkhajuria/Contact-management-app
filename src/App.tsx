import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeftNavbar from "./components/LeftNavbar";
import { QueryClient, QueryClientProvider } from "react-query";
import Map from "./components/Map/Map";
import Contact from "./components/Contact/Contact";
import Graph from "./components/Graph/Graph";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex w-screen items-start">
        <LeftNavbar />
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/* Define routes */}
            <Route path="/" element={<Map />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/graph" element={<Graph />} />
          </Routes>
        </QueryClientProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;

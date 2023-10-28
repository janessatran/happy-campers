import * as React from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { useEffect } from "react";

interface AppProps {
  arg: string;
}

interface ParkProps {
  full_name: string;
  latitude: number;
  longitude: number;
}

const App = ({ arg }: AppProps) => {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    const url = "/api/v1/parks/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setParks(res));
  }, []);

  const allParks = parks.map((park: ParkProps, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h3 className="card-title">{park.full_name}</h3>
          <span className="card-latlong">
            latitude: {park.latitude}, longitude: {park.longitude}
          </span>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      {`Hello, ${arg}!`}
      <div className="parks">{allParks}</div>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("app");
  if (container) {
    const root = createRoot(container);

    root.render(<App arg="Rails 7 with ESBuild!!!" />);
  }
});

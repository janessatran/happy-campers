import * as React from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
interface ParkProps {
  full_name: string;
  latitude: number;
  longitude: number;
}

const App = () => {
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

  const allParks: ParkProps[] = parks.map((park: ParkProps, index) => (
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

  const metaTag = document.head.querySelector(
    "meta[name=mapbox_access_token]"
  ) as HTMLMetaElement;
  const accessToken = metaTag.content;
  const url = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`;
  return (
    <div className="app-container">
      <div className="map-container">
        <MapContainer center={[39, -98]} zoom={4}>
          <TileLayer
            url={url}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
      <div className="parks">{allParks}</div>
    </div>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("app");
  if (container) {
    const root = createRoot(container);

    root.render(<App />);
  }
});

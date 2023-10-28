import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import L from "leaflet";
import * as React from "react";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SearchAppBar from "./AppBar";
import iconUrl from "../images/camping.png";
export interface ParkProps {
  full_name: string;
  description: string;
  latitude: number;
  longitude: number;
}

const App = () => {
  const [parks, setParks] = useState([]);
  const ref = React.useRef<HTMLDivElement>(null);

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

  const parkMarkers = parks
    .slice(0, 25)
    .map((park: ParkProps, index: number) => {
      if (park.latitude && park.longitude) {
        return (
          <Marker
            position={[park.latitude, park.longitude]}
            key={index}
            icon={
              new L.Icon({
                iconUrl: iconUrl,
                iconRetinaUrl: iconUrl,
                iconSize: new L.Point(45, 45),
                className: "leaflet-div-icon",
              })
            }
          >
            <Popup>
              <h2>{park.full_name}</h2>
              <div>{park.description}</div>
            </Popup>
          </Marker>
        );
      }
    });

  const metaTag = document.head.querySelector(
    "meta[name=mapbox_access_token]"
  ) as HTMLMetaElement;
  const accessToken = metaTag.content;
  const url = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`;
  return (
    <div className="app-container">
      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        {SearchAppBar()}
        <div className="map-container">
          <MapContainer center={[39, -98]} zoom={4}>
            <TileLayer
              url={url}
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {parkMarkers}
          </MapContainer>
        </div>
      </Box>
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

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import L from "leaflet";
import * as React from "react";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { SearchAppBar } from "./searchAppBar";
import iconUrl from "../images/camping.png";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { customTheme, themeOptions } from "./theme";
import {
import SearchAppBar from './searchAppBar';
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export interface ParkProps {
  full_name: string;
  description: string;
  latitude: number;
  longitude: number;
  activities: string[];
  park_code: string;
  park_images: ParkImageProps[];
}

export interface ParkImageProps {
  credit: string;
  url: string;
  title: string;
  alt_text: string;
  caption: string;
}

let parkCode: string;

const App = () => {
  const [parks, setParks] = useState([]);
  const [state, setState] = React.useState({
    [parkCode]: false,
  });
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

  const toggleDrawer =
    (parkCode: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log(event);
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      console.log("JT DEBUG: ", parkCode);
      setState({ ...state, [parkCode]: open });
    };

  const panel = (parkCode: string, park: ParkProps) => {
    const parkImages = park.park_images;
    console.log("JT DEBUG: park", park);

    const parkImageElements = parkImages?.map((image) => {
      return (
        <>
          <div className="park-image-title">{image.title}</div>
          <div className="park-image-container">
            <img src={image.url} alt={image.alt_text} className="park-image" />
          </div>
          <div className="park-image-caption">{image.caption}</div>
        </>
      );
    });

    return (
      <Box
        role="presentation"
        onClick={toggleDrawer(parkCode, false)}
        onKeyDown={toggleDrawer(parkCode, false)}
      >
        <div className="park-content">
          <h2>{park.full_name}</h2>
          <div>{park.description}</div>
          <div className="park-activities">
            <strong>Activities: </strong>
            {park.activities.map((activity) => activity.description).join(", ")}
          </div>
          {parkImageElements}
        </div>
      </Box>
    );
  };

  const parkMarkers = parks
    .slice(0, 25)
    .map((park: ParkProps, index: number) => {
      if (park.latitude && park.longitude) {
        const marker = (
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
            riseOnHover={true}
            eventHandlers={{
              click: (_e) => {
                setState({ ...state, [park.park_code]: true });
              },
            }}
          >
            <Drawer
              anchor={"right"}
              open={state[park.park_code]}
              onClose={toggleDrawer(park.park_code, false)}
            >
              {panel(park.park_code, park)}
            </Drawer>
          </Marker>
        );

        return marker;
      }
    });

  const metaTag = document.head.querySelector(
    "meta[name=mapbox_access_token]"
  ) as HTMLMetaElement;
  const accessToken = metaTag.content;
  const url = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`;

  return (
    <div className="app-container">
      <ThemeProvider theme={customTheme}>
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
      </ThemeProvider>
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

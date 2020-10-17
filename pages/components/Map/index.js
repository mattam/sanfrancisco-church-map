import React from "react";
import {
  Map,
  TileLayer,
  Viewport,
  Marker,
  Popup,
} from "react-leaflet-universal";

export default function MapComponent(props) {
  const state = {
    lat: 37.75,
    lng: -122.438,
    zoom: 12,
  };
  return props.churches ? (
    <Map
      center={[state.lat, state.lng]}
      zoom={state.zoom}
      style={{ width: "500px", height: "500px" }}
    >
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.churches.map(({ attributes: church }) => {
        if (church.NLat) {
          const point = [church.NLat, church.NLong];
          return (
            <Marker position={point} key={church.FID}>
              <Popup>
                <h2>{church["Name"]}</h2>
                <span>
                  ADDRESS: {church["Address"]}, {church["City"]} -{" "}
                  {church["ZIP"]}
                </span>
                <br />
                <br />
              </Popup>
            </Marker>
          );
        }
      })}
    </Map>
  ) : (
    "Data is loading..."
  );
}

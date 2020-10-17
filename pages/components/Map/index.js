import React from "react";
import {
  Map,
  TileLayer,
  Viewport,
  Marker,
  Popup,
} from "react-leaflet-universal";

const DEFAULT_VIEWPORT = {
  center: [51.505, -0.09],
  zoom: 13,
};

export default function MapComponent(props) {
  console.log("props: ", props);
  const state = {
    lat: 37.7749,
    lng: -122.4194,
    zoom: 13,
    viewport: DEFAULT_VIEWPORT,
  };
  return props.churches ? (
    <Map
      viewport={state.viewport}
      center={[state.lat, state.lng]}
      zoom={state.zoom}
      style={{ width: "500px", height: "500px" }}
    >
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  ) : (
    "Data is loading..."
  );
}

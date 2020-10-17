import React from "react";
import {
  Map,
  TileLayer,
  Viewport,
  Marker,
  Popup,
} from "react-leaflet-universal";

const renderList = (items) => {
  let myArr = Array.from(items).sort();
  console.log("myArr", myArr);
  return myArr.map((item) => {
    console.log("item", item);
    return <li>{item}</li>;
  });
};

export default function MapComponent(props) {
  const state = {
    lat: 37.75,
    lng: -122.438,
    zoom: 12,
  };
  let attributeClass = new Set();
  let religion = new Set();
  let numChurches = 0;
  return props.churches ? (
    <div>
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
            numChurches++;
            attributeClass.add(church["Class"]);
            religion.add(church["Religion"]);
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
      <div className="notes">
        <h3>Number of entries in database: {props.churches.length}</h3>
        <h3>Number of churches mapped: {numChurches}</h3>
        <h3>
          Classes: <ul>{renderList(attributeClass)}</ul>
        </h3>
        <h3>Religions {renderList(religion)}</h3>
      </div>
    </div>
  ) : (
    "Data is loading..."
  );
}

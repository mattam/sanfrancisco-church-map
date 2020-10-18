import React, { useState } from "react";
import {
  Map,
  TileLayer,
  Viewport,
  Marker,
  Popup,
} from "react-leaflet-universal";

const renderList = (items) => {
  let myArr = Array.from(items).sort();
  return myArr.map((item) => {
    return <option value={item}>{item}</option>;
  });
};

export default function MapComponent(props) {
  const [religion, setReligion] = useState("All");
  const state = {
    lat: 37.75,
    lng: -122.438,
    zoom: 12,
  };
  let attributeClass = new Set();
  let attributeReligion = new Set();
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
        {props.churches
          .filter(({ attributes: church }) => {
            return religion === "All" || church["Religion"] === religion;
          })
          .map(({ attributes: church }) => {
            if (church.NLat) {
              numChurches++;
              attributeClass.add(church["Class"]);
              attributeReligion.add(church["Religion"]);
              const point = [church.NLat, church.NLong];

              return (
                <Marker position={point} key={church.FID}>
                  <Popup>
                    <h2>{church["Name"]}</h2>
                    <p>
                      <h3>Phone:</h3> {church["Phone"]}
                    </p>
                    <p>
                      <h3>Address:</h3>
                      {church["Address"]}
                      <br />
                    </p>
                    {church["Website"].length > 2 && (
                      <p>
                        <h3>Website:</h3>{" "}
                        <a target="_blank" href={church["Website"]}>
                          {church["Website"]}
                        </a>
                      </p>
                    )}

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
          Religions:
          <select
            value={religion}
            onChange={(event) => setReligion(event.currentTarget.value)}
          >
            <option value="All">All</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Evangelical">Evangelical</option>
            <option value="Hindu">Hindu</option>
            <option value="Interfaith">Interfaith</option>
            <option value="Jewish">Jewish</option>
            <option value="Mainline">Mainline</option>
            <option value="Muslim">Muslim</option>
            <option value="Orthodox">Orthodox</option>
            <option value="Other">Other</option>
            <option value="Roman Catholic">Roman Catholic</option>
          </select>
        </h3>
      </div>
    </div>
  ) : (
    "Data is loading..."
  );
}

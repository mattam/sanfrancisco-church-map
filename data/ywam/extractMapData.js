const fs = require("fs");
var esridata = require("./ywam/ywam-churchdata.json");

// console.log("esridata.operationalLayers", esridata.operationalLayers);

let churches = [];

esridata.operationalLayers.forEach((layer) => {
  if (
    layer.layerType === "ArcGISFeatureLayer" &&
    layer.title === "Sacred Places"
  ) {
    churches = layer.featureCollection.layers[0].featureSet.features;
  }
});

// console.log("churches: ", churches);
let count = 0;
let missingLat = 0;
churches.map((church) => {
  const data = church.attributes;
  console.log("data: ", data);
  count++;
  if (data.NLat === null || data.NLat === undefined) {
    missingLat++;
  }
});

console.log(`found ${count} churches`);
console.log(`${missingLat} churches are missing Latitudes`);

let writeData = JSON.stringify(churches);
fs.writeFileSync("ywam-cleanedchurchdata.json", writeData);

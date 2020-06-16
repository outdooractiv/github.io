let startlayer = L.tileLayer.provider("OpenStreetMap.Mapnik");

let map = L.map("map", {
    center: [47.23, 10.73],
    zoom: 12,
    layers: [
        startlayer
    ]
});

L.control.layers({
    "TopoMap": L.tileLayer.provider("OpenTopoMap"),
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Satellit": L.tileLayer.provider("Esri.WorldImagery")
}).addTo(map);




//L.geoJSON(geojsonFeature).addTo(map);


console.log(geojsonFeature.features[3].properties);
console.log(geojsonFeature.features.length);

for (let i = 0; i < geojsonFeature.features.length; i++) {
    const element = geojsonFeature.features[i];
    const fclass = element.properties.fclass;
    const name = element.properties.name;
    
    if (element.properties.fclass === "drinking_water") {
        L.geoJSON(element).bindPopup(fclass, name).addTo(map);
    }
};
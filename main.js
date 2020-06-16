let startlayer = L.tileLayer.provider("OpenStreetMap.Mapnik");

let map = L.map("map", {
    center: [47.181075, 11.377461],
    zoom: 12,
    layers: [
        startlayer
    ]
});

let poi = {
    drinkingWater: L.featureGroup()
};

L.control.layers({
    "TopoMap": L.tileLayer.provider("OpenTopoMap"),
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Satellit": L.tileLayer.provider("Esri.WorldImagery")
}, {
    "Trinkwasser": poi.drinkingWater
}).addTo(map);




L.geoJSON(TOUREN).addTo(map);


console.log(geojsonFeature.features[3].properties);
console.log(geojsonFeature.features.length);

for (let i = 0; i < geojsonFeature.features.length; i++) {
    const element = geojsonFeature.features[i];
    
    if (element.properties.fclass === "drinking_water") {
        L.geoJSON(element, {
            pointToLayer: function(point, latlng) {
                console.log("Point", point.properties.fclass);
                console.log("latlng", latlng);
                let myIcon = L.icon({iconUrl: 'icon/drinkingfountain.png'});
                let marker = L.marker(latlng, {
                    icon: myIcon
                });
                marker.bindPopup(`<h3>${point.properties.fclass}</h3>`);
                return marker
            }
        }).addTo(poi.drinkingWater);
    };
};
let startlayer = L.tileLayer.provider("OpenStreetMap.Mapnik");

let map = L.map("map", {
    center: [47.181075, 11.377461],
    zoom: 12,
    layers: [
        startlayer
    ]
});

let overlay = {
    eat: L.featureGroup(),
    drink: L.featureGroup(),
    party: L.featureGroup(),
    drinkingWater: L.featureGroup()
};

L.control.layers({
    "TopoMap": L.tileLayer.provider("OpenTopoMap"),
    "OpenStreetMap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Satellit": L.tileLayer.provider("Esri.WorldImagery")
}, {
    //"Schlafen": poi.sleep,
    "Essen": overlay.eat,
    "Trinken": overlay.drink,
    "Party": overlay.party,
    "Trinkwasser": overlay.drinkingWater
}).addTo(map);




L.geoJSON(TOUREN, {
    style: function (geojsonFeature) {
        return {
            weight: 8,
            color: "darkblue"
        }

    },
    onEachFeature: function (feature, layer) {
        //console.log("tourenFeature", feature);
        //console.log("tourenLayer", layer);
        layer.bindPopup(`<h4> Tour: ${feature.properties.fclass}</h4>
        <h4>Fluss: ${feature.properties.name}</h4>`);
        layer.on('mouseover', function (e) {
            layer.openPopup();
        });
        layer.on('mouseout', function (e) {
            layer.closePopup();
        });
        return layer
    }
}).addTo(map);

L.geoJSON(BASE_EIN_AUSSTIEG, {
    pointToLayer: function (point, latlng) {
        let startIcon = L.icon({
            iconUrl: 'icon/start.png',
            iconAnchor: [16, 37],
            popupAnchor: [0, -37]
        });
        let finishIcon = L.icon({
            iconUrl: 'icon/finish.png',
            iconAnchor: [16, 37],
            popupAnchor: [0, -37]
        });
        let homeIcon = L.icon({
            iconUrl: 'icon/home.png',
            iconSize: [52, 57],
            iconAnchor: [26, 57],
            popupAnchor: [0, -57]
        });
        if (point.properties.type === "base") {
            //console.log("start");
            let marker = L.marker(latlng, {
                riseOnHover: true,
                icon: homeIcon
            });
            marker.bindPopup(`<h3>${point.properties.name}</h3>`);
            marker.on('mouseover', function (e) {
                marker.openPopup();
            });
            marker.on('mouseout', function (e) {
                marker.closePopup();
            });
            return marker
        } else if (point.properties.type === "ausstieg") {
            //console.log("ziel");
            let marker = L.marker(latlng, {
                icon: finishIcon
            });
            marker.bindPopup(`<h3>${point.properties.fclass}</h3>`);
            marker.on('mouseover', function (e) {
                marker.openPopup();
            });
            marker.on('mouseout', function (e) {
                marker.closePopup();
            });
            return marker
        } else {
            let marker = L.marker(latlng, {
                icon: startIcon
            });
            marker.bindPopup(`<h3>${point.properties.fclass}</h3>`);
            marker.on('mouseover', function (e) {
                marker.openPopup();
            });
            marker.on('mouseout', function (e) {
                marker.closePopup();
            });
            return marker
        }
    }
}).addTo(map);

console.log(geojsonFeature.features[3].properties);
console.log(geojsonFeature.features.length);

function displayPoi(data, icon1, icon2, poi, fclass1, fclass2) {
    for (let i = 0; i < data.features.length; i++) {
        const element = data.features[i];

        if (element.properties.fclass === fclass1) {
            L.geoJSON(element, {
                pointToLayer: function (point, latlng) {
                    //console.log("Point", point.properties.fclass);
                    //console.log("latlng", latlng);
                    let myIcon = L.icon({
                        iconUrl: `icon/${icon1}.png`,
                        iconAnchor: [16, 37],
                        popupAnchor: [0, -37]
                    });
                    let marker = L.marker(latlng, {
                        icon: myIcon
                    });
                    marker.bindPopup(`<h3>${point.properties.name} (${point.properties.fclass})</h3>`);
                    marker.on('mouseover', function (e) {
                        marker.openPopup();
                    });
                    marker.on('mouseout', function (e) {
                        marker.closePopup();
                    });
                    return marker
                }
            }).addTo(poi);
        } else if (element.properties.fclass === fclass2) {
            L.geoJSON(element, {
                pointToLayer: function (point, latlng) {
                    //console.log("Point", point.properties.fclass);
                    //console.log("latlng", latlng);
                    let myIcon = L.icon({
                        iconUrl: `icon/${icon2}.png`,
                        iconAnchor: [16, 37],
                        popupAnchor: [0, -37]
                    });
                    let marker = L.marker(latlng, {
                        icon: myIcon
                    });
                    marker.bindPopup(`<h3>${point.properties.name} (${point.properties.fclass})</h3>`);
                    marker.on('mouseover', function (e) {
                        marker.openPopup();
                    });
                    marker.on('mouseout', function (e) {
                        marker.closePopup();
                    });
                    return marker
                }
            }).addTo(poi);
        };
    };
};


// for (let i = 0; i < data.features.length; i++) {
//     const element = data.features[i];

//     if (element.properties.fclass === fclass1) {
//         L.geoJSON(element, {
//             pointToLayer: function (point, latlng) {
//                 //console.log("Point", point.properties.fclass);
//                 //console.log("latlng", latlng);
//                 let myIcon = L.icon({
//                     iconUrl: `icon/${icon1}.png`,
//                     iconAnchor: [16, 37],
//                     popupAnchor: [0, -37]
//                 });
//                 let marker = L.marker(latlng, {
//                     icon: myIcon
//                 });
//                 marker.bindPopup(`<h3>${point.properties.name} (${point.properties.fclass})</h3>`);
//                 marker.on('mouseover', function (e) {
//                     marker.openPopup();
//                 });
//                 marker.on('mouseout', function (e) {
//                     marker.closePopup();
//                 });
//                 return marker
//             }
//         }).addTo(poi);
//     } else if (element.properties.fclass === fclass2) {
//         L.geoJSON(element, {
//             pointToLayer: function (point, latlng) {
//                 //console.log("Point", point.properties.fclass);
//                 //console.log("latlng", latlng);
//                 let myIcon = L.icon({
//                     iconUrl: `icon/${icon2}.png`,
//                     iconAnchor: [16, 37],
//                     popupAnchor: [0, -37]
//                 });
//                 let marker = L.marker(latlng, {
//                     icon: myIcon
//                 });
//                 marker.bindPopup(`<h3>${point.properties.name} (${point.properties.fclass})</h3>`);
//                 marker.on('mouseover', function (e) {
//                     marker.openPopup();
//                 });
//                 marker.on('mouseout', function (e) {
//                     marker.closePopup();
//                 });
//                 return marker
//             }
//         }).addTo(poi);
//     };
// };

displayPoi(data = NIGHT, icon1 = "bar_coktail", icon2 = "dancinghall", poi = overlay.party, fclass1 = "pub", fclass2 = "nightclub");
displayPoi(data = SLEEP_EAT, icon1 = "restaurant", icon2 = "fastfood", poi = overlay.eat, fclass1 = "restaurant", fclass2 = "fastfood");
displayPoi(data = SLEEP_EAT, icon1 = "bar", icon2 = "coffee", poi = overlay.drink, fclass1 = "bar", fclass2 = "cafe");

//displayPoi(data = SLEEP_EAT, icon1 = "bar", icon2 = "dancinghall", poi = poi.//sleep, fclass1 = "hotel", fclass2 = "bed_and_breakfast");

// displayPoi(data = SLEEP_EAT, icon1 = "bar", icon2 = "dancinghall", poi = poi.eat, fclass1 = "restaurant", fclass2 = "fast_food");


for (let i = 0; i < WATER_PICNIC.features.length; i++) {
    const element = WATER_PICNIC.features[i];

    if (element.properties.fclass === "drinking_water") {
        L.geoJSON(element, {
            pointToLayer: function(point, latlng) {
                //console.log("Point", point.properties.fclass);
                //console.log("latlng", latlng);
                let myIcon = L.icon({iconUrl: 'icon/drinkingfountain.png'});
                let marker = L.marker(latlng, {
                    icon: myIcon
                });
                marker.bindPopup(`<h3>${point.properties.fclass}</h3>`);
                return marker
            }
        }).addTo(overlay.drinkingWater);
    };
};   
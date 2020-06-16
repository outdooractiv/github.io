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

let geojsonFeature = "austria_gis_osm_pois_free_1.geojson"

L.geoJSON(geojsonFeature).addTo(map);
let startlayer = L.tileLayer.provider("OpenTopoMap")

let map = L.map("map", {
    center: [47.23, 10.73],
    zoom: 9,
    layers: [
        startlayer
    ]
});
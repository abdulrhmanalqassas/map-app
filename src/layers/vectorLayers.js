import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON.js";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

const sourceLayers = {
  regions: new VectorLayer({
    source: new VectorSource({
      url: "https://openlayers.org/data/vector/ecoregions.json",
      format: new GeoJSON(),
    }),
    // background: "red",
    style: {
      "fill-color": "transparent",
      "stroke-color": "rgba(255, 255, 0, 0.2)",
      "stroke-width": 2,
    },
  }),
  osm: new TileLayer({
    preload: Infinity,
    source: new OSM(),
  }),
  overlay: new VectorLayer({
    source: new VectorSource({
      url: "https://openlayers.org/data/vector/ecoregions.json",
      format: new GeoJSON(),
    }),
    background: "black",
    style: {
      "fill-color": ["string", ["get", "COLOR"], "#eeeeee"],
    },
  }),
};
export default sourceLayers;

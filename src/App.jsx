import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectZoomLevel,
  selectCenterPoint,
  selectMapObject,
} from "./redux/MapSlice";
import "./App.css";
import MapComponent from "./components/map";
import { MapPositionControl } from "./plugins/MapPositionControl";
import ZoomControl from "./plugins/zoomControl.jsx";
import * as ol from "ol";
import LineString from "ol/geom/LineString.js";
import Vector from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import CenterControl from "./plugins/centerControl.jsx";
import { InfoDisplay } from "./plugins/infoDisplay.jsx";
import { MapDrawControl } from "./plugins/mapDrawControl.jsx";
function App() {
  const zoomLevel = useSelector(selectZoomLevel);
  const centerPoint = useSelector(selectCenterPoint);
  const mapObject = useSelector(selectMapObject);

  // const dispatch = useDispatch();

  const mapRef = useRef(null);

  // useEffect(() => {
  //   if (mapObject) {
  //     const routeCoordinates = [
  //       [31.2497, 30.0626], // Cairo (Point A)
  //       [29.9553, 31.2156], // Alexandria (Point B)
  //     ];

  //     // Create a GeoJSON object representing the route
  //     const routeGeoJSON = {
  //       type: "Feature",
  //       geometry: {
  //         type: "LineString",
  //         coordinates: routeCoordinates,
  //       },
  //     };

  //     // Now you can use the routeGeoJSON directly in your OpenLayers code
  //     const routeFeature = new ol.Feature({
  //       geometry: new LineString(routeGeoJSON.geometry.coordinates).transform(
  //         "EPSG:4326",
  //         "EPSG:3857"
  //       ),
  //     });

  //     const vectorLayer = new VectorLayer({
  //       source: new Vector({
  //         features: [routeFeature],
  //       }),
  //       style: new Style({
  //         stroke: new Stroke({
  //           color: "green", // Red line color
  //           width: 5,
  //         }),
  //       }),
  //     });

  //     mapObject.addLayer(vectorLayer);
  //   }
  // }, [mapObject]);
  return (
    <>
      <MapComponent
        center={[centerPoint.x, centerPoint.y]}
        zoom={zoomLevel}
        mapRef={mapRef}
      >
        <InfoDisplay />
        <MapDrawControl />
        <CenterControl />
        <ZoomControl />
        <MapPositionControl />
      </MapComponent>
    </>
  );
}

export default App;

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  zoomIn,
  zoomOut,
  setZoom,
  zoomByValue,
  selectZoomLevel,
  moveCenterX,
  moveCenterY,
  moveCenterByValue,
  selectCenterPoint,
  selectMapObject,
} from "./redux/MapSlice";
import "./App.css";
import MapComponent from "./components/map";
import { MapPositionControl } from "./plugins/MapPositionControl";
import ZoomControl from "./plugins/zoomControl";

function App() {
  const zoomLevel = useSelector(selectZoomLevel);
  const centerPoint = useSelector(selectCenterPoint);
  const mapObject = useSelector(selectMapObject);
  console.log(centerPoint, zoomLevel);
  const dispatch = useDispatch();

  const mapRef = useRef(null);
  const zoomInMap = () => {
    dispatch(zoomIn());
  };

  const zoomOutMap = () => {
    dispatch(zoomOut());
  };
  const handleCenterY = () => {
    dispatch(moveCenterY());
  };

  const handleCenterX = () => {
    dispatch(moveCenterX());
  };
  const handleMoveCenter = (value) => {
    dispatch(moveCenterByValue(value));
  };

  if (mapObject) {
    mapObject.on("moveend", function () {
      var zoom = mapObject.getView().getZoom();
      var zoomInfo = "Zoom level = " + zoom;
      console.log(zoom);
      dispatch(setZoom(zoom));
      document.getElementById("zoomlevel").innerHTML = zoomInfo;
    });
  }

  return (
    <>
      <MapComponent
        center={[centerPoint.x, centerPoint.y]}
        zoom={zoomLevel}
        mapRef={mapRef}
      >
        <div className="card">
          <button style={{ zIndex: 99 }} onClick={zoomInMap}>
            ZOOM IN
          </button>
          {zoomLevel}
          <button style={{ zIndex: 99 }} onClick={zoomOutMap}>
            ZOOM OUT
          </button>
        </div>
        <div className="card">
          <button style={{ zIndex: 99 }} onClick={handleCenterX}>
            CenterX
          </button>
          {centerPoint.x}
          <button style={{ zIndex: 99 }} onClick={handleCenterY}>
            CenterY
          </button>
          {centerPoint.y}
        </div>
        <div className="card">
          <button
            style={{ zIndex: 99 }}
            onClick={() => handleMoveCenter(100000)}
          >
            move by 1000 in X and Y
          </button>
          {centerPoint.x} , {centerPoint.y}
        </div>
        <p id="zoomlevel"></p>
        <ZoomControl />
        <MapPositionControl />
      </MapComponent>
    </>
  );
}

export default App;

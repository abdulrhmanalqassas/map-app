import { useEffect } from "react";
import { Zoom } from "ol/control";
import { useDispatch, useSelector } from "react-redux";
import {
  zoomIn,
  zoomOut,
  setZoom,
  zoomByValue,
  selectZoomLevel,
  selectMapObject,
} from "../redux/MapSlice";
const ZoomControl = () => {
  const zoomLevel = useSelector(selectZoomLevel);
  const mapObject = useSelector(selectMapObject);
  const dispatch = useDispatch();

  const zoomInMap = () => {
    dispatch(zoomIn());
  };

  const zoomOutMap = () => {
    dispatch(zoomOut());
  };
  useEffect(() => {
    if (!mapObject) return;
    mapObject.on("moveend", function () {
      var zoom = mapObject.getView().getZoom();
      var zoomInfo = "Zoom level = " + zoom;
      dispatch(setZoom(zoom));
      document.getElementById("zoomlevel").innerHTML = zoomInfo;
    });
  }, [mapObject]);

  return (
    <div className="card">
      <button onClick={zoomInMap}>ZOOM IN</button>
      {zoomLevel}
      <button onClick={zoomOutMap}>ZOOM OUT</button>
      <p id="zoomlevel"></p>
    </div>
  );
};

export default ZoomControl;

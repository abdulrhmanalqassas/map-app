import { useEffect } from "react";
import { MousePosition } from "ol/control";
import { useSelector } from "react-redux";
import { selectMapObject } from "../redux/MapSlice";

export const MapPositionControl = () => {
  const mapObject = useSelector(selectMapObject);

  useEffect(() => {
    if (!mapObject) return;
    const mousePositionControl = new MousePosition({
      coordinateFormat: (coordinates) =>
        `Latitude: ${coordinates[1].toFixed(
          6
        )}, Longitude: ${coordinates[0].toFixed(6)}`,
      projection: "EPSG:4326",
      className: "custom-mouse-position",
      undefinedHTML: "&nbsp;",
    });

    mapObject.controls.push(mousePositionControl);

    return () => mapObject.controls.remove(mousePositionControl);
  }, [mapObject]);

  return null;
};

export default MapPositionControl;

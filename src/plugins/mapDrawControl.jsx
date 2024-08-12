import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMapObject } from "../redux/MapSlice";
import Draw from "ol/interaction/Draw.js";
import Vector from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
export const MapDrawControl = () => {
  const mapObject = useSelector(selectMapObject);
  const source = new Vector({ wrapX: false });
  const vector = new VectorLayer({
    source: source,
  });
  vector.set("name", "draw_layer");

  const styles = {
    Point: {
      "circle-radius": 5,
      "circle-fill-color": "red",
    },
    LineString: {
      "circle-radius": 5,
      "circle-fill-color": "red",
      "stroke-color": "yellow",
      "stroke-width": 2,
    },
    Polygon: {
      "circle-radius": 5,
      "circle-fill-color": "red",
      "stroke-color": "yellow",
      "stroke-width": 2,
      "fill-color": "blue",
    },
    Circle: {
      "circle-radius": 5,
      "circle-fill-color": "red",
      "stroke-color": "blue",
      "stroke-width": 2,
      "fill-color": "yellow",
    },
  };
  const typeSelect = document.getElementById("type");
  let draw;
  useEffect(() => {
    if (!mapObject) return;
    mapObject.addLayer(vector);
    // global so we can remove it later
    function addInteraction() {
      const value = typeSelect.value;
      if (value !== "None") {
        draw = new Draw({
          source: source,
          type: typeSelect.value,
          style: styles[value],
        });
        mapObject.addInteraction(draw);
      }
      typeSelect.value = "None";
    }
    /**
     * Handle change event.
     **/
    typeSelect.onchange = function () {
      mapObject.removeInteraction(draw);
      addInteraction();
    };
    addInteraction();
  }, [mapObject]);

  let clearMap = () => {
    mapObject
      .getLayers()
      .getArray()
      .slice()
      .forEach((layer, index) => {
        if (layer.get("name") == "draw_layer") {
          const drawLayer = layer.getSource();
          drawLayer.clear();
        }
      });
  };
  return (
    <>
      <div className="row">
        <div className="col-auto">
          <span className="input-group">
            <label className="input-group-text" htmlFor="type">
              Geometry type:
            </label>
            <select className="form-select" id="type">
              <option value="None">None</option>
              <option value="Point">Point</option>
              <option value="LineString">LineString</option>
              <option value="Polygon">Polygon</option>
              <option value="Circle">Circle</option>
            </select>
          </span>
          <button onClick={() => clearMap()}>clear map</button>
        </div>
      </div>
    </>
  );
};

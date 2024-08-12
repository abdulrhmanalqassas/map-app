import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMapObject } from "../redux/MapSlice";
import sourceLayers from "../layers/vectorLayers";
export const InfoDisplay = () => {
  const mapObject = useSelector(selectMapObject);

  const info = document.getElementById("info");

  const displayFixedInfo = (pixel, target) => {
    const feature = target.closest(".ol-control")
      ? undefined
      : mapObject.forEachFeatureAtPixel(pixel, function (feature) {
          return feature;
        });
    const displayInfo = {
      name: feature.get("ECO_NAME"),
      color: feature.get("COLOR"),
      NNH_NAME: feature.get("NNH_NAME"),
      BIOME_NAME: feature.get("BIOME_NAME"),
      REALM: feature.get("REALM"),
    };
    return displayInfo;
  };
  let currentFeature;
  const displayFeatureInfo = function (pixel, target) {
    const feature = target.closest(".ol-control")
      ? undefined
      : mapObject.forEachFeatureAtPixel(pixel, function (feature) {
          return feature;
        });
    if (feature) {
      info.style.left = pixel[0] + 255 + "px";
      info.style.top = pixel[1] + 450 + "px";
      if (feature !== currentFeature) {
        info.style.visibility = "visible";
        info.innerText = feature.get("ECO_NAME");
      }
    } else {
      info.style.visibility = "hidden";
    }
    currentFeature = feature;
  };
  useEffect(() => {
    if (!mapObject) return;
    mapObject.addLayer(sourceLayers.regions);

    mapObject.on("pointermove", function (evt) {
      if (evt.dragging) {
        info.style.visibility = "hidden";
        currentFeature = undefined;
        return;
      } else {
        const pixel = mapObject.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel, evt.originalEvent.target);
      }
    });

    mapObject.on("click", function (evt) {
      const pixel = mapObject.getEventPixel(evt.originalEvent);
      displayFixedInfo(pixel, evt.originalEvent.target);
    });

    /**
     * Handle change event.
     */
  }, [mapObject]);

  return (
    <>
      <div id="info"></div>
      <div id="fixedInfo"> info section tray slider </div>
    </>
  );
};

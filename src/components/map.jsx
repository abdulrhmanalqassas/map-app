import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMap, selectMapObject } from "../redux/MapSlice";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from "ol/interaction.js";
import { FullScreen, defaults as defaultControls } from "ol/control.js";
import { OverviewMap } from "ol/control.js";
function MapComponent({ zoom, center, mapRef, children }) {
  const mapObjectState = useSelector(selectMapObject);
  const dispatch = useDispatch();
  const osmLayer = new TileLayer({
    source: new OSM(),
  });
  const osmLayer2 = new TileLayer({
    source: new OSM(),
  });

  const overviewMapControl = new OverviewMap({
    // see in overviewmap-custom.html to see the custom CSS used
    className: "ol-overviewmap ol-custom-overviewmap",
    layers: [osmLayer2],
    collapseLabel: "\u00BB",
    label: "\u00AB",
    collapsed: false,
  });

  overviewMapControl.setRotateWithView(false);

  useEffect(() => {
    const olMap = new Map({
      controls: defaultControls().extend([
        new FullScreen(),
        overviewMapControl,
      ]),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      layers: [osmLayer],
      view: new View({
        center: center,
        zoom: zoom,
      }),
    });

    olMap.setTarget(mapRef.current);
    dispatch(setMap(olMap));

    return () => olMap.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (!mapObjectState) return;
    mapObjectState?.getView()?.setZoom(zoom);
  }, [zoom]);
  useEffect(() => {
    if (!mapObjectState) return;
    mapObjectState?.getView()?.setCenter(center);
  }, [center]);

  return (
    <div
      ref={mapRef}
      style={{ height: "700px", width: "1000px" }}
      className="map-container"
    >
      <div>
        <label>
          <input type="checkbox" id="rotateWithView" /> Rotate with view
        </label>
      </div>
      {children}
    </div>
  );
}

export default React.memo(MapComponent);

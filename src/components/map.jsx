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
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { OverviewMap } from "ol/control.js";
import GeoJSON from "ol/format/GeoJSON.js";
import sourceLayers from "../layers/vectorLayers";

function MapComponent({ zoom, center, mapRef, children }) {
  const mapObject = useSelector(selectMapObject);
  const mapObjectState = useSelector(selectMapObject);
  const dispatch = useDispatch();
  const osmLayer = sourceLayers.osm;
  const overlayLayer = sourceLayers.overlay;

  const vector2 = new VectorLayer({
    source: new VectorSource({
      url: "https://openlayers.org/data/vector/ecoregions.json",
      format: new GeoJSON(),
    }),
    background: "black",
    style: {
      "fill-color": ["string", ["get", "COLOR"], "#eeeeee"],
    },
  });

  const overviewMapControl = new OverviewMap({
    // see in overviewmap-custom.html to see the custom CSS used
    className: "ol-overviewmap ol-custom-overviewmap",
    layers: [overlayLayer],
    collapseLabel: "\u00BB",
    label: "\u00AB",
    collapsed: false,
  });

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

  ///////////

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

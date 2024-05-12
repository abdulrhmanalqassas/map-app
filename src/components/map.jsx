import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMap, selectMapObject } from "../redux/MapSlice";
import { Feature, Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

function MapComponent({ zoom, center, mapRef, children }) {
  const mapObjectState = useSelector(selectMapObject);

  const dispatch = useDispatch();

  useEffect(() => {
    const osmLayer = new TileLayer({
      source: new OSM(),
    });

    const olMap = new Map({
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
      {children}
    </div>
  );
}

export default React.memo(MapComponent);

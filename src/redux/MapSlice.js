import { createSlice } from "@reduxjs/toolkit";

const zoomSlice = createSlice({
  name: "mapReducer",
  initialState: {
    mapObject: null,
    zoomLevel: 10,
  },
  reducers: {
    zoomIn: (state) => {
      if (state.zoomLevel < 22) state.zoomLevel += 1;
    },
    zoomOut: (state) => {
      if (state.zoomLevel > 1) state.zoomLevel -= 1;
    },
    zoomByValue: (state, action) => {
      console.log("center", parseInt(action.payload));
      state.zoomLevel += parseInt(action.payload);
    },
    setZoom: (state, action) => {
      state.zoomLevel = parseInt(action.payload);
    },
    setMap: (state, action) => {
      state.mapObject = action.payload;
    },
  },
});

const centerPointSlice = createSlice({
  name: "center",
  initialState: {
    centerPoint: { x: 3477142, y: 3509263 },
  },
  reducers: {
    moveCenterX: (state) => {
      state.centerPoint = {
        ...state.centerPoint,
        x: state.centerPoint.x + 100,
      };
    },
    moveCenterY: (state) => {
      state.centerPoint = {
        ...state.centerPoint,
        y: state.centerPoint.y + 100,
      };
    },
    moveCenterByValue: (state, action) => {
      state.centerPoint = {
        x: state.centerPoint.x + action.payload,
        y: state.centerPoint.y + action.payload,
      };
    },
    setCenter: (state, action) => {
      state.centerPoint = {
        x: action.payload[0],
        y: action.payload[1],
      };
    },
  },
});

export const { zoomIn, setZoom, zoomOut, zoomByValue, setMap } =
  zoomSlice.actions;
export const selectZoomLevel = (state) => state.mapReducer.zoomLevel;
export const selectMapObject = (state) => state.mapReducer.mapObject;
export const zoomSliceReducer = zoomSlice.reducer;

export const { moveCenterX, moveCenterY, moveCenterByValue, setCenter } =
  centerPointSlice.actions;
export const selectCenterPoint = (state) => state.center.centerPoint;
export const centerSliceReducer = centerPointSlice.reducer;

// export const { setMap } = mapSlice.actions;
// export const selectMapObject = (state) => state.mapS?.mapObject;
// export const mapSliceReducer = mapSlice.reducer;

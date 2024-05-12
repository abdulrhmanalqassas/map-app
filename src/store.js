import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { zoomSliceReducer, centerSliceReducer } from "./redux/MapSlice";

const rootReducers = combineReducers({
  mapReducer: zoomSliceReducer,
  center: centerSliceReducer,
});
export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

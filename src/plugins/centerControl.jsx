import { useDispatch, useSelector } from "react-redux";
import {
  moveCenterX,
  moveCenterY,
  moveCenterByValue,
  selectCenterPoint,
  selectMapObject,
  setCenter,
} from "../redux/MapSlice";

const centerControl = () => {
  const centerPoint = useSelector(selectCenterPoint);
  const mapObject = useSelector(selectMapObject);

  const dispatch = useDispatch();

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
      var centerVal = mapObject.getView().getCenter();
      var centerInfo = "centerInfo  = " + centerVal;
      dispatch(setCenter(centerVal));
      document.getElementById("centerInfo").innerHTML = centerInfo;
    });
  }
  return (
    <>
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
        <button style={{ zIndex: 99 }} onClick={() => handleMoveCenter(100000)}>
          move by 1000 in X and Y
        </button>
        {centerPoint.x} , {centerPoint.y}
        <p id="centerInfo"></p>
      </div>
    </>
  );
};

export default centerControl;

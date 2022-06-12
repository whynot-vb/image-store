import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { FiRotateCcw } from "react-icons/fi";
import { FiRotateCw } from "react-icons/fi";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const Image = () => {
  let { id } = useParams();
  const [rotation, setRotation] = useState(0);
  const image = useSelector(
    (state) => state.images.images.filter((image) => image._id === id)[0]
  );

  const rotate = () => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };

  const rotateLeft = () => {
    let newRotation = rotation - 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };

  return (
    <>
      <Button component={Link} to="/" size="large">
        <FaHome /> Go Back &nbsp; <BsFillArrowLeftSquareFill />
      </Button>
      <div
        style={{
          width: "100%",
          margin: "100px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input onClick={rotateLeft} type="button" value="<<< Rotate"></input>
        <img
          style={{ transform: `rotate(${rotation}deg)` }}
          src={image?.photo}
          width="75%"
          height="75%"
          alt="img"
        />
        <input onClick={rotate} type="button" value="Rotate >>>" />
      </div>
    </>
  );
};

export default Image;

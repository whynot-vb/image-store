import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { GrUpdate } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

import { PREPARE_TO_UPDATE } from "../constants/actionTypes";
import { getOneImage, deleteImage, getAllImages } from "../actionCreators";

const Images = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const images = useSelector((state) => state.images.images);
  return (
    <Grid container alignItems="stretch" spacing={2} sx={{ marginTop: "20px" }}>
      {images.map((image) => (
        <Grid item key={image._id} xs={6} sm={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: "12px",
              height: "100%",
              position: "relative",
            }}
          >
            <CardMedia
              sx={{
                height: 0,
                paddingTop: "60%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
              image={
                image.photo ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              title={image.name}
            />
            <Typography
              sx={{ padding: "0 16px" }}
              gutterBottom
              variant="h6"
              component="h4"
            >
              {image.name}
            </Typography>
            <Button
              component={Link}
              to={`/image/${image?._id}`}
              color="primary"
              onClick={() => {
                dispatch(getOneImage(image?._id));
              }}
            >
              Click to see the full image
            </Button>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {/* {moment().format(image.createdAt)} */}
                {moment(image.createdAt).format(moment.HTML5_FMT.DATE)}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                padding: "0 16px 8px 16px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  dispatch({ type: PREPARE_TO_UPDATE, payload: image });
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
              >
                <GrUpdate /> Update
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={async () => {
                  await dispatch(deleteImage(image?._id));
                  await dispatch(getAllImages(""));
                }}
              >
                <AiFillDelete /> Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      ;
    </Grid>
  );
};

export default Images;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FileBase from "react-file-base64";
import { FaHome } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

import { createImage, updateImage, getAllImages } from "../actionCreators";

const UploaderForm = () => {
  const dispatch = useDispatch();
  const isUpdating = useSelector((state) => state.images.isUpdating);
  const user = JSON.parse(localStorage.getItem("user"));
  const image = useSelector((state) => state.images.image);
  const [imageData, setImageData] = useState({
    name: "",
    album: "other",
    photo: "",
  });

  const clearValues = () => {
    setImageData({
      name: "",
      album: "other",
      photo: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageData.name || !imageData.photo) {
      alert("You must provide all the values");
    }

    if (!isUpdating) {
      await dispatch(createImage({ ...imageData, creator: user?._id }));
    } else if (isUpdating) {
      await dispatch(updateImage(image?._id, { ...imageData }));
    }
    await dispatch(getAllImages(""));
    clearValues();
  };

  useEffect(() => {
    if (isUpdating) {
      setImageData(image);
    }
  }, [image, isUpdating]);

  return (
    <Paper align="center" sx={{ width: "30%", margin: "auto" }}>
      <Paper
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "90%" },
          width: "100%",
          marginTop: "20px",
          marginBottom: "20px",
          overflow: "hidden",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Upload a new image</Typography>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Image Name"
            type="text"
            name="name"
            value={imageData.name}
            onChange={(e) =>
              setImageData({ ...imageData, name: e.target.value })
            }
          />
        </div>
        <div>
          <FormControl sx={{ m: 1, width: "90%" }}>
            <InputLabel id="demo-simple-select-helper-label">
              Select Album
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Album"
              value={imageData.album}
              onChange={(event) => {
                setImageData({ ...imageData, album: event.target.value });
              }}
            >
              <MenuItem value="other">Other</MenuItem>
              <MenuItem value="family">Family</MenuItem>
              <MenuItem value="partying">Partying</MenuItem>
              <MenuItem value="vacations">Vacations</MenuItem>
              <MenuItem value="work">Work</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Typography variant="h6">Upload Image</Typography>
            <FileBase
              type="file"
              label="Image"
              multiple={false}
              onDone={({ base64 }) =>
                setImageData({ ...imageData, photo: base64 })
              }
            />
          </div>
        </div>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            style={{ width: "90%", marginRight: "10px" }}
          >
            {isUpdating ? "Update job" : "Submit"}
          </Button>
        </div>
      </Paper>
    </Paper>
  );
};

export default UploaderForm;

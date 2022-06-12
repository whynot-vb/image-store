import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";

import { changeAlbum } from "../actionCreators";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Albums() {
  const dispatch = useDispatch();
  const handleClick = (album) => {
    dispatch(changeAlbum(album));
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: "0 auto",
        width: "80%",
      }}
    >
      <Grid container spacing={2}>
        <Grid item sm={2} xs={4}>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => handleClick("")}
          >
            <Typography variant="body2">Show All Images</Typography>
          </Button>
        </Grid>
        <Grid item sm={2} xs={4}>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => handleClick("family")}
          >
            <Typography variant="body2">Family Album</Typography>
          </Button>
        </Grid>
        <Grid item sm={2} xs={4}>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => handleClick("partying")}
          >
            <Typography variant="body2">Party Album</Typography>
          </Button>
        </Grid>
        <Grid item sm={2} xs={4}>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => handleClick("vacations")}
          >
            <Typography variant="body2">Vacation Album</Typography>
          </Button>
        </Grid>
        <Grid item sm={2} xs={4}>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => handleClick("work")}
          >
            <Typography variant="body2">Work Album</Typography>
          </Button>
        </Grid>
        <Grid item sm={2} xs={4}>
          <Button
            variant="contained"
            sx={{ color: "white" }}
            onClick={() => handleClick("other")}
          >
            <Typography variant="body2">Other Images</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

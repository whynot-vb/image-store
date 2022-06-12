import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { FaHome } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useHistory, Link } from "react-router-dom";

import { register, login, getAllImages } from "../actionCreators";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    isMember: false,
  });

  const clearValues = () => {
    setUserData({
      email: "",
      password: "",
    });
  };

  const toggleMember = () => {
    setUserData({ ...userData, isMember: !userData.isMember });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, isMember } = userData;
    if (!email || !password || !isMember) {
      console.log("Please provide all the values");
    }
    const currentUser = { email, password };
    if (!isMember) {
      dispatch(register(currentUser, history));
    } else {
      await dispatch(login(currentUser, history));
    }
    await dispatch(getAllImages(""));
    clearValues();
  };

  useEffect(() => {});

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
        <Button size="large" component={Link} to="/">
          <FaHome /> Go Back &nbsp; <BsFillArrowLeftSquareFill />
        </Button>
        <Typography variant="h6">
          {userData.isMember ? "Login" : "Register"}
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          style={{ width: "52ch", marginBottom: "10px" }}
        >
          Submit
        </Button>
        <Typography variant="body1">
          {userData.isMember ? "Not a member jet?" : "Already a member?"}
          <Button size="small" onClick={toggleMember}>
            {userData.isMember ? "Register" : "Login"}
          </Button>
        </Typography>
      </Paper>
    </Paper>
  );
};

export default Register;

import "./App.css";
import React, { useEffect } from "react";
import { getAllImages, login } from "./actionCreators";
import { useDispatch } from "react-redux";
import ButtonAppBar from "./components/ButtonAppBar";
import UploaderForm from "./components/UploaderForm";
import Register from "./components/Register";
import Images from "./components/Images";
import LoadingSpinner from "./components/LoadingSpinner";
import Error from "./components/Error";
import Image from "./components/Image";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Albums from "./components/Albums";

function App() {
  const isLoading = useSelector((state) => state.images.isLoading);
  const album = useSelector((state) => state.images.album);
  const user = useSelector((state) => state.images.user);
  const dispatch = useDispatch();

  const currentUser = {
    email: "test@gmail.com",
    password: "111222",
  };

  useEffect(() => {
    if (!user) setTimeout(() => dispatch(login(currentUser)), 500);
    setTimeout(() => dispatch(getAllImages(album)), 1200);
  }, [dispatch, album]);

  return (
    <Router>
      <>
        <ButtonAppBar />
        <Switch>
          <Route exact path="/">
            {!isLoading && (
              <>
                <UploaderForm />
                <Albums />
                <Images />
              </>
            )}
            {isLoading && (
              <>
                <LoadingSpinner />
              </>
            )}
          </Route>
          <Route exact path="/auth">
            {!isLoading && <Register />}
            {isLoading && <LoadingSpinner />}
          </Route>
          <Route exact path="/image/:id">
            {!isLoading && <Image />}
            {isLoading && <LoadingSpinner />}
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;

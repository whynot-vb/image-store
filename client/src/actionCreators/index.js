import * as api from "../api";
import {
  OPERATION_USER_BEGIN,
  REGISTER_USER_OK,
  REGISTER_USER_ERROR,
  LOGIN_USER_OK,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  GET_IMAGES_OK,
  GET_IMAGES_FAILED,
  WAITING_TO_FETCH,
  CREATE_IMAGE_OK,
  CREATE_IMAGE_FAILED,
  UPDATE_IMAGE_OK,
  UPDATE_IMAGE_FAILED,
  GET_ONE_IMAGE_OK,
  GET_ONE_IMAGE_FAILED,
  DELETE_IMAGE_OK,
  CHANGE_ALBUM,
} from "../constants/actionTypes";

export const addUserToLocalStorage = ({ user, token }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getAllImages = (album) => async (dispatch, getState) => {
  dispatch({ type: WAITING_TO_FETCH });

  try {
    const { data } = await api.getAllImages(album);

    dispatch({
      type: GET_IMAGES_OK,
      payload: {
        images: data.results,
        totalImages: data.numberOfResults,
      },
    });
  } catch (err) {
    dispatch({ type: GET_IMAGES_FAILED });
  }
};

export const register = (newUser, history) => async (dispatch) => {
  dispatch({ type: OPERATION_USER_BEGIN });
  try {
    const { data } = await api.register(newUser);
    const { user, token } = data;
    await dispatch({ type: REGISTER_USER_OK, payload: { user, token } });
    addUserToLocalStorage({ user, token });
    setTimeout(() => history.push("/"), 1000);
  } catch (error) {
    dispatch({ type: REGISTER_USER_ERROR });
  }
};

export const login = (existingUser, history) => async (dispatch) => {
  dispatch({ type: OPERATION_USER_BEGIN });
  try {
    const { data } = await api.login(existingUser);
    const { user, token } = data;
    await dispatch({ type: LOGIN_USER_OK, payload: { user, token } });
    addUserToLocalStorage({ user, token });
    setTimeout(() => history.push("/"), 1000);
  } catch (error) {
    dispatch({ type: LOGIN_USER_ERROR });
  }
};

export const logout = () => async (dispatch) => {
  await dispatch({ type: LOGOUT_USER });
  removeUserFromLocalStorage();
};

export const getOneImage = (id) => async (dispatch) => {
  try {
    const { data } = await api.getOneImage(id);
    dispatch({ type: GET_ONE_IMAGE_OK, payload: data });
  } catch (error) {
    dispatch({ type: GET_ONE_IMAGE_FAILED });
  }
};

export const updateImage = (id, updatedImage) => async (dispatch) => {
  try {
    const { data } = await api.updateImage(id, updatedImage);
    await dispatch({ type: UPDATE_IMAGE_OK, payload: data });
    // setTimeout(() => history.push("/"), 1000);
  } catch (error) {
    dispatch({ type: UPDATE_IMAGE_FAILED });
  }
};

export const createImage = (image) => async (dispatch) => {
  try {
    const { data } = await api.createImage(image);
    await dispatch({ type: CREATE_IMAGE_OK, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_IMAGE_FAILED });
  }
};

export const deleteImage = (id) => async (dispatch) => {
  try {
    await api.deleteImage(id);
    await dispatch({ type: DELETE_IMAGE_OK, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const changeAlbum = (value) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_ALBUM, payload: value });
  } catch (error) {
    console.log(error);
  }
};

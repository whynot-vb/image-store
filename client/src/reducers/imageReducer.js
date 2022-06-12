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
  PREPARE_TO_UPDATE,
  GET_ONE_IMAGE_OK,
  GET_ONE_IMAGE_FAILED,
  DELETE_IMAGE_OK,
  CHANGE_ALBUM,
} from "../constants/actionTypes";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  updateImageId: "",
  image: {},
  images: [],
  album: "",
  totalImages: 0,
};

export default function imageReducer(state = initialState, action) {
  switch (action.type) {
    case OPERATION_USER_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REGISTER_USER_OK: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LOGIN_USER_OK: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isLoading: false,
        user: null,
        token: null,
      };
    }
    case WAITING_TO_FETCH: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CREATE_IMAGE_OK: {
      return {
        ...state,
        isUpdating: false,
        isLoading: false,
        image: action.payload,
      };
    }
    case CREATE_IMAGE_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case GET_IMAGES_OK: {
      return {
        ...state,
        isUpdating: false,
        isLoading: false,
        images: action.payload.images,
        totalImages: action.payload.totalImages,
      };
    }
    case GET_IMAGES_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case GET_ONE_IMAGE_OK: {
      return {
        ...state,
        isLoading: false,
        showOneImage: true,
        image: action.payload,
      };
    }
    case GET_ONE_IMAGE_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case PREPARE_TO_UPDATE: {
      return {
        ...state,
        isUpdating: true,
        image: action.payload,
      };
    }
    case UPDATE_IMAGE_OK: {
      return {
        ...state,
        image: state.images.find((image) => image._id === action.payload._id),
        images: state.images.map((image) =>
          image._id === action.payload._id ? action.payload : image
        ),
        isLoading: false,
        isUpdating: false,
      };
    }
    case DELETE_IMAGE_OK: {
      return {
        ...state,
        images: state.images.filter((image) => image._id !== action.payload),
      };
    }
    case CHANGE_ALBUM: {
      return {
        ...state,
        album: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

import {
  GET_VIDEOS_SUCCESS,
  ADD_FAV_VIDEO,
  REMOVE_FAV_VIDEO,
} from '../actions/wize-request';

const wizeTubeReducer = (state, action) => {
  switch (action.type) {
    case GET_VIDEOS_SUCCESS: {
      return {
        ...state,
        videos: action.payload,
      };
    }
    case ADD_FAV_VIDEO: {
      return {
        ...state,
        fav: [...state.fav, action.payload],
      };
    }
    case REMOVE_FAV_VIDEO: {
      return {
        ...state,
        fav: [...state.fav.filter((item) => item.id.videoId !== action.payload)],
      };
    }
    default:
      return state;
  }
};

export default wizeTubeReducer;

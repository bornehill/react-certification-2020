import { GET_VIDEOS_SUCCESS } from '../actions/wize-request';

const wizeTubeReducer = (state, action) => {
  switch (action.type) {
    case GET_VIDEOS_SUCCESS: {
      return {
        ...state,
        videos: action.payload,
      };
    }
    default:
      return state;
  }
};

export default wizeTubeReducer;

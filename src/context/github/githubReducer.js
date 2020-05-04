/* eslint-disable no-unused-vars */
import {
  SEARCH_USERS,
  SET_LOADING,
  CLAER_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLAER_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };

    case GET_USER: {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    }

    case GET_REPOS: {
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    }

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    default:
      return state;
  }
};

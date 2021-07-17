import { GET_BOOKS } from "../actions/Types";

const initialState = {
  bookList: [],
};

export function bookReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        bookList: action.payload,
      };

    default:
      return state;
  }
}

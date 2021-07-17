import axios from "axios";
import { GET_BOOKS } from "./Types";

export const getBookList = (page, itemsPerPage, cb) => (dispatch) => {
  const bookUrl = "http://nyx.vima.ekt.gr:3000/api/books";

  const options = {
    method: "post",
    url: bookUrl,
    data: { page: page, itemsPerPage: itemsPerPage, filters: [] },
  };
  axios(options)
    .then((res) => res.data)
    .then((data) => {
      if (data) {
        dispatch({
          type: GET_BOOKS,
          payload: data,
        });
      }
      cb(true);
    })
    .catch((error) => {
      if (error) {
        cb(false);
      }
    });
};

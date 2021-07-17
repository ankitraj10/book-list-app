import React, { Component } from "react";

import { connect } from "react-redux";
import { getBookList } from "../actions/BookAction";
import history from "../Utils/history";
import loader from "../assets/loader/1.gif";
import TemplateErrorBoundary from "../errorBoundries/TemplateErrorBoundry";
import Pagination from "./Pagination";
// import {pa} from "react-bootstrap"

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      itemsPerPage: 10,
      loading: false,

      pageOfItems: [],
    };
  }

  componentDidMount() {
    const { getBookList } = this.props;
    const { page, itemsPerPage } = this.state;

    const searchParam = window.location.search ? window.location.search : "";
    const currLocation =
      searchParam.length > 0 ? this.getJsonFromUrl(searchParam) : {};
    const pageNumber = currLocation.page ? currLocation.page : page;
    this.setState({ page: pageNumber, loading: true });
    getBookList(pageNumber, itemsPerPage, this.getBookListRes);
  }

  getBookListRes = (data) => {
    this.setState({ loading: false });
  };

  getJsonFromUrl = (url) => {
    if (!url) url = this.props.location.search;
    var query = url.substr(1);
    var result = {};
    query.split("&").forEach(function (part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  };

  renderBookList = (bookData) => {
    return bookData.map((bookItem, index) => {
      return (
        <tr key={bookItem.id}>
          <th scope="row">{bookItem.id}</th>
          <td>{bookItem.book_author[0]}</td>
          <td>{bookItem.book_title}</td>
          <td>@{bookItem.book_publication_year}</td>
        </tr>
      );
    });
  };

  handlePagination = (num) => {
    const { page, itemsPerPage } = this.state;
    const { getBookList } = this.props;
    if (num != page && num > 0) {
      history.push({
        search: `?page=${num}`,
      });
      getBookList(num, itemsPerPage, this.getBookListRes);
      this.setState({ page: num });
    }
  };
  onChangePage(pageOfItems) {
    // update state with new page of items
    // this.setState({ pageOfItems: pageOfItems });
  }
  render() {
    const { bookList } = this.props;
    const { page, loading } = this.state;
    const bookListInfo =
      Object.keys(bookList).length > 0 && bookList.books ? bookList.books : [];
    const count =
      Object.keys(bookList).length > 0 && bookList.count ? bookList.count : 0;
    var totalCount = [...Array(count).keys()].map((i) => ({
      id: i + 1,
      name: "Item " + (i + 1),
    }));
    if (!loading) {
      return (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Author</th>
                <th scope="col">Book Title</th>
                <th scope="col"> Year</th>
              </tr>
            </thead>
            <tbody>{this.renderBookList(bookListInfo)}</tbody>
          </table>
          <TemplateErrorBoundary>
            <Pagination
              items={totalCount}
              onChangePage={this.onChangePage}
              handlePageClick={this.handlePagination}
            />
          </TemplateErrorBoundary>
        </div>
      );
    } else {
      return (
        <div className="loader">
          <img src={loader} style={{ margin: "0px auto 0px auto" }} />
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  bookList: state.bookReducer.bookList,
});
export default connect(mapStateToProps, { getBookList })(BookList);

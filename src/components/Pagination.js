import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }
  componentWillMount() {
    const searchParam = window.location.search ? window.location.search : "";
    const currLocation =
      searchParam.length > 0 ? this.getJsonFromUrl(searchParam) : {};
    const pageNumber = currLocation.page ? currLocation.page : 1;
    if (pageNumber) {
      this.setPage(Number(pageNumber));
    }
  }
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
  setPage = (page) => {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    pager = this.getPager(items.length, page);

    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    this.setState({ pager: pager }, () => {
      this.res(this.state.pager.currentPage);
    });
  };
  res = (page) => {
    this.props.handlePageClick(page);
  };
  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;

    pageSize = pageSize || 10;

    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    var pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  }
  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <ul className="pagination justify-content-end">
        <li
          className={
            pager.currentPage === 1 ? "page-item disabled" : "page-item"
          }
        >
          <a onClick={() => this.setPage(1)} className="page-link">
            First
          </a>
        </li>
        <li className={pager.currentPage === 1 ? " page-item disabled" : ""}>
          <a
            onClick={() => this.setPage(pager.currentPage - 1)}
            className="page-link"
          >
            Previous
          </a>
        </li>
        {pager.pages.map((page, index) => (
          <li
            key={index}
            className={
              pager.currentPage === page ? "active page-item" : "page-item"
            }
          >
            <a
              onClick={() => {
                this.setPage(page);
              }}
              className="page-link"
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            pager.currentPage === pager.totalPages
              ? "page-item disabled"
              : "page-item"
          }
        >
          <a
            onClick={() => this.setPage(pager.currentPage + 1)}
            className="page-link"
          >
            Next
          </a>
        </li>
        <li
          className={
            pager.currentPage === pager.totalPages
              ? "page-item disabled"
              : "page-item"
          }
        >
          <a
            onClick={() => this.setPage(pager.totalPages)}
            className="page-link"
          >
            Last
          </a>
        </li>
      </ul>
    );
  }
}

export default Pagination;

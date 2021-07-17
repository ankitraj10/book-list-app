import React, { Component } from "react";
import BookList from "./components/BookList";
import TemplateErrorBoundary from "./errorBoundries/TemplateErrorBoundry";
export class App extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h1 className="display-4 text-center">
          <i className="fa fa-book-open text-primary"></i>My
          <span className="text-primary">Book</span>List
        </h1>
        <TemplateErrorBoundary>
          <BookList />
        </TemplateErrorBoundary>
      </div>
    );
  }
}

export default App;

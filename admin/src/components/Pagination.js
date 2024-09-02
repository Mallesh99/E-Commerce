import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const nPages = props.nPages;
  const currentPage = props.currentPage;
  const setCurrentPage = props.setCurrentPage;
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav>
      <ul
        className="pagination justify-content-center fontsato "
        style={{ fontWeight: "600" }}
      >
        <li className="page-item">
          <Link
            className="page-link "
            onClick={goToPrevPage}
            style={{ color: "black" }}
          >
            Previous
          </Link>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? "active" : ""} `}
          >
            <Link
              onClick={() => {
                setCurrentPage(pgNumber);
                return window.scrollTo(0, 0);
              }}
              style={{ color: "black" }}
              className="page-link"
            >
              {pgNumber}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link
            className="page-link"
            style={{ color: "black" }}
            onClick={() => {
              goToNextPage();
              return window.scrollTo(0, 0);
            }}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

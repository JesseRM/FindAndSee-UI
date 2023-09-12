"use client";

import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <nav
      className={`${styles["navbar-custom"]} navbar navbar-expand-lg navbar-dark`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Find & See
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Submit
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                My Likes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                My Finds
              </a>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-primary">
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
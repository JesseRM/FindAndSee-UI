"use client";

import styles from "../styles/NavBar.module.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "authConfig";

const NavBar = () => {
  const { instance, accounts } = useMsal();
  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
  };

  return (
    <nav
      className={`${styles["navbar-custom"]} navbar navbar-expand-lg navbar-dark`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
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
              <a
                className="nav-link active"
                aria-current="page"
                href="/find/submit"
              >
                Submit
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/mylikes">
                My Likes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/myfinds">
                My Finds
              </a>
            </li>
            <li className="nav-item">
              <AuthenticatedTemplate>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogoutRedirect}
                >
                  Logout
                </button>
              </AuthenticatedTemplate>
              <UnauthenticatedTemplate>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLoginRedirect}
                >
                  Login
                </button>
              </UnauthenticatedTemplate>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

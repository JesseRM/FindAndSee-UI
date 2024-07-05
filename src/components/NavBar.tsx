"use client";

import styles from "../styles/NavBar.module.css";
import { FaCameraRetro } from "react-icons/fa";
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
        <a
          className={`${styles["freckle-face-regular"]} navbar-brand fs-4`}
          href="/"
        >
          <FaCameraRetro className="me-3" />
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
            <AuthenticatedTemplate>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {accounts[0] ? accounts[0].idTokenClaims?.name : ""}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li
                    className="dropdown-item"
                    role="button"
                    onClick={handleLogoutRedirect}
                  >
                    Logout
                  </li>
                </ul>
              </li>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLoginRedirect}
                >
                  Login
                </button>
              </li>
            </UnauthenticatedTemplate>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

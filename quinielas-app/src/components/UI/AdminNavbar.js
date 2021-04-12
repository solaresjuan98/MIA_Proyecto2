import React from "react";
import '../../index.css';
import { AdminDashboard } from "../Admin/AdminDashboard";

export const AdminNavbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href={() => false}>
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href={() => false}>
                Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href={() => false}>
                Data
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href={() => false}>
                Reports
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href={() => false}>
                About
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href={() => false}
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href={() => false}>
                  Action
                </a>
                <a class="dropdown-item" href={() => false}>
                  Another action
                </a>
                <a class="dropdown-item" href={() => false}>
                  Something else here
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href={() => false}>
                  Separated link
                </a>
              </div>
            </li>
          </ul>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
          <span className="nav-item nav-link text-info">USERNAME</span>
          <button
            className="nav-item nav-link btn"
          >
            Logout
          </button>
        </ul>
      </div>
        </div>
      </nav>
    
    <AdminDashboard />
    </div>
  );
};

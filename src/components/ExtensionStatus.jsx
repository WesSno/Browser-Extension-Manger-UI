import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

function Status({ setFilter, filter }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="extension">
      <div className="status-bar">
        <h1 className={`status-title ${theme}`}>Extensions List</h1>
        <ul>
          <li>
            <button
              className={`button ${theme} ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={`button ${theme} ${
                filter === "active" ? "active" : ""
              }`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={`button ${theme} ${
                filter === "inactive" ? "active" : ""
              }`}
              onClick={() => setFilter("inactive")}
            >
              Inactive
            </button>
          </li>
          <li>
            <button
              className={`button ${theme} ${
                filter === "removed" ? "active" : ""
              }`}
              onClick={() => setFilter("removed")}
            >
              Removed
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Status;

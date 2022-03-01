import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav">
      <ul>
        <Link to="/">Store App</Link>
        <div>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Nav;

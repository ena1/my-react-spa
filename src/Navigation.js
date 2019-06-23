import React, { Component } from "react";
import { FaUsers } from "react-icons/fa";
import { Link } from "@reach/router";

class Navigation extends Component {
  render() {
    const { user, logOutUser } = this.props;
    return (
      <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
        <div className="container-fluid">
          <Link
            to="/personal-projects/meeting-log-spa/"
            className="navbar-brand"
          >
            <FaUsers className="mr-1" />
            Meeting Log
          </Link>
          <div className="navbar-nav ml-auto">
            {user && (
              <Link className="nav-item nav-link" to="/personal-projects/meeting-log-spa/meetings">
                Meetings
              </Link>
            )}
            {!user && (
              <Link className="nav-item nav-link" to="/personal-projects/meeting-log-spa/login">
                Log In
              </Link>
            )}
            {!user && (
              <Link className="nav-item nav-link" to="/personal-projects/meeting-log-spa/register">
                Register
              </Link>
            )}
            {user && (
              <Link
                className="nav-item nav-link"
                to="/personal-projects/meeting-log-spa/login"
                onClick={e => logOutUser(e)}
              >
                Log Out
              </Link>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;

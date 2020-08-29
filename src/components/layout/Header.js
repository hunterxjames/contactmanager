import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const { branding } = props;
  return (
    <nav
      className="navbar navbar-expand-sm 
        navbar-dark 
        bg-danger mb-3 py-0"
    >
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

//default properties
Header.defaultProps = {
  branding: "My App",
};

//Validation
Header.propTypes = {
  //making sure that branding is string
  branding: PropTypes.string.isRequired,
};

// const headingStyle = {
//      color: 'Green'
// }

export default Header;

import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '_store';
import {
  faHome,
  faUser,
  faDollarSign,
  faInfoCircle,
  faEnvelope,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactLogo from './react-logo.png'; // Import your React logo image

export { Nav };

function Nav() {
  const auth = useSelector((x) => x.auth.value);
  const dispatch = useDispatch();
  const logout = () => dispatch(authActions.logout());

  const BackgroundColor = {
    backgroundColor: "#e3f2fd" // Use the color code for blue lighten-3
  };
  
  // Custom CSS styles for text color and border color
  const customStyles = {
    textColor: {
      color: '#2196f3', // Text color
    },
    borderColor: {
      borderColor: '#2196f3', // Border color
    },
  };

  // Only show nav when logged in
  if (!auth) return null;

  return (
    <nav className="navbar navbar-expand navbar-primary px-3" style={BackgroundColor}>
      <div className="container">
        {/* Left side */}
        <div className="navbar-nav">
          {/* React Logo */}
          <div className="nav-item col-auto">
            <NavLink to="/" className="nav-link">
              <img
                src={ReactLogo}
                alt="React Logo"
                className="react-logo"
                style={{ width: '25px', height: 'auto' }} // Control the logo size
              />
            </NavLink>
          </div>
          <NavLink to="/users" className="nav-item nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/home" className="nav-item nav-link" style={customStyles.textColor}>
            My Profile
          </NavLink>
          <NavLink to="/pricing" className="nav-item nav-link" style={customStyles.textColor}>
            Pricing
          </NavLink>
          <NavLink to="/about" className="nav-item nav-link" style={customStyles.textColor}>
            About
          </NavLink>
          <NavLink to="/contact" className="nav-item nav-link" style={customStyles.textColor}>
            Contact Us
          </NavLink>
        </div>

        {/* Right side */}
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={customStyles.textColor}
          />
          <button className="btn btn-light" type="submit" style={customStyles.borderColor}>
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

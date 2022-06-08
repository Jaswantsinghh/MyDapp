import { NavLink } from "react-router-dom";
import "../../Styles/Homepage/Navbar.css";

function Navbar() {

    const handleLogout = (e) => {
        localStorage.removeItem("key");
    }
    return(
        <div className="Navbar">
            <div className="Navbar-logo">MyCol</div>
            <div className="Navbar-buttons">
                <div className="Navbar-button">
                    <NavLink className="Navbar-button" to="/">Home</NavLink>
                </div>
                <div className="Navbar-button">
                    <NavLink className="Navbar-button" to="/college">College</NavLink>
                </div>
                <div className="Navbar-button">
                    <NavLink className="Navbar-button" to="/event">Event</NavLink>
                </div>
                <div className="Navbar-button">
                    <NavLink onClick={handleLogout} className="Navbar-button" to="/signin">Log Out</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
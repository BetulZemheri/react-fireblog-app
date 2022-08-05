import React from "react";
import "./Navbar.css";
import cw from "../assets/cw.jpeg";
import { useNavigate } from "react-router-dom";
import { logOut } from "../helpers/firebase";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleNewBlog = () => {
    navigate("/newblog");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleDashboard = () => {
    navigate("/");
  };
 
  return (
    <div className="navbar">
      <img src={cw} alt="cwlogo" className="cwimage" />
      <div className="headingmiddle">
        <div className="leftandright" style={{ marginLeft: "9.5rem" }}></div>
        <h1 style={{ color: "#ffffff", cursor: "pointer", fontFamily : "Girassol" }}
          onClick={handleDashboard}>
          BetulZemheriBlog
        </h1>
        <div className="leftandright"></div>
      </div>

      <div className="userrighttop">
        <div style={{ display: "flex" }}>
          {currentUser ? (
            <div className="person">
              < AccountCircleIcon style={{color : "white"}}/>
              <h4 style={{ color: "white" }}>{currentUser.displayName}</h4>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-light "
              onClick={handleLogin}
              style={{ marginRight: "1rem", fontSize:"20px"}}>
              LOGIN
            </button>
          )}
          {currentUser && (
            <DropdownButton
              id="dropdown-basic-button"
              title="SETTINGS"
              variant="Black"
              className="btn btn-light"
              style={{ marginLeft: "1rem", marginRight:"2rem"}}
            >
              <Dropdown.Item onClick={handleProfile}>PROFILE</Dropdown.Item>
              <Dropdown.Item onClick={handleNewBlog}>NEW</Dropdown.Item>
              <Dropdown.Item onClick={() => logOut(navigate("/"))}>LOG OUT</Dropdown.Item>
            </DropdownButton>
          )}

          {!currentUser && (
            <button
              type="button"
              className="btn btn-light "
              onClick={handleRegister}
              style={{ marginLeft: "0.5rem", marginRight: "2rem",fontSize:"20px" }}>REGISTER
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;


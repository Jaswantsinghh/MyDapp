import Navbar from "./Homepage/Navbar";
import Main from "./Homepage/Main";
import "../Styles/Homepage.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Homepage() {

    let navigate = useNavigate();
    useEffect(() => {
        const key = localStorage.getItem("key");
        if(!key || key?.length < 1) {
          navigate("/signin", { replace: true })
        }
      }, []);
    return(
        <div className="Homepage">
            <Navbar />
            <Main />
        </div>
    );
}

export default Homepage;
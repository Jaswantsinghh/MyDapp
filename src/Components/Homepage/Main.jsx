import CollegePic from "../../Images/college.jpg";
import "../../Styles/Homepage/Main.css"
function Main() {
    return(
        <>
        <div className="Main">
            <div className="Main-left">
                Welcome to MyCol
            </div>
            <img className="Main-right" src={CollegePic} />
        </div>
        <div className="main-text">
                <h1 className="main-heading">A single platform where you can find all information regarding your college.</h1>
        </div>
        </>
    );
}

export default Main;
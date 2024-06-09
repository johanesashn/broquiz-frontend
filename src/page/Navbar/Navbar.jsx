import GreyHome from "/greyHome.png"
import GreyLeaderboard from "/greyLeaderboard.png"
import WhiteLogout from "/whiteLogout.png"
import GreyProfile from "/greyProfile.png"
import GreyAdd from "/greyAdd.png"
import GreyQuiz from "/greyQuiz.png"
import BlueHome from "/blueHome.png"
import BlueLeaderboard from "/blueLeaderboard.png"
import BlueProfile from "/blueProfile.png"
import BlueQuiz from "/blueQuiz.png"
import BlueAdd from "/blueAdd.png"
import Icon from "/icon.png"
import "./navbar.css"
import { useState } from "react"

export default function Navbar(props){
    const [showedNav, setShowedNav] = useState(false)

    return (
        <nav className={`shadow ${showedNav ? "showed-nav" : ""}`}>
            <div className="nav-phone">
                <div className="nav-phone--header">
                    <img src={Icon} alt="" />
                    <h3>{props.loginUser.username !== undefined ? props.loginUser.username.split(" ")[0] : ""}</h3>
                </div>
                <div 
                    type="button"
                    className={`show-nav ${showedNav ? "active" : ""}`}
                    onClick={() => setShowedNav(!showedNav)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <h2 className="nav-title">{props.loginUser.username !== undefined ? props.loginUser.username.split(" ")[0] : ""}</h2>
            <ul>
                <li 
                    onClick={() => props.setMenu({
                        home: true,
                        quiz: false,
                        profile: false,
                        leaderboard: false,
                        makeQuiz: false
                    })}
                    className={props.menu.home && "active"}
                >
                    <img src={props.menu.home ? BlueHome : GreyHome} alt="" />
                    <p>Home</p>
                </li>
                <li
                    onClick={() => props.setMenu({
                        home: false,
                        quiz: true,
                        profile: false,
                        leaderboard: false,
                        makeQuiz: false
                    })}
                    className={props.menu.quiz && "active"}
                >
                    <img src={props.menu.quiz ? BlueQuiz : GreyQuiz} alt="" />
                    <p>Join Quiz</p>
                </li>
                <li
                    onClick={() => props.setMenu({
                        home: false,
                        quiz: false,
                        profile: false,
                        leaderboard: false,
                        makeQuiz: true
                    })}
                    className={props.menu.makeQuiz && "active"}
                >
                    <img src={props.menu.makeQuiz ? BlueAdd : GreyAdd} alt="" />
                    <p>Make Quiz</p>
                </li>
                <li
                    onClick={() => props.setMenu({
                        home: false,
                        quiz: false,
                        profile: false,
                        leaderboard: true,
                        makeQuiz:false
                    })}
                    className={props.menu.leaderboard && "active"}
                >
                    <img src={props.menu.leaderboard ? BlueLeaderboard : GreyLeaderboard} alt="" />
                    <p>Leaderboard</p>
                </li>
                <li
                    onClick={() => props.setMenu({
                        home: false,
                        quiz: false,
                        profile: true,
                        leaderboard: false,
                        makeQuiz: false
                    })}
                    className={props.menu.profile && "active"}
                >
                    <img src={props.menu.profile ? BlueProfile : GreyProfile} alt="" />
                    <p>Profile</p>
                </li>
            </ul>
            <div
                onClick={() => {
                    props.setLogout(true)
                }}
                className="logout"
            >
                <img src={WhiteLogout} alt="" />
                <p>Logout</p>
            </div>
        </nav>
    )
}
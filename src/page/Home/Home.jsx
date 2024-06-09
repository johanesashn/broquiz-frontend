import Blob from "/blob.svg"
import Blob2 from "/blob2.svg"
import Blob3 from "/blob3.svg"
import "./home.css"

export default function Home(props){
    return (
        <div className="home">
            {/* <img className="blob" src={Blob} alt="" /> */}
            {/* <img className="blob" src={Blob2} alt="" /> */}
            {/* <img className="blob" src={Blob3} alt="" />
            <img className="blob" src={Blob3} alt="" />
            <img className="blob" src={Blob2} alt="" /> */}
            <div className="home-content shadow">
                <h1>BROQUIZ</h1>
                <p>Explore a wide range of quiz categories and discover how smart you really are.</p>
                <div className="menu-btn">
                    <button 
                        onClick={() => props.setMenu({
                            home: false, 
                            quiz: true,
                            profile: false,
                            leaderboard: false, 
                            makeQuiz: false
                        })}
                    >Join Quiz</button>
                    <button
                        onClick={() => props.setMenu({
                            home: false, 
                            quiz: false,
                            profile: false,
                            leaderboard: false, 
                            makeQuiz: true
                        })}     
                    >Make Quiz</button>
                </div>
            </div>
        </div>
    )
}
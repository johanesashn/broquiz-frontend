import { useNavigate } from "react-router-dom"
import "./notification.css"

export default function Warning(props) {
    const navigate = useNavigate()

    const proceed = (func) => {
        navigate('/')
        func(false)
        props.setMenu({
            home: true, 
            quiz: false,
            profile: false,
            leaderboard: false, 
            makeQuiz: false
        })
    }

    return <div className="notification">
        <div className="notification-content">
            <p>{props.description}</p>
            <div className="notification-actions">
                <button 
                    className="notification-button primary"
                    onClick={() => proceed(props.func)}
                >Proceed</button>
                <button 
                    className="notification-button danger"
                    onClick={() => props.func(false)}
                >Cancel</button>
            </div>
        </div>
    </div>
}
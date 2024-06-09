import { useNavigate } from "react-router-dom"
import "./notification.css"

export default function DeleteAccount(props) {
    const navigate = useNavigate()

    const proceed = async () => {
        navigate('/')
        props.func2()
    }

    return <div className="notification">
        <div className="notification-content">
            <p>{props.description}</p>
            <div className="notification-actions">
                <button 
                    className="notification-button primary"
                    onClick={() => proceed()}
                >Proceed</button>
                <button 
                    className="notification-button danger"
                    onClick={() => props.func(false)}
                >Cancel</button>
            </div>
        </div>
    </div>
}
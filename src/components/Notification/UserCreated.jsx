import "./notification.css"

export default function UserCreated(props) {
    const proceed = () => {
        props.setCreateAccountSuccess(false)
        window.location.reload()
    }

    return <div className="notification">
        <div className="notification-content">
            <p>{props.description}</p>
            <div className="notification-actions">
                <button 
                    className="notification-button primary"
                    onClick={proceed}
                >Proceed</button>
            </div>
        </div>
    </div>
}
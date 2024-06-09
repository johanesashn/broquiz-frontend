import "./notification.css"

export default function Proceed(props) {
    const proceed = (func) => {
        func(false)
        if (props.func2){
            props.func2([])
        }
    }

    return <div className="notification">
        <div className="notification-content">
            <p>{props.description}</p>
            <div className="notification-actions">
                <button 
                    className="notification-button primary"
                    onClick={() => proceed(props.func)}
                >Proceed</button>
            </div>
        </div>
    </div>
}
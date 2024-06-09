import { useEffect, useRef } from "react"
import "./notification.css"

export default function Input(props) {
    const input = useRef()

    useEffect(() => {
        input.current.focus()
    }, [])

    const proceed = () => {
        if (props.questionId !== ""){
            props.setStartOnline(true)
            props.setJoinQuiz(false)
        }
    }

    return <div className="notification">
        <div className="notification-content">
            <p>{props.description}</p>
            <form action="">
                <input 
                    ref={input}
                    type="text" 
                    placeholder="question id"
                    value={props.questionId}
                    onChange={(e) => props.setQuestionId(e.target.value)}
                    required
                />
                <br />
                <div className="actions">
                    <button 
                        type="submit"
                        className="notification-button primary"
                        onClick={() => proceed()}
                    >Continue</button>
                    <button 
                        type="button"
                        className="danger"
                        onClick={() => props.setJoinQuiz(false)}
                    >Cancel</button>
                </div>
            </form>
            <div className="notification-actions">
            </div>
        </div>
    </div>
}
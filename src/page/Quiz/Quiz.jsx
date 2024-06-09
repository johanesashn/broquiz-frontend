import Blob2 from "/blob2.svg"
import "./quiz.css"
import Welcome from "../../components/Welcome/Welcome"
import Loader from "../../components/Loader/Loader"
import Questions from "../../components/Questions/Questions"
import { useEffect, useState } from "react"
import Proceed from "../../components/Notification/Proceed"

export default function Quiz(props){
    const [startOnline, setStartOnline] = useState(false)
    const [joinQuiz, setJoinQuiz] = useState(false)
    const [questionId, setQuestionId] = useState("")
    const [notValid, setNotValid] = useState(false)
    const [cantJoin, setCantJoin] = useState(false)
    const [onlineCategory, setOnlineCategory] = useState("")
    const [owner, setOwner] = useState("")

    useEffect(() => {
        if (startOnline){
            const showedQuestion = props.onlineQuestions.filter(question => question.id === questionId)
            if (showedQuestion.length > 0 && questionId !== ""){
                if (showedQuestion[0].owner === props.loginUser.username) {
                    setCantJoin(true)
                } else {
                    props.setQuestions(showedQuestion[0].questions)
                    setOwner(showedQuestion[0].owner)
                    setOnlineCategory(showedQuestion[0].category)
                }
            } else if (questionId !== ""){
                setNotValid(true)
            }
        }

        setQuestionId("")
    }, [startOnline, joinQuiz])

    return (
        <div className="quiz">
            {/* <img className="blob" src={Blob2} alt="" /> */}
            <div className="quiz-container">
                {props.load && <Loader/>}
                {
                    cantJoin
                        &&
                    <Proceed
                        func={setCantJoin}
                        description="You Can't Join Your Own Quiz"
                    />
                }
                {
                    notValid    
                        &&
                    <Proceed
                        func={setNotValid}
                        description={"Question Id Is Not Valid"}
                    />
                }
                {
                    props.questions.length === 0 
                        &&
                    <Welcome
                        setQuestions={props.setQuestions}
                        setFindQuestion={props.setFindQuestion}
                        questions={props.questions}
                        joinQuiz={joinQuiz}
                        setJoinQuiz={setJoinQuiz}
                        questionId={questionId}
                        setQuestionId={setQuestionId}
                        setStartOnline={setStartOnline}
                    />
                }
                {
                    props.questions.length > 0 
                        && 
                    <Questions
                        questions={props.questions}
                        setLoad={props.setLoad}
                        setQuestions={props.setQuestions}
                        setFindQuestion={props.setFindQuestion}
                        findQuestion={props.findQuestion}
                        menu={props.menu}
                        loginUser={props.loginUser}
                        owner={owner}
                        onlineCategory={onlineCategory}
                    />
                }
            </div>
        </div>
    )
}
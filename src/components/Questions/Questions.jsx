import { useEffect, useState } from "react"
import Proceed from "../Notification/Proceed"
import True from "/true.png"
import False from "/false.png"
import "./questions.css"
import axios from "axios"

export default function Questions (props){
    const [category, setCategory] = useState(null)
    const [score, setScore] = useState(0)
    const [submit, setSubmit] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [allChecked, setAllChecked] = useState(false)

    useEffect(() => {
        if (props.questions.length > 0) {
            setCategory(props.questions[0].category)
        }
    }, [props.questions])

    const getChoice = (index) => {
        return String.fromCharCode(97 + index)
    }

    const getStatus = (points) => {
        if (points < 200){
            return "Novice"
        } else if (points < 500){
            return "Beginner"
        } else if (points < 1000){
            return "Learner"
        } else if (points < 2000){
            return "Educated"
        } else if (points < 5000){
            return "Intelligent"
        } else if (points < 10000){
            return "Wise"
        } else {
            return "Genius"
        }
    }

    const chooseQuestion = (choice, id) => {
        props.setQuestions(props.questions.map(question => {
            if (question.id === id){
                const updatedQuestion = {
                    ...question,
                    checked: true,
                    selected: choice,
                    result: choice === question.correct_answer ? true : false
                }
                return updatedQuestion
            } else {
                return question
            }
        }))
    }

    const submitQuiz = async () => {
        const unSelected = props.questions.filter(question => question.selected === null)
        setAllChecked(unSelected.length === 0)
        if (unSelected.length === 0){
            const trueSelected = props.questions.filter(question => question.correct_answer === question.selected)
            const updatedScore = trueSelected.length
            const currentPoint = updatedScore + props.loginUser.points

            setScore(updatedScore)
            setSubmit(true)

            const response = await axios.patch(`https://backend-broquiz-production-f1f5.up.railway.app/users/${props.loginUser._id}`, {
                ...props.loginUser, 
                points: currentPoint,
                status: getStatus(currentPoint)
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log(response.data)
        } else {
            console.log("must be selected all")
            setEmpty(true)
        }
        console.log(props.questions)
    }

    const getChoiceClass = (question, choice) => {
        if (submit){
            if (question.result && question.selected === choice){
                return "choice-true"
            } else if (!question.result) {
                if (question.selected === choice){
                    return "choice-false"
                } else if (question.correct_answer === choice){
                    return "choice-true"
                }
            }
        } else {
            return question.selected === choice ? "selected" : ""
        }
    }

    const questionsElement = () => {
        if (props.questions.length > 0){          
            return props.questions.map((question, questionIndex) => {
                return (
                    <li key={question.id} className="question shadow">
                        {
                            allChecked === true
                                && 
                            question.result
                                &&
                            <img src={True} alt="" className="question-result"/>
                        }
                        {
                            allChecked === true
                                && 
                            !question.result
                                &&
                            <img src={False} alt="" className="question-result"/>   
                        }
                        <p dangerouslySetInnerHTML={{ __html: (questionIndex + 1) + ". " + question.question }}/>
                        <div className="choices">
                            {question.choices.map((choice, index) => (
                                <div 
                                    // className={question.selected === choice ? "choice selected" : "choice"} 
                                    className={`choice ${getChoiceClass(question, choice)}`} 
                                    key={index}
                                    onClick={() => chooseQuestion(choice, question.id)}
                                >
                                    <button className="choice-btn">{getChoice(index)}</button>
                                    <p key={index} dangerouslySetInnerHTML={{ __html: choice }}/>
                                </div>
                            ))}
                        </div>
                    </li>
                )
            })
        }
    }

    return (
        <div className="questions">
            <div className="questions-header">
                <div>
                    <h1 className="question-title title">{category || `${props.onlineCategory}`}</h1>
                    {props.owner && <p className="question-sub--title">Made by {props.owner}</p>}
                </div>
                <button
                        className="danger"
                        onClick={() => props.setQuestions([])}
                >Back</button>
            </div>
            <ul className="question-container">
                {questionsElement()}
            </ul>
            {   
                empty
                    && 
                <Proceed
                    description="You haven't answer the whole questions"
                    func={setEmpty}
                />
            }
            {
                submit 
                    && 
                <Proceed
                    description={`Congratulation on completing the test, you have scored ${score} / ${props.questions.length}`}
                    func={setSubmit}
                    func2={props.setQuestions}
                />
            }
            <div className="actions">
                <button
                    className="danger"
                    onClick={() => props.setQuestions([])}
                >Back</button>
                <button
                    className="primary"
                    onClick={submitQuiz}
                >Submit</button>
            </div>
        </div>
    )
}
import Blob3 from "/blob3.svg"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import Proceed from "../Notification/Proceed"
import "./makeQuiz.css"

export default function MakeQuiz(props) {
    const [newQuest, setNewQuest] = useState([
        {
            id: nanoid(),
            question: "",
            choices: ["", "", "", ""],
            correct_answer: "", 
            selected: null,
            checked: false,
            result: false,
        }
    ])
    const [submitQuestion, setSubmitQuestion] = useState(false)
    const [category, setCategory] = useState("")
    const [unDone, setUnDone] = useState(false)

    useEffect(() => {
        if (submitQuestion){
            setNewQuest([
                {
                    id: nanoid(),
                    question: "",
                    choices: ["", "", "", ""],
                    correct_answer: "", 
                    selected: null,
                    checked: false,
                    result: false,
                }
            ])
            setCategory("")
        }
    }, [submitQuestion])

    const deleteQuestion = (id) => {
        const currentQuestion = newQuest.filter((question) => question.id !== id)
        setNewQuest(currentQuestion)
    }

    const generateRandomString = (length) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let result = ""

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length)
            result += charset.charAt(randomIndex)
        }

        return result
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const questionId = generateRandomString(6)
        const fixedQuestion = {
            id: questionId, 
            questions: newQuest,
            owner: props.loginUser.username,
            category: category
        }
        
        const empty = fixedQuestion.questions.filter(q => q.correct_answer === "")

        if (empty.length > 0){
            setUnDone(true)
        } else {
            props.addQuestion(fixedQuestion)
            setSubmitQuestion(true)
        }

    }

    const editQuestion = (id, value) => {
        setNewQuest((prevQuest) =>
            prevQuest.map((q) => (q.id === id ? { ...q, question: value } : q))
        )
    }

    const editChoice = (questionId, choiceIndex, value) => {
        setNewQuest((prevQuest) =>
            prevQuest.map((q) =>
                q.id === questionId
                ? {
                    ...q,
                    choices: q.choices.map((c, index) =>
                        index === choiceIndex ? value : c
                    ),
                    }
                : q
            )
        )
    }

    const editAnswer = (id, value) => {
        setNewQuest(prevQuest => (
            prevQuest.map( q => (
                q.id === id 
                ? 
                {
                    ...q, 
                    correct_answer: value
                }
                :
                q
            ))
        ))
    }

    const newQuestElement = newQuest.map((question, index) => (
        <div className="make-question shadow" key={question.id}>
            <input
                type="text"
                placeholder={`question ${index + 1}`}
                value={question.question}
                onChange={(e) => editQuestion(question.id, e.target.value)}
                required
            />
            <br />
            <label htmlFor="">Choices:</label>
            <div className="choices">
                {question.choices.map((choice, choiceIndex) => (
                <div className="choice">
                    <span className="choice-index">{String.fromCharCode(97 + choiceIndex)}</span>
                    <input
                        type="text"
                        placeholder={`choice ${String.fromCharCode(97 + choiceIndex)}`}
                        value={choice}
                        key={choiceIndex}
                        onChange={(e) => editChoice(question.id, choiceIndex, e.target.value)}
                        required
                    />
                </div>
                ))}
            </div>
            <div className="answer">
                <label htmlFor="">Answer:</label>
                <div className="answer-choice">
                    {question.choices.map((choice, index) => (
                        <button 
                            type="button"
                            value={choice}
                            onClick={e => editAnswer(question.id, e.target.value)}
                            className={question.correct_answer === choice && question.correct_answer !== "" ? "purple" : ""}
                        >{String.fromCharCode(97 + index)}</button>
                    ))}
                </div>
            </div>
            <button
                type="button"
                className="danger"
                onClick={() => deleteQuestion(question.id)}
            >
                Delete
            </button>
            </div>
    ))

    return (
        <div className="make">
            {/* <img className="blob" src={Blob3} alt="" /> */}
            {
                unDone
                    &&
                <Proceed 
                    description={"The correct answer, must not be empty"}
                    func={setUnDone}
                />
            }
            {
                submitQuestion
                    &&
                <Proceed 
                    description={"Congratulation! Go to profile to see the question id."}
                    func={setSubmitQuestion}
                />
            }
            <h1 className="title">Make Your Own Quiz</h1>
            <div className="banner shadow white">
                <p><span>Warning :</span> Question will be deleted automatically in 48 hours after you submit it.</p>
            </div>
            <form onSubmit={handleSubmit} className="make-content">
                <div className="make-question shadow">
                    <input 
                        type="text" 
                        placeholder="Question's category"
                        required
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                </div>
                {newQuestElement}
                <div className="actions">
                    <button
                        type="button"
                        className="purple"
                        onClick={() => {
                        setNewQuest([
                            ...newQuest,
                            {
                                id: nanoid(),
                                question: "",
                                choices: ["", "", "", ""],
                                correct_answer: "", 
                                selected: null,
                                checked: false,
                                result: false,
                            },
                        ])
                        }}
                    >
                        add
                    </button>
                    <button className="primary">submit</button>
                </div>
            </form>
        </div>
    )
}

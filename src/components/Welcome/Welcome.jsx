import axios from "axios"
import { useState } from "react"
import { nanoid } from "nanoid"
import Input from "../Notification/input"
import "./welcome.css"
import Search from "/search.png"

export default function Welcome(props) {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [categories, setCategories] = useState([
        { value: "join online quiz", category: 0},
        { value: "general knowledge", category: 9 },
        { value: "entertainment: books", category: 10 },
        { value: "entertainment: film", category: 11 },
        { value: "entertainment: music", category: 12 },
        { value: "entertainment: television", category: 14 },
        { value: "entertainment: video games", category: 15 },
        { value: "entertainment: board games", category: 16 },
        { value: "science & nature", category: 17 },
        { value: "science: computers", category: 18 },
        { value: "science: mathematicians", category: 19 },
        { value: "mythology", category: 20 },
        { value: "sports", category: 21 },
        { value: "geography", category: 22 },
        { value: "history", category: 23 },
        { value: "politics", category: 24 },
        { value: "celebrities", category: 26 },
        { value: "animals", category: 27 },
        { value: "vehicles", category: 28 },
        { value: "entertainment: comics", category: 29 },
        { value: "science: gadget", category: 30 },
        { value: "entertainment: japanese anime & manga", category: 31 },
        { value: "entertainment: cartoon & animations", category: 32 }
    ])
    const [showedCategory, setShowedCategory] = useState(categories)

    const shuffleArray = (arr, element) => {
        const randomInt = Math.floor(Math.random() * (arr.length + 1))

        if (!arr.includes(element)){
            arr.splice(randomInt, 0, element)
        }

        return arr
    }


    const categoryElement = showedCategory.map(category => (
        category.value === "join online quiz" 
        ? 
            <button 
                type="submit"
                value={100}
                onClick={() => props.setJoinQuiz(true)}
                className="shadow purple join"
                key={nanoid()}
            >
                Join Online Quiz
            </button>
        : 
            <button 
                    type="submit"
                    value={category.value}
                    onClick={() => setSelectedCategory(category.category)}
                    className="shadow"
                >
                    {category.value}
            </button>
    ))
    

    const getQuestions = async (category) => {
        try {
            const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy`)

            props.setQuestions(response.data.results.map(data => ({
                category: data.category,
                question: data.question,
                correct_answer: data.correct_answer,
                choices: shuffleArray(data.incorrect_answers, data.correct_answer),
                selected: null,
                id: nanoid(),
                checked: false,
                result: false
            })))
        } catch (error) {
            console.log(error.message)
        }
    }  

    const handleSubmit = (e) => {
        e.preventDefault()

        if (selectedCategory != 0){
            props.setFindQuestion(true)
            getQuestions(selectedCategory)
        } 
    }

    const searchCategory = (e) => {
        const searchText = e.target.value.toLowerCase()
        const tempCategories = categories.filter(category => category.value.startsWith(searchText))
        setShowedCategory(tempCategories)
    }

    return (
        <div className="welcome">
            {
                props.joinQuiz
                    &&
                <Input
                    description={"Join Quiz With Id"}
                    setJoinQuiz={props.setJoinQuiz}
                    setQuestionId={props.setQuestionId}
                    questionId={props.questionId}
                    joinQuiz={props.joinQuiz}
                    setStartOnline={props.setStartOnline}
                />
            }
            <h1 className="title">Select Category</h1>
            <div className="search shadow">
                <img src={Search} alt="" />
                <input 
                    type="text" 
                    placeholder="Search category . . ."
                    onChange={(e) => searchCategory(e)}
                />
            </div>
            <form 
                onSubmit={e => handleSubmit(e)}
                className="category"
            >
                <div className="categories">
                    {categoryElement}
                </div>
            </form>
        </div>  
    )
}
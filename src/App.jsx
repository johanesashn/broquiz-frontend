import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Login from "./page/Login/Login"
import Leadboard from "./components/Leaderboard/Leaderboard"
import Profile from "./components/Profile/Profile"
import Footer from "./components/Footer/Footer"
import Home from "./page/Home/Home"
import Quiz from "./page/Quiz/Quiz"
import Navbar from "./page/Navbar/Navbar"
import Warning from "./components/Notification/Warning"
import MakeQuiz from "./components/MakeQuiz/MakeQuiz"
import Splash from "./components/Splash/Splash"
import "./App.css"
import axios from "axios"

export default function App(){
  const [splash, setSplash] = useState(true)
  const [users, setUsers] = useState([])
  const [questions, setQuestions] = useState([])
  const [findQuestion, setFindQuestion] = useState(false)
  const [load, setLoad] = useState(false)
  const [logout, setLogout] = useState(false)
  const [menu, setMenu] = useState({
    home: true, 
    quiz: false,
    profile: false,
    leaderboard: false, 
    makeQuiz: false
  })
  const [loginUser, setLoginUser] = useState({})
  const [winner, setWinner] = useState([])
  const [onlineQuestions, setOnlineQuestions] = useState([])

  useEffect(() => {
    getOnlineQuestions()

    setTimeout(() => {
      setSplash(false)
    }, 1500);
  }, [])

  useEffect(() => {
    const prevUser = window.localStorage.getItem("prevUser")
    const parsePrevUser = JSON.parse(prevUser)
    
    const prevMenu = window.localStorage.getItem("prevMenu")
    const parsePrevMenu = JSON.parse(prevMenu)

    if (parsePrevUser.username !== undefined){
      setLoginUser(parsePrevUser)
    }

    if (parsePrevMenu.home !== true){
      setMenu(parsePrevMenu)
    }
  }, [users])

  useEffect(() => {
      const prevUser = window.localStorage.getItem("prevUser")
      const parsePrevUser = JSON.parse(prevUser)
      
      const prevMenu = window.localStorage.getItem("prevMenu")
      const parsePrevMenu = JSON.parse(prevMenu)

      if (parsePrevUser && parsePrevUser.username !== undefined){
        setLoginUser(parsePrevUser)
      }

      if (parsePrevMenu && parsePrevMenu.home !== true){
        setMenu(parsePrevMenu)
      }
  }, [users])


  useEffect(() => {
    window.localStorage.setItem("prevUser", JSON.stringify(loginUser))
  }, [loginUser])

  useEffect(() => {
    window.localStorage.setItem("prevMenu", JSON.stringify(menu))
  }, [menu])

  useEffect(() => {
    if (findQuestion){
      if (questions.length > 0){
        setLoad(false)
        setFindQuestion(false)
      } else {
        setLoad(true)
      }
    }

    getUsers()
  }, [findQuestion, questions])

  const getUsers = async () => {
    try {
      // const response = await axios.get("http://localhost:3000/users")
      const response = await axios.get("https://backend-broquiz-production-f1f5.up.railway.app/users")

      // sort users by points
      const sortedUsersByPoints = response.data.sort((a, b) => b.points - a.points)
      setUsers(sortedUsersByPoints)
      // get winner id

      setWinner([sortedUsersByPoints[0]._id, sortedUsersByPoints[1]._id, sortedUsersByPoints[2]._id]) 
    } catch (error) {
      console.log(error.message)
    }
  }

  const addUser = async (user) => {
    try {
      const response = await axios.post("https://backend-broquiz-production-f1f5.up.railway.app/users", user, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const addQuestion = async (question) => {
    try {
      const response = await axios.post("https://backend-broquiz-production-f1f5.up.railway.app/question", question, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getOnlineQuestions = async () => {
    try {
      const response = await axios.get("https://backend-broquiz-production-f1f5.up.railway.app/question")
      setOnlineQuestions(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <BrowserRouter>
      {splash && <Splash/>}
      <Routes>
        <Route path="/" element={
          <Login
            addUser={addUser}
            users={users}
            getUsers={getUsers}
            setLoginUser={setLoginUser}
          />}
        />
        <Route path="/quiz" element={(
          <main>
            <Navbar
              menu={menu}
              setMenu={setMenu}
              setLogout={setLogout}
              loginUser={loginUser}
            />
            <div className="content">
              {
                logout 
                  && 
                <Warning
                  description="Are you sure want to logout?"
                  func={setLogout}
                  setMenu={setMenu}
                />
              }
              {
                menu.home 
                  && 
                <Home
                  setMenu={setMenu}
                />
              }
              {
                menu.leaderboard
                  &&
                <Leadboard
                  users={users}
                  winner={winner}
                  getUsers={getUsers}
                />
              }
              {
                menu.quiz
                  &&
                <Quiz
                  load={load}
                  questions={questions}
                  setQuestions={setQuestions}
                  setLoad={setLoad}
                  findQuestion={findQuestion}
                  setFindQuestion={setFindQuestion}
                  menu={menu}
                  loginUser={loginUser}
                  onlineQuestions={onlineQuestions}
                />
              }
              {
                menu.makeQuiz
                  && 
                <MakeQuiz
                  loginUser={loginUser}
                  addQuestion={addQuestion}
                />
              }
              {
                menu.profile
                  &&
                <Profile
                  loginUser={loginUser}
                  setLoginUser={setLoginUser}
                  getUsers={getUsers}
                  onlineQuestions={onlineQuestions}
                />
              }
              <Footer/>
            </div>
          </main>
        )}/>
      </Routes>
    </BrowserRouter> 
  )
}
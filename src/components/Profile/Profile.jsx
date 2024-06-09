import Blob3 from "/blob3.svg"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import bcrypt from "bcryptjs"
import "./profile.css"
import DeleteAccount from "../Notification/DeleteAccount"

export default function Profile(props){
    const [editProfile, setEditProfile] = useState(false)
    const [deleteProfile, setDeleteProfile] = useState(false)
    const [editedProfile, setEditedProfile] = useState(props.loginUser)
    const [changePass, setChangePass] = useState(false)
    const [oldPass, setOldPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [ownerQuiz, setOwnerQuiz] = useState([])

    const newPassRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        getOwnerQuiz()
    }, [props.onlineQuestions])
    
    const getOwnerQuiz = () => {
        const quiz = props.onlineQuestions.filter(q => q.owner === props.loginUser.username)
        const convertedQuiz = quiz.map(quiz => {
            const time = quiz.time
            const dateObject = new Date (time)

            // Extract date components
            const year = dateObject.getUTCFullYear();
            const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
            const day = dateObject.getUTCDate().toString().padStart(2, '0');
            const dateResult = `${year}-${month}-${day}`

            // Extract time components
            const hours = dateObject.getUTCHours().toString().padStart(2, '0');
            const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
            const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');
            const timeResult = `${hours}:${minutes}:${seconds}`

            return {
                category: quiz.category, 
                id: quiz.id, 
                time: timeResult,
                date: dateResult
            }
        })

        setOwnerQuiz(convertedQuiz)
    }

    const deleteUser = async () => {
        const response = await axios.delete(`https://broquiz-backend-production.up.railway.app/users/${props.loginUser._id}`)
        console.log(response.data)
        props.getUsers()
    }

    const handleEditProfile = async (e) => {
        e.preventDefault()
        setEditProfile(false)

        try {
            const response = await axios.patch(`https://broquiz-backend-production.up.railway.app/users/${editedProfile._id}`, editedProfile, {
                headers: {
                        "Content-Type": "application/json"
                    }
                })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }

        props.setLoginUser(editedProfile)
    }

    const updatePassword = async (newPassword) => {
        const response = await axios.patch(`https://broquiz-backend-production.up.railway.app/users/${props.loginUser._id}`, {
            ...props.loginUser,
            password: newPassword
        })

        console.log(response.data)
    }

    const handlePassword = (e) => {
        e.preventDefault()
        const newPassword = newPassRef.current.value

        bcrypt.compare(oldPass, props.loginUser.password, (err, isMatch) => {
            if (err){
                throw err
            } else if (!isMatch){
                console.log("Password doesn't match")
            } else {
                console.log("you are real user")
                if (newPassword === confirmPass) {
                    const newHashedPass = bcrypt.hashSync(newPassword, 10)
                    updatePassword(newHashedPass)
                    navigate("/")        
                    window.location.reload()            
                } else {
                    console.log("it doesn't match")
                }
            }
        })
    }

    const quizElement = ownerQuiz.length > 0 ? ownerQuiz.map((quiz, index) => (
        <div className="column">
            <div className="row no">{index + 1}</div>
            <div className="row id">{quiz.id}</div>
            <div className="row quiz-category">{quiz.category}</div>
            <div className="row">{quiz.date}</div>
            <div className="row">{quiz.time}</div>
        </div>
    )) : ""

    return (
        <div className="profile">
            {/* <img className="blob" src={Blob3} alt="" /> */}
            {
                deleteProfile 
                    &&
                <DeleteAccount 
                    description="Are you sure want to delete your profile?"
                    func={setDeleteProfile}
                    func2={deleteUser}
                />
            }
            {
                changePass
                    &&
                <div className="edit edit-password">
                    <div className="container">
                        <h2>Edit Password</h2>
                        <form onSubmit={(e) => handlePassword(e)}>
                            <input 
                                type="password" 
                                placeholder="Old Password"
                                value={oldPass}
                                onChange={(e) => setOldPass (e.target.value)}
                                required
                            />
                            <br />
                            <input 
                                type="password" 
                                placeholder="New Password"
                                ref={newPassRef}
                                required
                            />
                            <br />
                            <input 
                                type="password" 
                                placeholder="Confirm Password"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                required
                            />
                            <div className="actions">
                                <button className="primary" type="submit">Confirm</button>
                                <button className="danger" onClick={() => setChangePass(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {
                editProfile
                    &&
                <div className="edit">
                    <div className="container">
                        <h2>Edit Profile</h2>
                        <form action="">
                            <label htmlFor="">Username</label>
                            : <input 
                                type="text" 
                                value={editedProfile.username}
                                onChange={(e) => setEditedProfile({
                                    ...editedProfile,
                                    username: e.target.value
                                })}
                            />
                            <br />
                            <label htmlFor="">Password</label>
                            : <input 
                                type="password" 
                                value={editedProfile.password}
                                onChange={(e) => setEditedProfile({
                                    ...editedProfile,
                                    password: e.target.value
                                })}
                            />
                            <br />
                            <label htmlFor="">Gender</label>
                            : <select 
                                value={editedProfile.gender}
                                onChange={(e) => setEditedProfile({
                                    ...editedProfile,
                                    gender: e.target.value
                                })}
                            >
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                            <br />
                            <label htmlFor="">Nationality</label>
                            : <input 
                                type="text"
                                value={editedProfile.country}
                                onChange={(e) => setEditedProfile({
                                    ...editedProfile,
                                    country: e.target.value
                                })}
                            />
                            <br />
                            <label htmlFor="">Age</label>
                            : <input 
                                type="number"
                                value={editedProfile.age}
                                onChange={(e) => setEditedProfile({
                                    ...editedProfile,
                                    age: e.target.value
                                })}
                            />
                            <div className="actions">
                                <button 
                                    type="submit"
                                    className="primary" 
                                    onClick={(e) => handleEditProfile(e)}
                                >Edit</button>
                                <button 
                                    className="danger" 
                                    onClick={() => {
                                        setEditProfile(false)
                                        setEditedProfile(props.loginUser)
                                    }}
                                >Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            <div className="profile-header">
                <p>Welcome Back,</p>
                <h2 className="title">{props.loginUser.username}</h2>
            </div>
            <div className="profile-content shadow">
                <h3>YOUR PROFILE</h3>
                <div className="column">
                    <p className="column-description">Username</p>
                    <p>: <span className="column-value">{props.loginUser.username}</span></p>
                </div>
                <div className="column">
                    <p className="column-description">Gender</p>
                    <p>: <span className="column-value">{props.loginUser.gender}</span></p>
                </div>
                <div className="column">
                    <p className="column-description">Nationality</p>
                    <p>: <span className="column-value">{props.loginUser.country}</span></p>
                </div>
                <div className="column">
                    <p className="column-description">Status</p>
                    <p>: <span className="column-value">{props.loginUser.status}</span></p>
                </div>
                <div className="column">
                    <p className="column-description">Points</p>
                    <p>: <span className="column-value">{props.loginUser.points}</span></p>
                </div>
                <div className="column">
                    <p className="column-description">Age</p>
                    <p>: <span className="column-value">{props.loginUser.age}</span></p>
                </div>
                <p className="profile-sub--title">SETTING PROFILE</p>
                <div className="actions">
                    <button className="primary" onClick={() => setEditProfile(true)}>Edit</button>
                    <button className="danger" onClick={() => setDeleteProfile(true)}>Delete</button>
                    <button className="password" onClick={() => setChangePass(true)}>Change Password</button>
                </div>
            </div>
            <div className="profile-status shadow">
                <h3>STATUS SYSTEM</h3>
                <div className="column">
                    <p className="column-description"><b>Status</b></p>
                    <p className="column-value"><b>Min Points</b></p>
                </div>
                <div className="column">
                    <p className="column-description">Novice</p>
                    <p className="column-value">0</p>
                </div>
                <div className="column">
                    <p className="column-description">Beginner</p>
                    <p className="column-value">200</p>
                </div>
                <div className="column">
                    <p className="column-description">Learner</p>
                    <p className="column-value">500</p>
                </div>
                <div className="column">
                    <p className="column-description">Educated</p>
                    <p className="column-value">1000</p>
                </div>
                <div className="column">
                    <p className="column-description">Intelligent</p>
                    <p className="column-value">2000</p>
                </div>
                <div className="column">
                    <p className="column-description">Wise</p>
                    <p className="column-value">5000</p>
                </div>
                <div className="column">
                    <p className="column-description">Genius</p>
                    <p className="column-value">10000</p>
                </div>
            </div>
            <div className="profile-quiz shadow">
                <h3>YOUR QUIZ</h3>
                <p className="warning">The quiz will automatically deleted in <b>48 hours</b> after it uploaded</p>
                {
                    ownerQuiz.length > 0
                        ? 
                    <>
                        <div className="column bold">
                            <div className="row no">No</div>
                            <div className="row id">Id</div>
                            <div className="row quiz-category">Category</div>
                            <div className="row">Date</div>
                            <div className="row">Time</div>
                        </div>
                        {quizElement}
                    </>
                    :
                    <p>You haven't made any quiz</p>
                }
            </div>
        </div>
    )
}
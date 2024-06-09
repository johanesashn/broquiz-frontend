import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import bcrypt from "bcryptjs"
import Blob from "/blob.svg"
import Blob2 from "/blob2.svg"
import Blob3 from "/blob3.svg"
import Mascot from "/mascot.png"
import "./login.css"
import Proceed from "../../components/Notification/Proceed"
import UserCreated from "../../components/Notification/UserCreated"

export default function Login(props){
    const [wrongPassword, setWrongPassword] = useState(false)
    const [noUser, setNoUser] = useState(false)
    const [loginUsername, setLoginUsername] = useState("")
    const [createAccountSuccess, setCreateAccountSuccess] = useState(false)
    const [duplicate, setDuplicate] = useState(false)
    const [newUser, setNewUser] = useState({
        username: "",
        gender: "male",
        country: "",
        age: "",
        status: "Novice",
        points: 0
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [makeAccount, setMakeAccount] = useState(false)
    const navigate = useNavigate()

    const passwordRef = useRef()
    const newPasswordRef = useRef()

    const handleLogin = (e) => {
        e.preventDefault()
        const loginPassword = passwordRef.current.value

        const checkUser = props.users.filter(user => user.username === loginUsername)
        if (checkUser.length === 1){
            bcrypt.compare(loginPassword, checkUser[0].password, (err, isMatch) => {
                if (err){
                    throw err
                } else if (!isMatch){
                    setWrongPassword(true)
                } else {
                    props.setLoginUser(checkUser[0])
                    navigate("/quiz")
                }
            })
        } else {
            setNoUser(true)
        }
    }

    const handleMakeAccount = (e) => {
        e.preventDefault()

        const newPassword = newPasswordRef.current.value

        if (confirmPassword === newPassword){
            // checking username hasn't been taken
            const checking = props.users.filter(user => user.username === newUser.username)

            if (checking.length === 0){
                const hashedNewPassword = bcrypt.hashSync(newPassword, 10)
                const uploadedUser = {
                    ...newUser, 
                    password: hashedNewPassword
                }

                setMakeAccount(false)
                setConfirmPassword("")
                setCreateAccountSuccess(true)
                newPasswordRef.current.value = ""
                setNewUser({
                    username: "",
                    gender: "male",
                    country: "",
                    age: "",
                    status: "Novice",
                    points: 0
                })
                props.addUser(uploadedUser)
                props.getUsers()
            } else {
                setDuplicate(true)
            }
        } else {
            console.log("password doesnt match")
            setWrongPassword(true)
        }
    }

    return (
        <div className="login">
            {/* <img className="blob" src={Blob} alt="" /> */}
            {/* <img className="blob" src={Blob3} alt="" />  */}
            {/* <img className="blob" src={Blob3} alt="" /> */}
            {/* <img className="blob" src={Blob3} alt="" /> */}
            {
                duplicate
                    &&
                <Proceed 
                    description="username is already taken"
                    func={setDuplicate}
                />
            }
            {
                wrongPassword && <Proceed
                    description="Password doen't match"
                    func={setWrongPassword}
                />
            }
            {
                createAccountSuccess && <UserCreated
                description="New account has been made"
                setCreateAccountSuccess={setCreateAccountSuccess}
            />
            }
            {
                noUser && <Proceed
                description={`${loginUsername} doesn't exist`}
                func={setNoUser}
            />
            }
            {/* <img className="mascot" src={Mascot} alt="" /> */}
            {
                makeAccount
                    ?
                <form onSubmit={(e) => handleMakeAccount(e)}>
                    <h1 className="title">Broquiz</h1>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={newUser.username}
                        onChange={(e) => setNewUser({
                            ...newUser, 
                            username: e.target.value
                        })}
                        required
                    />
                    <br />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        ref={newPasswordRef}
                        required
                    />
                    <br />
                    <input 
                        type="password" 
                        placeholder="Confirm password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <br />
                    <select 
                        onChange={(e) => setNewUser({
                            ...newUser, 
                            gender: e.target.value
                        })}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <br />
                    <input 
                        type="text" 
                        placeholder="Country" 
                        value={newUser.country}
                        onChange={(e) => setNewUser({
                            ...newUser, 
                            country: e.target.value
                        })}
                        required
                    />
                    <br />
                    <input 
                        type="number" 
                        min="1"
                        placeholder="Age" 
                        value={newUser.age}
                        onChange={(e) => setNewUser({
                            ...newUser, 
                            age: e.target.value
                        })}
                        required
                    />
                    <br />
                    <button type="submit">Sign Up</button>
                    <p 
                        className="warning"
                        onClick={() => setMakeAccount(false)}
                    >Already has account? <span>*sign in</span></p>
                </form>
                    :
                <form onSubmit={e => handleLogin(e)}>
                    <h1 className="title">Broquiz</h1>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        required
                    />
                    <br />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        ref={passwordRef}
                        required
                    />
                    <br />
                    <button type="submit">Sign In</button>
                    <p 
                        className="warning"
                        onClick={() => setMakeAccount(true)}
                    >Don't have an account? <span>*sign up</span></p>
                </form>
            }
        </div>
    )
}
import Blob3 from "/blob3.svg"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import Search from "/search.png"
import "./leaderboard.css"

export default function Leadboard(props){
    const [searchedUser, setSearchedUser] = useState("")
    const [showedUser, setShowedUser] = useState(props.users)

    useEffect(() => {
        setShowedUser(props.users)
    }, [props.users])

    const searchUser = (username) => {
        setSearchedUser(username)
        const searched = props.users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()))
        setShowedUser(searched)
    }

    const isWinner = (id) => {
        if (id === props.winner[0]){
            return "first"
        } else if (id === props.winner[1]){
            return "second"
        } else if (id === props.winner[2]) {
            return "third"
        }
    }

    const leaderboardElement = showedUser.map((user, index) => (
        <div className={`column ${isWinner(user._id)}`}  key={nanoid()}>
            <div className="row">{index + 1}</div>
            <div className="row">{user.username}</div>
            <div className="row">{user.points}</div>
            <div className="row">{user.country}</div>
            <div className="row">{user.status}</div>
        </div>
    ))

    return (
        <div className="leaderboard">
            {/* <img className="blob" src={Blob3} alt="" /> */}
            <h1 className="title">LEADERBOARD</h1>
            <div className="search shadow">
                <img src={Search} alt="" />
                <input 
                    type="text" 
                    placeholder="Search username . . ."
                    value={searchedUser}
                    onChange={e => searchUser(e.target.value)}
                />
            </div>
            <div className="table shadow">
                <div className="column table-title">
                    <div className="row">No</div>
                    <div className="row">Username</div>
                    <div className="row">Points</div>
                    <div className="row">Country</div>
                    <div className="row">Status</div>
                </div>
                {leaderboardElement}
            </div>
        </div>
    )
}
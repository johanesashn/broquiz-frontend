import { Audio, Grid } from "react-loader-spinner"
import "./splash.css"

export default function Splash(){
    return (
        <div className="splash">
            <Grid
                height="80"
                width="80"
                color="#2E4374"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <h2>BROQUIZ</h2>
            <p>The best quiz app we've ever made in 2023</p>
        </div>
    )
}
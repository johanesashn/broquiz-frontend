import { MagnifyingGlass } from  'react-loader-spinner'
import "./loader.css"

export default function Loader(){
    return (
        <div className="loader">
            <MagnifyingGlass
                visible={true}
                height="100"
                width="100"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor = 'transparent'
                color = '#000'
            />
            <p>Finding Questions</p>
        </div>
    )
}
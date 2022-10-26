import { Link } from "react-router-dom";

export const PostForm = () =>{
    return (
        <div style={{fontSize: "30px", color:"white"}}>
            <h1> Thank you for submitting you response!</h1>
            <p>Submit another response <Link to ="/">here</Link>. </p>
        </div>
    )
}
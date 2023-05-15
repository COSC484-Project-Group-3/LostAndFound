
import "./UpdatePostForm.css"
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { AuthService } from "../../services/auth.service";
import { PostService } from "../../services/post.service";
import { LocationService } from "../../services/location.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const UpdatePostForm = () => {  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [compensation, setCompensation] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        window.scrollTo(0, 0);
    })

    // handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // handle error
        if (!title || !description || !compensation) {
            setError(true);
            setErrorMessage("Please fill out all fields");
            setLoading(false);
            return false;
        }
        else {
            // create a post object
            const postObj = {
                title,
                description,
                compensation
            };
            // create a post
            const postId = localStorage.getItem("postId")
            await PostService.updatePost(postObj, postId).then((res) => {
                if (res.status === 200) {
                    setError(true)
                    const error = document.getElementsByClassName("error")[0];
                    error.style.background = "#00FF00"
                    error.style.color = "#FFFFFF"
                    error.style.border = "#FFFFFF"
                    setErrorMessage("Your post has been updated!");
                } else {
                    setError(true);
                    setErrorMessage("Something went wrong");
                }
            });
        }
        setLoading(false);
    };


    // handle form visibility on close
    const formClose = () => {
        navigate("/");
    };


    return (
        <div className="update-post-form">
                <form className="post-form" onSubmit={handleSubmit} method="POST">
                    <CloseIcon className="close-button" variant="contained" color="primary" onClick={formClose}/>
                    <p className="post-form-header">Update your lost item</p>
                    <label className="title-label" htmlFor="title">Name</label>
                    <input 
                        className="title"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value) 
                            setError(false);}}
                    />
                    <label className="description-label" htmlFor="description">Description</label>
                    <input
                        className="description"
                        type="textarea"
                        name="description"
                        value={description}
                        onChange={(e) =>{ setDescription(e.target.value)
                        setError(false);
                        }}
                    />
                    <label className="compensation-label" htmlFor="compensation">Reward</label>
                    <div><p className="compensation-info">Please specify how  much money you are willing to reward for the finder.</p></div>
                    <input
                        className="compensation"
                        type="number"
                        name="compensation"
                        value={compensation}
                        min="0"
                        onChange={(e) => {setCompensation(e.target.value)
                            setError(false);
                        }}
                    />
                    <div className="error-container">
                        <p
                        className="error"
                        style={{ display: error ? "block" : "none", 
                                 color: "#fd6565", 
                                 border: "1px solid  #fd6565",
                                 borderRadius: "4px",
                             }}
                        >
                            {errorMessage}
                        </p>
                    </div>
                    {(loading ?
                    <div className="post-loading"></div> : 
                    <input className="native-post" type="submit" value="UPDATE"/>)}
                </form>
        </div>
    )
}

export default UpdatePostForm;

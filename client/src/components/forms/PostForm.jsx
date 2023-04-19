
import  "./PostForm.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import { AuthService } from "../../services/auth.service";
import { PostService } from "../../services/post.service";
import { LocationService } from "../../services/location.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [compensation, setCompensation] = useState();
    const [image, setImage] = useState();
    const [imageSelected, setImageSelected] = useState(false);
    const [formVisibility, setFormVisibility] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [contactInfo, setContactInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageLoad, setPageLoad] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setPageLoad(false);
        if (AuthService.getToken("id")) {
            setFormVisibility(true);
        } else {
            setFormVisibility(false);
        }
        setPageLoad(true);
    }, []);

    // handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // handle error
        if (!title || !description || !image || !searchTerm || !compensation || !contactInfo) {
            setError(true);
            setErrorMessage("Please fill out all fields");
            setLoading(false);
            return false;
        }
        // make sure contact info is valid number
        else if (isNaN(contactInfo)) {
            setError(true);
            setErrorMessage("Please enter a valid phone number");
            setLoading(false);
            return false;
        } 
        else {
            // upload image to cloudinary
            const imgUrl = await uploadCloudinary(image);
            // search for the location
            const location = await searchAddresses(searchTerm);
            // handle error
            if (!location) {
                setError(true);
                setErrorMessage("Please enter a valid address");
                setLoading(false);
                return false;
            }
            // create a location object
            const locationObj = {
                latitude: location.lat,
                longitude: location.lng,
            };
            // create a location
            const locationId = await LocationService.createLocation(locationObj).then((res) => {
                return res.data._id;
            });
            // get the author id
            const author = AuthService.getToken("id");
            if (!author) {
                setError(true);
                setErrorMessage("Please log in to create a post");
                setLoading(false);
                return false;
            }
            // create a post object
            const postObj = {
                author,
                title,
                description,
                compensation,
                contactInfo,
                image: imgUrl,
                location: locationId,
            };
            // create a post
            await PostService.createPost(postObj).then((res) => {
                // check if the post was created
                if (res.status === 200) {
                    navigate("/");
                } else {
                    setError(true);
                    setErrorMessage("Something went wrong");
                }
            });
        }
        setLoading(false);
    };

    // Uploads image to cloudinary
    const uploadCloudinary = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "lmld1g3c");
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/ddmn5ghjx/image/upload",
            formData
        );
        return response.data.secure_url;
    };

    // Search for addresses using the OpenStreetMap API
    const searchAddresses = async (searchTerm) => {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&countrycodes=us`
        );
        const results = response.data.map((result) => ({
          label: result.display_name,
          lat: result.lat,
          lng: result.lon,
        }));
        setAddresses(results);
        setError(false);
        return results[0];
      };

      // handles location search
      const handleLocationClick = (label) => {
        setSearchTerm(label);
        setAddresses([]);
        setError(false);
      };

    // handles image change
    const changeHandler = (e) => {
        setImage(e.target.files[0]);
        setImageSelected(true);
        setError(false);
    };


    // handle form visibility on close
    const formClose = () => {
        navigate("/");
    };

    return (
        <div className="post-form-container">
            {formVisibility ? (
            <div className="post-form-container">
                <form className="post-form" onSubmit={handleSubmit} method="POST">
                    <CloseIcon className="close-button" variant="contained" color="primary" onClick={formClose}/>
                    <p className="post-form-header">Post your lost item</p>
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
                    <label className="image-label" htmlFor="image">Image</label>
                    <input
                        className="image"
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={changeHandler}
                    />
                    {imageSelected ? (
                    <div className="image-preview-container">
                        <img className="image-preview" src={URL.createObjectURL(image)} alt="preview" />
                    </div>
                    ) : (
                    <div className="image-preview-placeholder"></div>
                    )}
                    <label className="location-label" htmlFor="location">Location</label>
                    <div><p className="location-info">Please specify where your item was lost.</p></div>
                    <input
                    type="text"
                    className="location"
                    name="location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyUp={() => searchAddresses(searchTerm)}
                    list="addresses"
                    />
                    <datalist className="addresses" id="addresses">
                        {addresses.map((address, index) => (
                            <option key={index} onClick={() => handleLocationClick(address.label)}>
                            {address.label}
                            </option>
                        ))}
                    </datalist>
                    <label htmlFor="phone" className="phone-label">Phone Number</label>
                    <div><p className="phone-info">We ask phone number to allow the finder to contact you.</p></div>
                    <input 
                        type="tel"
                        className="phone"
                        value={contactInfo}
                        onChange={(e) => {setContactInfo(e.target.value)
                            setError(false);
                        }}
                    >
                    </input>
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
                    <input className="native-post" type="submit" value="POST"/>)}
                </form>
            </div>
            ) : (
                    <div className="invalid-post--container">
                        <h3>Can't Post</h3>
                        <p>Please login to post</p>
                        <Link to="/login" className="login-button">Login</Link>
                        <p>Don't have an account?</p>
                        <Link to="/signup" className="signup-button">Sign Up</Link>
                    </div>
                ) 
            }
        </div>
    );
}

export default PostForm;

import "./HomePost.css";
import { PostService } from "../../services/post.service";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { UserService } from "../../services/user.service";
import Map, {Marker} from 'react-map-gl';
import { MAPBOX_TOKEN } from '../../constants/env';
import 'mapbox-gl/dist/mapbox-gl.css';
import PostCardSkeleton from "../loading/PostCardSkeleton";
import PostCard from "./PostCard";
import Header from "../header/Header";
import Footer from "../footer/Footer";
const HomePost = () => {
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState('');
    const [distance, setDistance] = useState(25);
    const [loading, setLoading] = useState(false);
    const [ postClicked, setPostClicked ] = useState(false);
    const [time, setTime] = useState();
    const [location, setLocation] = useState();
    /**
     * A function that handles the distance selector
     * 
     * @param {*} e event that is triggered when the user selects a distance
     */
    const handleDistanceSelect = async (e) => {
        const currDist = e.target.value;
        setDistance(e.target.value);
        fetchPosts(currDist);
    }

    useEffect(() => {
        handleHomeLoad();
    }, []);

    /**
     * A function that fetches the posts when the page loads
     * DEFAULT DISTANCE IS 25 MILES
     */
    const handleHomeLoad = async () => {
        fetchPosts(distance);
    }

    /**
     * A function that fetches the posts with in a distance
     * 
     * @param {Number} distance the distance to fetch posts within
     */
    const fetchPosts = async (distance) => {
        setLoading(true);
        try {
            const res = await PostService.getPostsByDistance(distance);
            // for each post set a profile picture
            res.data.forEach((post) => {
                if (post.author.profilePicture.includes('<svg')) {
                    post.author.profilePicture = UserService.getProfilePicture(post.author.profilePicture)
                }
            });
            // for each add location: city, state
            res.data.forEach((post) => {
                const cityAndState = PostService.getCityAndState({'lat':post.location.latitude, 'lng': post.location.longitude});
                post.location.cityAndState = cityAndState;
            });
            setPosts(res.data);
        } catch (err) {
            console.log(err);
        }
       
        setLoading(false);
    };

    /**
     * A function that displays the post clicked
     * 
     * @param {String} id the id of the post clicked
     */
    const displayPost = (id) => {
        // get post clicked
        const post = posts.find((post) => post._id === id);
        // get city and state of the post clicked
        const cityAndState = PostService.getCityAndState({'lat':post.location.latitude, 'lng': post.location.longitude});
        setLocation(cityAndState);
        // get time ago of the post posted
        const isoDateString = post.updatedAt;
        const timeAgo = PostService.getTimeAgo(isoDateString);
        setTime(timeAgo);
        setPost(post);
        setPostClicked(true);
        const homePostsContainer = document.getElementsByClassName("home-posts-container");
        if (homePostsContainer.length === 0) return;
        homePostsContainer[0].style.opacity= ".2";
        const body = document.getElementsByTagName("body");
        if (body.length === 0) return;
        body[0].style.overflow = "hidden";
        const navigateMapButtonContainer = document.getElementsByClassName("navigate-map-button-container");
        if (navigateMapButtonContainer.length === 0) return;
        navigateMapButtonContainer[0].style.display = "none";

    }
    
    /**
     * A function that closes the post preview
     */
    const previewClose = () => {
        setPostClicked(false);
        const homePostsContainer = document.getElementsByClassName("home-posts-container");
        if (homePostsContainer.length === 0) return;
        homePostsContainer[0].style.opacity= "1";
        const body = document.getElementsByTagName("body");
        if (body.length === 0) return;
        body[0].style.overflow = "scroll";
        const navigateMapButtonContainer = document.getElementsByClassName("navigate-map-button-container");
        if (navigateMapButtonContainer.length === 0) return;
        navigateMapButtonContainer[0].style.display = "block";
    };
    return (
        <div className="home-main-container">
            {loading ? (
                <div className="home-posts-container" style={{ marginLeft:'20px', marginRight:'20px'}}>
                {Array.from({ length: 12 }, (_, i) => <PostCardSkeleton key={i} />)}
                </div>
            ) : (
            <div className="home-posts-content-container">
                <div className="posts-options-selector">
                    <label className="distance-selector-label" htmlFor="posts-distance-selector">within</label>
                    <select value={distance} className="distance-selector" id="post-distance-selector" onChange={handleDistanceSelect}>
                        <option value="5">5 miles</option>
                        <option value="10">10 miles</option>
                        <option value="25">25 miles</option>
                        <option value="50">50 miles</option>
                        <option value="100">100 miles</option>
                        <option value="1000">1000 miles</option>
                        <option value="10000">10000 miles</option>
                    </select>
                </div>
            <div className="home-posts-container">
                {posts.map((post) => (
                    <div onClick={()=>displayPost(post._id)} key={post._id}>
                    <PostCard post={post}  />
                    </div>
                ))}
            </div>

            {postClicked ? (
                <div className="post-preview-container">
                        <div className="post-preview-img-container">
                        <img className="post-preview-img" src={post.image} alt="post-preview" />
                    </div>
                    <div className="post-preview-info-container">
                    <div className="author-info">
                        <img className="home-post-author-img preview-profile-pic" src={post.author.profilePicture} alt="author-img" referrerPolicy="no-referrer"/>
                        <p className="home-post-author-name preview-username">{post.author.fullName}</p>
                        </div>
                    <div className="post-preview-title-container">
                        <p className="post-preview-title">{post.title}</p>
                    </div>
                    <div className="post-preview-compensation-container">
                        <p className="post-preview-compensation">${post.compensation}</p>
                    </div>
                    <div className="post-preview-description-container">
                        <p style={{marginBottom: "2px", fontWeight: "600"}}>Description</p>
                        <p className="post-preview-description">{post.description}</p>
                    </div>
                    <div className="post-preview-location-text">
                        <p className="location-description">Posted {time} in {location}</p>
                    </div>
                    <div className="post-preview-location-container">
                    <Map
                    mapboxAccessToken={MAPBOX_TOKEN}
                    initialViewState={{
                        latitude:post.location.latitude,
                        longitude: post.location.longitude,
                        width: "100%",
                        height: "100%",
                        zoom: 14,
                    }}
                    mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                    >
                        <Marker latitude={post.location.latitude} longitude={post.location.longitude} anchor="bottom" className="iframe">
                        </Marker>
                    </Map>
                    </div>
                    <div className="call-button-container">
                        <a className="call-button" href={`tel:${post.author.contactInfo}`}>Call</a>
                    </div>
                </div>
                <div className="post-preview-close-container">
                <FontAwesomeIcon onClick={previewClose} className="preview-close-button" icon={faXmark} size="xl" style={{color: "#e9efff",}} />
                </div>
            </div>
            ): null}
            <div className="navigate-map-button-container">
                <Link className="navigate-map-button"  to="/map">
                <p className="map-button-text">Show map</p>

                    <FontAwesomeIcon className="map-button" icon={faMap} style={{color: "#e9efff",}} />
                </Link>
                </div>
        </div>
        )}
    </div>
    );
};

export default HomePost;

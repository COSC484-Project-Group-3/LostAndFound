import './MapContainer.css';
import React from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { NavigationControl } from "react-map-gl";
import { MAPBOX_TOKEN } from '../../constants/env'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect } from "react";
import { PostService } from "../../services/post.service";
import PostCard from "../posts/PostCard";

const MapContainer = (props) => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPopup, setShowPopup] = React.useState(false);
    const [ mapStyle, setMapStyle ] = useState("mapbox://styles/mapbox/satellite-streets-v12");
    const [viewState, setViewState] = React.useState({
        latitude: 39.286072,
        longitude: -76.609825,
        width: "100%",
        height: "100%",
        zoom: 13,
    });
    
    useEffect(() => {
        setLoading(true);
        fetchAllPosts();
        setLoading(false);
    }, []);

    /**
     * A function that fetches all the posts
     */
    const fetchAllPosts = async () => {
        try {
            const res = await PostService.getAllPosts();
            setAllPosts(res.data.posts);
            setViewState({
                latitude: res.data.clientCoordinates.lat,
                longitude: res.data.clientCoordinates.lon,
                width: "100%",
                height: "100%",
                zoom: 13,
            });
        } catch (err) {
            console.log(err);
        }
    }

    const selectPost = async (post) => {
        console.log(post);
        setSelectedPost(post);
        setShowPopup(true);
    }
    const changeMapStyle = () => {
        if (mapStyle === "mapbox://styles/mapbox/satellite-streets-v12") {
            setMapStyle("mapbox://styles/mapbox/outdoors-v12");
        } else {
            setMapStyle("mapbox://styles/mapbox/satellite-streets-v12");
        }
    }
  return (
    // check loading
    <div className="map-card-container">
        {loading ? (<div>Loading...</div>) : (
    <div className="map-container">
            <Map
    mapboxAccessToken={MAPBOX_TOKEN}
    {...viewState}
    onMove={evt => setViewState(evt.viewState)}
    mapStyle= {mapStyle}
    >
        <div className="nav-controls">
            <NavigationControl />
        </div>
        <div className="map-style-controls">
           <FontAwesomeIcon className='satellite-style' onClick={changeMapStyle} icon={faMap} />
        </div>
        {/* map markers */}
        {allPosts.map((post, index) => (
            <Marker
                key={index}
                latitude={post.location.latitude}
                longitude={post.location.longitude}
            >
                {/* square button */}
                <button 
                className="map-marker-btn"
                onClick={e => {
                    e.preventDefault();
                    setSelectedPost(post);
                    console.log(post);
                    setShowPopup(true);
                  }}
                >
                    <p className="map-marker-text">${post.compensation}</p>
                </button>
            </Marker>
        ))}
        {/* check if selected post is true */}
        {showPopup && (
            <Popup
                latitude={selectedPost.location.latitude}
                longitude={selectedPost.location.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup(false)}
                className="map-popup"
            >
                <div className="map-popup-container">
                    <PostCard post={selectedPost} className="popup-post" />
                </div>
            </Popup>
        )}
    </Map>
    <div className="show-list-button-container">
        <Link className="show-list-button"  to="/">
        <p className="show-list-text">Show list</p>

            <FontAwesomeIcon className="list-button" icon={faList} style={{color: "#e9efff",}} />
        </Link>
    </div>
    </div>
        )}
    </div>
  )
};


export default MapContainer;


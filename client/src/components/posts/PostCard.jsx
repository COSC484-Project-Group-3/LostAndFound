import './PostCard.css';
import React from "react";
import PropTypes from "prop-types";

const PostCard = ({post}) => {

  return (
  <div className="post-card" >
    <div className="post-card-img-container">
        <img className="post-card-img" src={post.image} alt="post-img" />
    </div>
    <div className="post-card-title-container">
        <p className="post-card-title">{post.title}</p>
    </div>
    <div className="post-card-compensation-container"><p className="post-card-compensation">${post.compensation}</p></div>
    <div className="post-card-distance-container">
        {post.distance && <p className="post-card-distance">{Math.round(post.distance * 10) / 10} miles away</p>}
    </div>
  </div>
  );
};

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostCard;


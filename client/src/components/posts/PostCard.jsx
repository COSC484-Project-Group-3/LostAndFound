import './PostCard.css';
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';

const PostCard = ({post}) => {
  let isAuthor = false;
  if (AuthService.isLoggedIn()) {
    const userId = AuthService.getToken("id");
    if (userId == post.author._id) {
      isAuthor = true;
    }

  }

  const deletePost = async (postId) => {
    const response = window.confirm("Are you sure you want to delete post?");
    if (response) {
      await PostService.deletePost(postId).then (()=>{
        window.location.reload()
      });
    }
  }

  return (
  <div className="post-card" >
    {isAuthor &&  <div className="delete-button" onClick={()=> deletePost(post._id)}><FontAwesomeIcon icon={faTrashCan} style={{color: "#ff1514",}} /></div>}
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


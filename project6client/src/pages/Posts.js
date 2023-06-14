import { useEffect, useState } from "react";
import "./Posts.css";
import {
  requestsGet,
  requestsPost,
  requestsPut,
  requestsDelete,
} from "../requestsToServer.js";

const Post = ({ post, onPostSelect }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const handleToggleComments = async () => {
    if (showComments) {
      setShowComments(false);
    } else {
      try {
        const data = await requestsGet(`/posts/${post.id}/comments`);
        // const response = await fetch(
        //   `http://localhost:4000/posts/${post.id}/comments`
        // );
        // const data = await response.json();
        setComments(data);
        setShowComments(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="post-item">
      <h2
        className={`post-title ${onPostSelect === post.id ? "active" : ""}`}
        onClick={() => onPostSelect(post.id)}
      >
        {post.title}
      </h2>
      <div className="post-body">{post.body}</div>
      <button className="comments-toggle" onClick={handleToggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && (
        <div className="comments-container">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <h4 className="comment-name">{comment.name}</h4>
              <div className="comment-email">{comment.email}</div>
              <div className="comment-body">{comment.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        var user = JSON.parse(localStorage.getItem("currentUser"));

        const data = await requestsGet(`/users/${user.id}/posts`);
        // const response = await fetch(
        //   `http://localhost:4000/users/${user.id}/posts`
        // );
        // const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handlePostSelect = (postId) => {
    setSelectedPost(postId);
  };

  return (
    <div className="posts-container">
      <h1 className="posts-header">Posts</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <Post key={post.id} post={post} onPostSelect={handlePostSelect} />
        ))}
      </div>
    </div>
  );
};

export default Posts;

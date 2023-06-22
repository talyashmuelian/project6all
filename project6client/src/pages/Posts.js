// import { useEffect, useState } from "react";
// import "./Posts.css";
// import {
//   requestsGet,
//   requestsPost,
//   requestsPut,
//   requestsDelete,
// } from "../requestsToServer.js";

// const Post = ({ post, onPostSelect }) => {
//   const [showComments, setShowComments] = useState(false);
//   const [comments, setComments] = useState([]);

//   const handleToggleComments = async () => {
//     if (showComments) {
//       setShowComments(false);
//     } else {
//       try {
//         const data = await requestsGet(`/posts/${post.id}/comments`);
//         // const response = await fetch(
//         //   `http://localhost:4000/posts/${post.id}/comments`
//         // );
//         // const data = await response.json();
//         setComments(data);
//         setShowComments(true);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <div className="post-item">
//       <h2
//         className={`post-title ${onPostSelect === post.id ? "active" : ""}`}
//         onClick={() => onPostSelect(post.id)}
//       >
//         {post.title}
//       </h2>
//       <div className="post-body">{post.body}</div>
//       <button className="comments-toggle" onClick={handleToggleComments}>
//         {showComments ? "Hide Comments" : "Show Comments"}
//       </button>
//       {showComments && (
//         <div className="comments-container">
//           {comments.map((comment) => (
//             <div key={comment.id} className="comment-item">
//               <h4 className="comment-name">{comment.name}</h4>
//               <div className="comment-email">{comment.email}</div>
//               <div className="comment-body">{comment.body}</div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Posts = () => {
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         var user = JSON.parse(localStorage.getItem("currentUser"));

//         const data = await requestsGet(`/users/${user.id}/posts`);
//         // const response = await fetch(
//         //   `http://localhost:4000/users/${user.id}/posts`
//         // );
//         // const data = await response.json();
//         console.log(data);
//         setPosts(data);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchData();
//   }, []);

//   const handlePostSelect = (postId) => {
//     setSelectedPost(postId);
//   };

//   return (
//     <div className="posts-container">
//       <h1 className="posts-header">Posts</h1>
//       <div className="posts-list">
//         {posts.map((post) => (
//           <Post key={post.id} post={post} onPostSelect={handlePostSelect} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Posts;

import { useState, useEffect } from "react";
import "./Posts.css";
import {
  requestsGet,
  requestsPost,
  requestsPut,
  requestsDelete,
} from "../requestsToServer.js";

const PostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddPost({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3>Add Post</h3>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

const Post = ({ post, onPostSelect, onUpdatePost, onDeletePost }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const handleToggleComments = async () => {
    if (showComments) {
      setShowComments(false);
    } else {
      try {
        const data = await requestsGet(`/posts/${post.id}/comments`);
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
      <button className="edit-post-btn" onClick={() => onUpdatePost(post.id)}>
        Edit
      </button>
      <button className="delete-post-btn" onClick={() => onDeletePost(post.id)}>
        Delete
      </button>
    </div>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddPostForm, setShowAddPostForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        const data = await requestsGet(`/users/${user.id}/posts`);
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

  const handleAddPost = async (newPost) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const createdPost = await requestsPost(
        `/users/${user.id}/posts`,
        newPost
      );
      setPosts((prevPosts) => [...prevPosts, createdPost]);
      setShowAddPostForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = async (postId) => {
    const updatedTitle = prompt("Enter the new title:");
    const updatedBody = prompt("Enter the new body:");
    if (updatedTitle && updatedBody) {
      try {
        const updatedPost = await requestsPut(`/posts/${postId}`, {
          title: updatedTitle,
          body: updatedBody,
        });
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === postId ? updatedPost : post))
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await requestsDelete(`/posts/${postId}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="posts-container">
      <h1 className="posts-header">Posts</h1>
      <button
        className="add-post-btn"
        onClick={() => setShowAddPostForm(!showAddPostForm)}
      >
        {showAddPostForm ? "Cancel" : "Add Post"}
      </button>
      {showAddPostForm && <PostForm onAddPost={handleAddPost} />}
      <div className="posts-list">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onPostSelect={handlePostSelect}
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;

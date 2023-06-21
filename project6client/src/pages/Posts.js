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

import { useEffect, useState } from "react";
import "./Posts.css";
import {
  requestsGet,
  requestsPost,
  requestsPut,
  requestsDelete,
} from "../requestsToServer.js";

const Comment = ({ comment, onUpdateComment, onDeleteComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBody, setUpdatedBody] = useState(comment.body);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedBody(comment.body);
  };

  const handleSaveEdit = () => {
    onUpdateComment(comment.id, updatedBody);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteComment(comment.id);
  };

  return (
    <div className="comment-item">
      {!isEditing ? (
        <div className="comment-body">{comment.body}</div>
      ) : (
        <textarea
          className="comment-edit-input"
          value={updatedBody}
          onChange={(e) => setUpdatedBody(e.target.value)}
        />
      )}
      {!isEditing ? (
        <div className="comment-actions">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div className="comment-actions">
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
};

const Post = ({ post, onPostSelect, onUpdatePost, onDeletePost }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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

  const handleAddComment = async (event) => {
    event.preventDefault();
    const newCommentData = {
      postId: post.id,
      body: newComment,
    };

    try {
      const response = await requestsPost("/comments", newCommentData);
      const createdComment = response.data;
      setComments([...comments, createdComment]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = async (commentId, updatedBody) => {
    const updatedCommentData = {
      body: updatedBody,
    };

    try {
      await requestsPut(`/comments/${commentId}`, updatedCommentData);
      const updatedComments = comments.map((comment) =>
        comment.id === commentId ? { ...comment, body: updatedBody } : comment
      );
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await requestsDelete(`/comments/${commentId}`);
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
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
            <Comment
              key={comment.id}
              comment={comment}
              onUpdateComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
            />
          ))}
          <form className="comment-form" onSubmit={handleAddComment}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit">Add Comment</button>
          </form>
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

  const handleAddPost = async () => {
    const newPostData = {
      title: "New Post",
      body: "This is a new post.",
    };

    try {
      const response = await requestsPost("/posts", newPostData);
      const createdPost = response.data;
      setPosts([...posts, createdPost]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = async (postId, updatedTitle, updatedBody) => {
    const updatedPostData = {
      title: updatedTitle,
      body: updatedBody,
    };

    try {
      await requestsPut(`/posts/${postId}`, updatedPostData);
      const updatedPosts = posts.map((post) =>
        post.id === postId
          ? { ...post, title: updatedTitle, body: updatedBody }
          : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await requestsDelete(`/posts/${postId}`);
      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="posts-container">
      <h1 className="posts-header">Posts</h1>
      <button onClick={handleAddPost}>Add New Post</button>
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

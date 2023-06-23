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
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(comment.name);
  const [editedEmail, setEditedEmail] = useState(comment.email);
  const [editedBody, setEditedBody] = useState(comment.body);

  const handleEditComment = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedName(comment.name);
    setEditedEmail(comment.email);
    setEditedBody(comment.body);
  };

  const handleUpdateComment = async () => {
    try {
      const updatedComment = await requestsPut(`/comments/${comment.id}`, {
        name: editedName,
        email: editedEmail,
        body: editedBody,
      });
      onUpdateComment(updatedComment);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await requestsDelete(`/comments/${comment.id}`);
        onDeleteComment(comment.id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="comment-item">
      {editing ? (
        <div className="comment-edit">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
          <div className="comment-edit-actions">
            <button onClick={handleUpdateComment}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h4 className="comment-name">{comment.name}</h4>
          <div className="comment-email">{comment.email}</div>
          <div className="comment-body">{comment.body}</div>
          <div className="comment-actions">
            <button onClick={handleEditComment}>Edit</button>
            <button onClick={handleDeleteComment}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Post = ({ post, onPostSelect, onUpdatePost, onDeletePost }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

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

  const handleEditPost = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditedTitle(post.title);
    setEditedBody(post.body);
  };

  const handleUpdatePost = async () => {
    try {
      var user = JSON.parse(localStorage.getItem("currentUser"));

      const updatedPost = await requestsPut(`/posts/${post.id}`, {
        userId: user.id,
        id: 0,
        title: editedTitle,
        body: editedBody,
      });

      onUpdatePost(updatedPost);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await requestsDelete(`/posts/${post.id}`);
        onDeletePost(post.id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="post-item">
      {editing ? (
        <div className="post-edit">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
          <div className="post-edit-actions">
            <button onClick={handleUpdatePost}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h2
            className={`post-title ${onPostSelect === post.id ? "active" : ""}`}
            onClick={() => onPostSelect(post.id)}
          >
            {post.title}
          </h2>
          <div className="post-body">{post.body}</div>
          <div className="post-actions">
            <button onClick={handleEditPost}>Edit</button>
            <button onClick={handleDeletePost}>Delete</button>
          </div>
          <button className="comments-toggle" onClick={handleToggleComments}>
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>
          {showComments && (
            <div className="comments-container">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onUpdateComment={setComments}
                  onDeleteComment={setComments}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [addingPost, setAddingPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

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

  const handleAddPost = () => {
    setAddingPost(true);
  };

  const handleCancelAddPost = () => {
    setAddingPost(false);
    setNewPostTitle("");
    setNewPostBody("");
  };

  const handleSavePost = async () => {
    try {
      var user = JSON.parse(localStorage.getItem("currentUser"));
      const newPost = await requestsPost(`/posts`, {
        userId: user.id,
        id: 0,
        title: newPostTitle,
        body: newPostBody,
      });
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setAddingPost(false);
      setNewPostTitle("");
      setNewPostBody("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      )
    );
  };

  const handleDeletePost = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  return (
    <div className="posts-container">
      <h1 className="posts-header">Posts</h1>
      {addingPost ? (
        <div className="add-post-form">
          <input
            type="text"
            placeholder="Enter post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter post body"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
          />
          <div className="add-post-actions">
            <button onClick={handleSavePost}>Save</button>
            <button onClick={handleCancelAddPost}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="add-post-button" onClick={handleAddPost}>
          Add Post
        </button>
      )}
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

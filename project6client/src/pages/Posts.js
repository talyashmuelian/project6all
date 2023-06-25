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
      const updatedComment = {
        postId: comment.postId,
        id: comment.id,
        name: editedName,
        email: editedEmail,
        body: editedBody,
      };
      await requestsPut(`/comments/${comment.id}`, updatedComment);
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

const Post = ({ post, onUpdatePost, onDeletePost }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    body: "",
  });
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

  const handleAddComment = async () => {
    try {
      //const createdComment = await requestsPost(`/posts/${post.id}/comments`, {
      const createdComment = {
        postId: post.id,
        id: 0,
        name: newComment.name,
        email: newComment.email,
        body: newComment.body,
      };
      let createdCommentFromServer = await requestsPost(
        `/comments`,
        createdComment
      );

      setComments([...comments, createdCommentFromServer]);
      setNewComment({ name: "", email: "", body: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = (updatedComment) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === updatedComment.id) {
        return updatedComment;
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  // const handleUpdateComment = async (updatedComment) => {
  //   try {
  //     console.log("line252");
  //     console.log(updatedComment);
  //     await requestsPut(`/comments/${updatedComment.id}`, updatedComment);
  //     const updatedComments = comments.map((comment) => {
  //       if (comment.id === updatedComment.id) {
  //         return updatedComment;
  //       }
  //       return comment;
  //     });
  //     setComments(updatedComments);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleDeleteComment = async (commentId) => {
  //   try {
  //     await requestsDelete(`/comments/${commentId}`);
  //     const updatedComments = comments.filter(
  //       (comment) => comment.id !== commentId
  //     );
  //     setComments(updatedComments);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
      const updatedPost = {
        id: post.id,
        userId: post.userId,
        title: editedTitle,
        body: editedBody,
      };
      await requestsPut(`/posts/${post.id}`, updatedPost);
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
          <h2 className="post-title">{post.title}</h2>
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
                  onUpdateComment={handleUpdateComment}
                  onDeleteComment={handleDeleteComment}
                />
              ))}
              {/* {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onUpdateComment={(updatedComment) =>
                    handleUpdateComment(updatedComment)
                  }
                  onDeleteComment={() => handleDeleteComment(comment.id)}
                />
              ))} */}
              <div className="comment-form">
                <input
                  type="text"
                  placeholder="Name"
                  value={newComment.name}
                  onChange={(e) =>
                    setNewComment({ ...newComment, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newComment.email}
                  onChange={(e) =>
                    setNewComment({ ...newComment, email: e.target.value })
                  }
                />
                <textarea
                  placeholder="Comment"
                  value={newComment.body}
                  onChange={(e) =>
                    setNewComment({ ...newComment, body: e.target.value })
                  }
                />
                <button onClick={handleAddComment}>Add Comment</button>
              </div>
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
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

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
    try {
      var user = JSON.parse(localStorage.getItem("currentUser"));
      let createdPost = {
        userId: user.id,
        id: 0,
        title: newPost.title,
        body: newPost.body,
      };
      let createdPostFromServer = await requestsPost(`/posts`, createdPost);
      console.log();
      setPosts([...posts, createdPostFromServer]);
      setNewPost({ title: "", body: "" });
    } catch (error) {
      console.error(error);
    }
  };

  // const handleAddPost = async () => {
  //   try {
  //     var user = JSON.parse(localStorage.getItem("currentUser"));
  //     const createdPost = await requestsPost(`/posts`, {
  //       userId: user.id,
  //       id: 0,
  //       title: newPost.title,
  //       body: newPost.body,
  //     });
  //     setPosts([...posts, createdPost]);
  //     setNewPost({ title: "", body: "" });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleUpdatePost = (updatedPost) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === updatedPost.id) {
        return updatedPost;
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setSelectedPost(null);
  };

  return (
    <div className="posts-container">
      <h1 className="posts-header">Posts</h1>
      <div className="posts-list">
        <div className="add-post-form">
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            placeholder="Body"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <button onClick={handleAddPost}>Add Post</button>
        </div>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;

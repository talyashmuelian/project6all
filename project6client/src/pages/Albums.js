import { useEffect, useState } from "react";
import "./Posts.css";
import Photos from "./Photos";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Album = ({ album, onAlbumSelect }) => {
  return (
    <div className="post-item" onClick={() => onAlbumSelect(album.id)}>
      <h2
        className={`post-title ${onAlbumSelect === album.id ? "active" : ""}`}
      >
        {album.title}
      </h2>
    </div>
  );
};

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${user.id}/albums`
        );
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleAlbumSelect = (albumId) => {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    window.location.href = `/Users/${user.id}/Albums/${albumId}/Photos`;
  };

  return (
    <div className="posts-container">
      <h1 className="posts-header">Albums</h1>
      <div className="posts-list">
        {albums.map((album) => (
          <Album
            key={album.id}
            album={album}
            onAlbumSelect={handleAlbumSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Albums;

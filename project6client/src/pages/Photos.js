import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Photos.css";

const Photos = () => {
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [start, setStart] = useState(0);

  let { albumId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_start=${start}&_limit=10`
        );
        const data = await response.json();
        setLoadedPhotos((current) => [...current, ...data]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [albumId, start]);

  const loadMorePhotos = () => {
    setStart((prevPage) => prevPage + 10);
  };

  return (
    <div className="photos-container">
      <h1>Photos</h1>
      <div className="photo-grid">
        {loadedPhotos.map((photo) => (
          <div className="photo-item" key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <div className="photo-overlay">
              <span className="photo-title">{photo.title}</span>
            </div>
          </div>
        ))}
      </div>
      {loadedPhotos.length <= 50 && (
        <button className="load-more-btn" onClick={loadMorePhotos}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Photos;

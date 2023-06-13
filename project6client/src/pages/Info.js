import "./Info.css";
import { useEffect, useState } from "react";

const Info = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  return (
    <div className="info-container">
      <h1 className="info-header">Info</h1>
      {user && (
        <div className="background">
          <div className="info-details">
            <h3 className="info-item">ID: {user.id}</h3>
            <h3 className="info-item">Name: {user.name}</h3>
            <h3 className="info-item">Username: {user.username}</h3>
            <h3 className="info-item">Email: {user.email}</h3>
            <div className="info-address">
              <h2 className="info-subheader">Address:</h2>
              <h3 className="info-item">Street: {user.address.street}</h3>
              <h3 className="info-item">Suite: {user.address.suite}</h3>
              <h3 className="info-item">City: {user.address.city}</h3>
              <h3 className="info-item">Zipcode: {user.address.zipcode}</h3>
              <h3 className="info-item">Lat: {user.address.geo.lat}</h3>
              <h3 className="info-item">Lng: {user.address.geo.lng}</h3>
            </div>
            <br />
            <h3 className="info-item">Phone: {user.phone}</h3>
            <h3 className="info-item">Website: {user.website}</h3>
            <div className="info-company">
              <h2 className="info-subheader">Company:</h2>
              <h3 className="info-item">Name: {user.company.name}</h3>
              <h3 className="info-item">
                Catch Phrase: {user.company.catchPhrase}
              </h3>
              <h3 className="info-item">BS: {user.company.bs}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;

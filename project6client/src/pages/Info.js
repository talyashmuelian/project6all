import "./Info.css";
import { useEffect, useState } from "react";
import {
  requestsGet,
  requestsPost,
  requestsPut,
  requestsDelete,
} from "../requestsToServer.js";

const Info = () => {
  const [user, setUser] = useState(null);
  const [editDiv, setEditDiv] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  const UpdateUser = function(){
    setEditDiv(null);
    let newInUser = {
      id: user.id,
      name: "talyaupdate",
      username: "talya",
      email: "talya@karina.biz",
      phone: "024-648-3800",
      website: "talya",
      rank: "user",
      api_key: "zLCyhlxcVRCisJNX9hUt",
    };
    requestsPut("/users", newInUser);
  }

  const EditeUser = function(){
    setEditDiv(<div>
      <div className="info-details">
            <input id="NameAdit" className="info-item" value="Name"/>
            <input  id="UsernameAdit" className="info-item" value="Username"/>
            <input  id="EmailAdit" className="info-item" value="Email"/>
            <input id="PhoneAdit" className="info-item" value="Phone"/>
            <input id="WebsiteAdit" className="info-item" value="Website"/>
            <button onClick={UpdateUser}>edit</button>
          </div>
      
    </div>)
  }

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

            <br />
            <h3 className="info-item">Phone: {user.phone}</h3>
            <h3 className="info-item">Website: {user.website}</h3>
          </div>
        </div>
      )}
      <button onClick={EditeUser}>Update</button>
      <div>
        {editDiv}
      </div>
    </div>
  );
};

export default Info;

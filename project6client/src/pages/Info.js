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
  const [inputs, setInputs] = useState({});
  const [visibilityEdit, setVisibilityEdit] = useState({
    visibility: "hidden",
  }); // visible

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(currentUser);
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const UpdateUser = function () {
    //setEditDiv(null);
    setVisibilityEdit({ visibility: "hidden" });
    let newInUser = {
      id: user.id,
      name: inputs.name || user.name,
      username: user.username,
      email: inputs.email || user.email,
      phone: inputs.phone || user.phone,
      website: inputs.website || user.website,
      rank: user.rank,
      api_key: user.api_key,
    };
    //requestsPut("/users", newInUser);//<<<
    setInputs({});

    setUser(newInUser);
    var json = JSON.stringify(newInUser);
    localStorage.setItem("currentUser", json);
    requestsPut(`/users/${user.id}`, newInUser);
  };

  const EditUser = function () {
    setVisibilityEdit({ visibility: "visible" });
  };

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
      <button onClick={EditUser}>Edit</button>
      <div>
        <div>
          <div style={visibilityEdit} className="info-details">
            <input
              name="name"
              className="info-item"
              type="text"
              value={inputs.name || "Name"}
              onChange={handleChange}
            />
            {/* <input id="UsernameAdit" className="info-item" value="Username"
            value={inputs.username || "Username"}/> */}
            <input
              name="email"
              className="info-item"
              type="text"
              value={inputs.email || "Email"}
              onChange={handleChange}
            />
            <input
              name="phone"
              className="info-item"
              type="text"
              value={inputs.phone || "Phone"}
              onChange={handleChange}
            />
            <input
              name="website"
              className="info-item"
              type="text"
              value={inputs.website || "Website"}
              onChange={handleChange}
            />
            <button onClick={UpdateUser}>Update</button>
          </div>
        </div>

        {editDiv}
      </div>
    </div>
  );
};

export default Info;

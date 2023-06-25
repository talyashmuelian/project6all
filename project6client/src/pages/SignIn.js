import { useState } from "react";
//import ReactDOM from "react-dom/client";
import "./Registration.css";
import { Link } from "react-router-dom";
import { requestsPost } from "../requestsToServer";

const Registration = () => {
  const [user, setUser] = useState({
    id: 0,
    username: "",
    password: "",
  });
  const [inputs, setInputs] = useState({});
  // const [visibilityMoreInfo, setvisibilityMoreInfo] = useState({
  //   visibility: "hidden"
  // });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleChangeI = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  async function fetchData() {
    try {
      console.log(user);
      requestsPost(`/passwords`, user);
      setUser({
        id: 0,
        username: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchInfo() {
    try {
      setvisibilityMoreInfo({visibility: "hidden"})
      let newInUser = {
        id: user.id,
        name: inputs.name || "name",
        username: user.username,
        email: inputs.email || "email",
        phone: inputs.phone || "0",
        website: inputs.website || "website",
        rank: "user", 
        api_key: "0",
      };
      setInputs({});
      //var json = JSON.stringify(newInUser);
      console.log(newInUser);
      requestsPost(`/users`, newInUser);

    } catch (error) {
      console.error(error);
    }
  }

  // const MoreInfo = function () {
  //   setvisibilityMoreInfo({ visibility: "visible" });
  // };

  const handleSubmit = async (event) => {
    try{
      event.preventDefault();
      console.log("line36");
      console.log(user);
      await fetchInfo();
      await fetchData();
      window.location.href = "/Login";
    }
    catch{
      //error
    }
    
    
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <h1>User Registration</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
        <div>
          <Link to={`/Login`}>Login</Link>
        </div>
        <h3>More Info</h3>
         <div  className="info-details">
          <input
            name="name"
            className="info-item"
            type="text"
            value={inputs.name || "Name"}
            onChange={handleChangeI}
          />
          <input
            name="email"
            className="info-item"
            type="text"
            value={inputs.email || "Email"}
            onChange={handleChangeI}
          />
          <input
            name="phone"
            className="info-item"
            type="text"
            value={inputs.phone || "Phone"}
            onChange={handleChangeI}
          />
          <input
            name="website"
            className="info-item"
            type="text"
            value={inputs.website || "Website"}
            onChange={handleChangeI}
          />
      </div>
      </form>
 
    </div>
  );
};

export default Registration;
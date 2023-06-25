import { useState } from "react";
import ReactDOM from "react-dom/client";
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
  const [visibilityMoreInfo, setvisibilityMoreInfo] = useState({
    visibility: "hidden"
  }); // visible

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
      //const data = await
      requestsPost(`/passwords`, user);
      setUser({
        id: 0,
        username: "",
        password: "",
      });
      //console.log(data);

    } catch (error) {
      console.error(error);
    }
  }

  async function fetchInfo() {
    try {
      //const data = await
      setvisibilityMoreInfo({visibility: "hidden"})
      let newInUser = {
        id: user.id,
        name: inputs.name || user.name,
        username: user.username,
        email: inputs.email || user.email,
        phone: inputs.phone || user.phone,
        website: inputs.website || user.website,
        rank: "", //??
        api_key: "", //???
      };
      //requestsPut("/users", newInUser);//<<<
      setInputs({});
  
      var json = JSON.stringify(newInUser);
      localStorage.setItem("currentUser", json);
      requestsPost(`/users`, newInUser);

    } catch (error) {
      console.error(error);
    }
  }

  const MoreInfo = function () {
    setvisibilityMoreInfo({ visibility: "visible" });
  };

  const handleSubmit = (event) => {
    //debugger;
    event.preventDefault();
    console.log("line36");
    console.log(user);
    //setUser({ id: 0, username: user.username, password: user.password });???
    fetchInfo()
    fetchData();

/*  requestsPost(`/passwords`, user);
    setUser({
      id: "",
      username: "",
      password: "",
    });
    //console.log(data);
*/
    
    // Perform registration logic or API request here
    // Reset the form fields
    window.location.href = "/Login";
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
        {/* <button onClick={MoreInfo}>More Info</button> */}
        <h3>More Info</h3>
         <div  className="info-details"> {/*style={visibilityMoreInfo} */}
          <input
            name="name"
            className="info-item"
            type="text"
            value={inputs.name || "Name"}
            onChange={handleChangeI}
          />
          {/* <input id="UsernameAdit" className="info-item" value="Username"
          value={inputs.username || "Username"}/> */}
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
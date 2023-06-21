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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  async function fetchData() {
    try {
      //const data = await
      requestsPost(`/passwords`, user);
      setUser({
        id: "",
        username: "",
        password: "",
      });
      //console.log(data);

      window.location.href = "/Login";
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (event) => {
    //debugger;
    event.preventDefault();
    console.log("line36");
    console.log(user);
    setUser({ id: 0, username: user.username, password: user.password });
    //fetchData();
    requestsPost(`/passwords`, user);
    setUser({
      id: "",
      username: "",
      password: "",
    });
    //console.log(data);

    window.location.href = "/Login";
    // Perform registration logic or API request here
    // Reset the form fields
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
      </form>
    </div>
  );
};

export default Registration;

/**import React, { useState } from "react";
import './Registration.css';

export default function Registration() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value
      }
    }));
  };

  const handleGeoChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        geo: {
          ...prevUser.address.geo,
          [name]: value
        }
      }
    }));
  };

  const registerUser = () => {
    const userJSON = JSON.stringify(user);
    // Perform registration logic or API request here
    console.log(userJSON);
    // Clear form fields
    setUser({
      id: "",
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: ""
        }
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: ""
      }
    });
  };

  return (
    <div id="registrationContainer">
      <h1 id="welcome">User Registration</h1>
      <form>
        <label className="label" htmlFor="name">Name:</label>
        <input className="box" type="text" id="name" name="name" required
          placeholder="Name" value={user.name} onChange={handleInputChange}></input>

        <label className="label" htmlFor="username">Username:</label>
        <input className="box" type="text" id="username" name="username" required
          placeholder="Username" value={user.username} onChange={handleInputChange}></input>

        <label className="label" htmlFor="email">Email:</label>
        <input className="box" type="email" id="email" name="email" required
          placeholder="Email" value={user.email} onChange={handleInputChange}></input>

        <label className="label" htmlFor="street">Street:</label>
        <input className="box" type="text" id="street" name="street" required
          placeholder="Street" value={user.address.street} onChange={handleAddressChange}></input>

        <label className="label" htmlFor="suite">Suite:</label>
        <input className="box" type="text" id="suite" name="suite" required
          placeholder="Suite" value={user.address.suite} onChange={handleAddressChange}></input>

<label className="label" htmlFor="city">City:</label>
        <input
          className="box"
          type="text"
          id="city"
          name="city"
          required
          placeholder="City"
          value={user.address.city}
          onChange={handleAddressChange}
        />

        <label className="label" htmlFor="zipcode">Zip Code:</label>
        <input
          className="box"
          type="text"
          id="zipcode"
          name="zipcode"
          required
          placeholder="Zip Code"
          value={user.address.zipcode}
          onChange={handleAddressChange}
        />

        <label className="label" htmlFor="latitude">Latitude:</label>
        <input
          className="box"
          type="text"
          id="latitude"
          name="lat"
          required
          placeholder="Latitude"
          value={user.address.geo.lat}
          onChange={handleGeoChange}
        />

        <label className="label" htmlFor="longitude">Longitude:</label>
        <input
          className="box"
          type="text"
          id="longitude"
          name="lng"
          required
          placeholder="Longitude"
          value={user.address.geo.lng}
          onChange={handleGeoChange}
        />

        <label className="label" htmlFor="phone">Phone:</label>
        <input
          className="box"
          type="text"
          id="phone"
          name="phone"
          required
          placeholder="Phone"
          value={user.phone}
          onChange={handleInputChange}
        />

        <label className="label" htmlFor="website">Website:</label>
        <input
          className="box"
          type="text"
          id="website"
          name="website"
          required
          placeholder="Website"
          value={user.website}
          onChange={handleInputChange}
        />

        <label className="label" htmlFor="companyName">Company Name:</label>
        <input
          className="box"
          type="text"
          id="companyName"
          name="name"
          required
          placeholder="Company Name"
          value={user.company.name}
          onChange={handleCompanyChange}
        />

        <label className="label" htmlFor="catchPhrase">Catch Phrase:</label>
        <input
          className="box"
          type="text"
          id="catchPhrase"
          name="catchPhrase"
          required
          placeholder="Catch Phrase"
          value={user.company.catchPhrase}
          onChange={handleCompanyChange}
        />

        <label className="label" htmlFor="bs">Business Scope:</label>
        <input
          className="box"
          type="text"
          id="bs"
          name="bs"
          required
          placeholder="Business Scope"
          value={user.company.bs}
          onChange={handleCompanyChange}
        />

        <button id="register" onClick={registerUser}>Register</button>
        <footer className="footer">COPYRIGHT © 2023 BY AVITAL & RUT</footer>
      </form>
    </div>
  );
}
*/

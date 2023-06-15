import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./Login.css";
import {
  requestsGet
} from "../requestsToServer.js";

const Login = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  async function fetchData() {
    try {
      const data = await requestsGet(`/users`);
      // const response = await fetch(
      //   "https://jsonplaceholder.typicode.com/users"
      // );
      // const data = await response.json();
      console.log(data);
      let latArr;
      let exist = false;
      for (let i of data) {
        latArr = i["address"]["geo"].lat.split(".");
        if (
          i["username"] === inputs.username &&
          latArr[1] === inputs.password
        ) {
          var json = JSON.stringify(i);
          localStorage.setItem("currentUser", json);
          exist = true;
          window.location.href = "/Users";
        }
      }
      if (exist === false) {
        alert("Username or password is incorrect");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    fetchData();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

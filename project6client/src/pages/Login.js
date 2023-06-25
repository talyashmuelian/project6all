import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import "./Login.css";
import { requestsGet } from "../requestsToServer.js";

const Login = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  async function fetchData() {
    try {
      const data = await requestsGet(
        `/passwords?username=${inputs.username}&password=${inputs.password}`
      );

      console.log(data);
      let exist = false;
      if (data.length !== 0) {
        {
          const dataUser = await requestsGet(
            `/users?username=${inputs.username}`
          );
          console.log(dataUser);

          var json = JSON.stringify(dataUser[0]);
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
        <div>
          <Link to={`/register`}>Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

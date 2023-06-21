import { useState, useEffect } from "react";
import "./Todos.css";
import {
  requestsGet,
  requestsPost,
  requestsPut,
  requestsDelete,
} from "../requestsToServer.js";

const Select = ({ onSort }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const sortType = event.target.value;
    setSelectedValue(sortType);
    onSort(sortType);
  };

  return (
    <div className="selectComp">
      <label htmlFor="select">Choose an option:</label>
      <select id="select" value={selectedValue} onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="serial">Serial</option>
        <option value="execution">Execution</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="random">Random</option>
      </select>
      <p>You selected: {selectedValue}</p>
    </div>
  );
};

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [addFlag, setAddFlag] = useState(false);
  const [title, setTitle] = useState("");
  const [updateId, setUpdateId] = useState(null); // New state variable
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateCompleted, setUpdateCompleted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        const data = await requestsGet(`/users/${user.id}/todos`);

        // const response = await fetch(
        //   `http://localhost:4000/users/${user.id}/todos`
        // );
        // const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [addFlag]);

  const handleToggleTodo = (id) => {
    let newObj;
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        newObj = {
          ...todo,
          completed: !todo.completed,
        };
        requestsPut(`/todos/${id}`, newObj);
        return newObj;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleSortTodos = (sortType) => {
    let sortedTodos = [...todos];

    switch (sortType) {
      case "serial":
        sortedTodos.sort((a, b) => a.id - b.id);
        break;
      case "execution":
        sortedTodos.sort((a, b) => a.completed - b.completed);
        break;
      case "alphabetical":
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "random":
        sortedTodos.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }

    setTodos(sortedTodos);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var user = JSON.parse(localStorage.getItem("currentUser"));
    let newTodo = {
      userId: user.id,
      id: 0,
      title: title,
      completed: 0,
    };
    requestsPost("/todos", newTodo);

    setAddFlag(true); //עדיין צריך לרפרש
  };

  // const handleUpdate = (id) => {
  //   let updatedTodo;
  //   const updatedTodos = todos.map((todo) => {
  //     if (todo.id === id) {
  //       updatedTodo = {
  //         ...todo,
  //         title: "updated is work",
  //         completed: 1,
  //       };
  //       requestsPut(`/todos/${id}`, updatedTodo);
  //       return updatedTodo;
  //     }
  //     return todo;
  //   });

  //   setTodos(updatedTodos);
  // };

  const handleUpdate = (id) => {
    setUpdateId(id); // Set the ID of the todo to be updated
    const todoToUpdate = todos.find((todo) => todo.id === id);
    setUpdateTitle(todoToUpdate.title);
    setUpdateCompleted(todoToUpdate.completed);
  };
  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const updatedTodo = {
      ...todos.find((todo) => todo.id === updateId),
      title: updateTitle,
      completed: updateCompleted,
    };
    requestsPut(`/todos/${updateId}`, updatedTodo);

    const updatedTodos = todos.map((todo) =>
      todo.id === updateId ? updatedTodo : todo
    );
    setTodos(updatedTodos);
    setUpdateId(null); // Reset the update ID
  };

  const handleDelete = (id) => {
    requestsDelete(`/todos/${id}`);

    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todos-container">
      <h1 className="todos-header">Todos</h1>
      <Select onSort={handleSortTodos} />
      <form onSubmit={handleSubmit}>
        <h4>add todo</h4>
        <div className="form-group">
          <input
            type="text"
            id="todo"
            name="todo"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>

      <div className="background">
        <div className="todos-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <label className="todo-label">
                <span className="todo-id">{todo.id}</span>
                <span className="todo-id">- </span>
                <span className="todo-title">{todo.title}</span>
                <input
                  type="checkbox"
                  className="todo-checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span className="todo-checkmark"></span>
                <button onClick={() => handleUpdate(todo.id)}>update</button>
                <button onClick={() => handleDelete(todo.id)}>
                  delete
                </button>{" "}
                {/* Added delete functionality */}
              </label>
              {updateId === todo.id && (
                <form onSubmit={handleUpdateSubmit}>
                  <input
                    type="text"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                  />
                  <label>
                    Completed:
                    <input
                      type="checkbox"
                      checked={updateCompleted}
                      onChange={(e) => setUpdateCompleted(e.target.checked)}
                    />
                  </label>
                  <button type="submit">Save</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todos;

// let newPost = {
//   userId: user.id,
//   id: 0,
//   title: title,
//   body: "body",
// };
// requestsPost("/posts", newPost);

// let newInUser = {
//   id: 0,
//   name: "talyaupdate",
//   username: "talya",
//   email: "talya@karina.biz",
//   phone: "024-648-3800",
//   website: "talya",
//   rank: "user",
//   api_key: "zLCyhlxcVRCisJNX9hUt",
// };
// requestsPost("/users", newInUser);

// let newUser = {
//   id: 0,
//   username: "talya2",
//   password: "2",
// };
// requestsPost("/passwords", newUser);

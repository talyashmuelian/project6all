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
  const [updateCompleted, setUpdateCompleted] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        var user = JSON.parse(localStorage.getItem("currentUser"));
        const data = await requestsGet(`/users/${user.id}/todos`);
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
          completed: todo.completed ? 0 : 1,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    var user = JSON.parse(localStorage.getItem("currentUser"));
    let newTodo = {
      userId: user.id,
      id: 0,
      title: title,
      completed: 0,
    };
    let newTodoFromServer = await requestsPost("/todos", newTodo);
    setTodos([...todos, newTodoFromServer]);
  };

  const handleUpdate = (id) => {
    setUpdateId(id); // Set the ID of the todo to be updated
    const todoToUpdate = todos.find((todo) => todo.id === id);
    setUpdateTitle(todoToUpdate.title);
    setUpdateCompleted(todoToUpdate.completed);
  };
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const updatedTodo = {
      ...todos.find((todo) => todo.id === updateId),
      title: updateTitle,
      completed: updateCompleted ? 1 : 0,
    };
    await requestsPut(`/todos/${updateId}`, updatedTodo);

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
              <div className="todo-content">
                <label className="todo-label">
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                  <span className="todo-checkmark"></span>
                </label>
                <span className="todo-title">{todo.title}</span>
                <div className="todo-buttons">
                  <button onClick={() => handleUpdate(todo.id)}>Update</button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </div>

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
                      onChange={(e) =>
                        setUpdateCompleted(e.target.checked ? 1 : 0)
                      }
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
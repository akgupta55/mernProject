import { useEffect, useState } from "react";
import "./Container.css";
import axios from "axios";

function Container() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  function handleAddTodo() {
    axios
      .post("http://localhost:3001/add", { task: task })
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));
  }

  function handleRemoveTodo(id) {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));
  }

  function handlecheked(id) {
    axios
      .put("http://localhost:3001/update/" + id)
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container_box">
      <h2>TO DO APP</h2>
      <div className="task_input">
        <button onClick={handleAddTodo}>+</button>
        <input
          type="text"
          placeholder="Enter Your Today Task..."
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            // console.log(task);
          }}
        />
      </div>
      <div className="tasks_display">
        {todos.length === 0 ? (
          <div>
            <h1>No Record</h1>
          </div>
        ) : (
          todos.map((data) => (
            <div key={data._id} className="decoration">
              <div className="checkbox" onClick={() => handlecheked(data._id)}>
                {data.done ? (
                  <i className="bx bx-check-circle"></i>
                ) : (
                  <i className="bx bx-circle"></i>
                )}
              </div>
              <div
                className="wrapper"
                style={{
                  textDecoration: data.done ? "line-through" : "none",
                }}
              >
                <p>{data.task}</p>
              </div>

              {data.done ? (
                <button onClick={() => handleRemoveTodo(data._id)}>X</button>
              ) : (
                <></>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Container;

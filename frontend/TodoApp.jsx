import { useEffect, useState } from "react";
import axios from "axios";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios.get("https://rishabh-backend.blockchainaustralia.link/todos").then((res) => setTodos(res.data));
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    axios.post("https://rishabh-backend.blockchainaustralia.link/todos", { title: newTodo, completed: false }).then((res) => {
      setTodos([...todos, res.data]);
      setNewTodo("");
    });
  };

  const toggleComplete = (id, completed) => {
    axios.put(`https://rishabh-backend.blockchainaustralia.link/todos/${id}`, { completed: !completed }).then((res) => {
      setTodos(todos.map(todo => todo._id === id ? res.data : todo));
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`https://rishabh-backend.blockchainaustralia.link/todos/${id}`).then(() => {
      setTodos(todos.filter(todo => todo._id !== id));
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">To-Do List</h1>
      <div className="flex gap-2 my-4">
        <input
          type="text"
          className="border p-2 flex-1"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo} className="bg-blue-500 text-white p-2">Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="flex justify-between p-2 border-b">
            <span
              className={`cursor-pointer ${todo.completed ? "line-through" : ""}`}
              onClick={() => toggleComplete(todo._id, todo.completed)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)} className="text-red-500">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

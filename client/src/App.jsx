import { useState, useEffect } from "react";
import api from "./api";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const { data } = await api.post(url, form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {!isLogin && <input name="name" placeholder="Name" onChange={change} />}
      <input name="email" placeholder="Email" onChange={change} />
      <input name="password" type="password" placeholder="Password" onChange={change} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">{isLogin ? "Login" : "Sign up"}</button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin ? "New here? Register" : "Have an account? Login"}
      </p>
    </form>
  );
}

function Todos({ onLogout }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    api.get("/todos").then((res) => setTodos(res.data));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const { data } = await api.post("/todos", { title });
    setTodos([data, ...todos]);
    setTitle("");
  };

  const toggle = async (todo) => {
    const { data } = await api.put(`/todos/${todo._id}`, { completed: !todo.completed });
    setTodos(todos.map((t) => (t._id === data._id ? data : t)));
  };

  const remove = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div>
      <h2>Hi {localStorage.getItem("name")} 👋</h2>
      <button onClick={onLogout}>Logout</button>

      <form onSubmit={addTodo}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo..." />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((t) => (
          <li key={t._id}>
            <span
              onClick={() => toggle(t)}
              style={{ textDecoration: t.completed ? "line-through" : "none", cursor: "pointer" }}
            >
              {t.title}
            </span>
            <button onClick={() => remove(t._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return loggedIn ? <Todos onLogout={logout} /> : <Auth onLogin={() => setLoggedIn(true)} />;
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      navigate("/game");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="bg-gray-700 p-8 rounded-lg">
      <h2 className="text-3xl mb-5">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col justify-center gap-4">
        <input className="bg-gray-800 p-2 rounded-lg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="bg-gray-800 p-2 rounded-lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      {error && <p className="text-red-500">{error}</p>}
      </form>
      <p className="mt-4">Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default Login;

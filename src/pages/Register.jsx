import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/register`, {
        email,
        username,
        password
      });

      navigate("/login");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="bg-gray-700 p-8 rounded-lg">
    <h2 className="text-3xl mb-5">Register</h2>
    <form onSubmit={handleRegister} className="flex flex-col justify-center gap-4">
        <input className="bg-gray-800 p-2 rounded-lg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="bg-gray-800 p-2 rounded-lg" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="bg-gray-800 p-2 rounded-lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">Register</button>
        {error && <p className="text-red-500">{error}</p>}
    </form>
    <p className="mt-4">Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a></p>
    </div>
  );
};

export default Register;

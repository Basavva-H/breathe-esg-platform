import { useState } from "react";
import axios from "axios";

function Login() {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "https://breathe-esg-backend-b7pe.onrender.com/token/",
        {
          username,
          password
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      window.location.href = "/";

    } catch (error) {

      console.error(error);

      setError("Invalid credentials");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          ESG Platform Login
        </h1>

        {
          error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )
        }

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;
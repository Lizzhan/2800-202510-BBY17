import { React, useState} from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
// import axios from 'axios'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })

  const [err, setErr] = useState(null);

  const navigate = useNavigate();


  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:3000/api/auth/login", inputs, {
        withCredentials: true
      });
      navigate("/");
    }catch(err){
      setErr(err.response.data);
      console.log(err)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-4">Login</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>
          {err && <p className="text-red-500 text-sm text-center">{err}</p>}
          <span className="text-center text-sm text-gray-600">
            No account?{' '}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Register
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Login
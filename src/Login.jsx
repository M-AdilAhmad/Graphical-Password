import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'

function Login({ setFile, file }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!file) {
      return;
    }

    fetch(`http://127.0.0.1:8000/api/login?email=${email}`, {
      method: 'POST',
      body: file,
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, 
      },
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.success){
        setFile(null)
        navigate('/auth', { state: {username: data.message}})
      }
      else{
        alert(data.message)
      }
    })
    .catch((err) => console.error(err));
  };

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Welcome back!</h2>
        <div className="inputbox">
          <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="inputbox">
          <label>
            Password:
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
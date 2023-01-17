import { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Signup({ setFile, file }) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fname: "", lname: "", email: ""
  })

  const handleChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!file) {
      return;
    }

    fetch(`http://127.0.0.1:8000/api/register?email=${userData.email}&first_name=${userData.fname}&last_name=${userData.lname}`, {
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
            alert('User Registered! Login to visit your home page.')
            navigate('/')
          }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2>Welcome to Graphical Password!</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <label>
            First Name:
            <input
              type="text"
              value={userData.fname}
              required
              onChange={e => setUserData({ ...userData, fname: e.target.value })}
            />
          </label>
        </div>
        <div className="inputbox">
          <label>
            Last Name:
            <input
              type="text"
              required
              value={userData.lname}
              onChange={e => setUserData({ ...userData, lname: e.target.value })}
            />
          </label>
        </div>
        <div className="inputbox">
          <label>
            Email:
            <input
              type="text"
              required
              value={userData.email}
              onChange={e => setUserData({ ...userData, email: e.target.value })}
            />
          </label>
        </div>
        <div className="inputbox">
          <label>
            Password:
            <input
              type="file"
              required
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Signup</button>
      </form>
    </>
  );
}

export default Signup;
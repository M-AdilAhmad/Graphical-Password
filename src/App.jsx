import './App.css';
import defaultImage from '/default.jpg'
import { useState } from 'react';
import Login from "./Login";
import Signup from './Signup';
import AuthView from './AuthView';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  const [file, setFile] = useState();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<main>
          <h1>Graphical <span>Password</span></h1>
          <div className="left">
            <img src={file ? file : defaultImage} />
            <h3>Your image</h3>
          </div>
          <div className="right">
            <Login setFile={setFile} file={file}/>
            <p>Don't have an account? <Link to='/signup'><span>Sign up!</span></Link></p>
          </div>
        </main>} />

        <Route path='/signup' element={<main className='signup'>
          <Signup setFile={setFile} file={file}/>
        </main>} />

        <Route path='/auth' element={<AuthView/>} />
      </Routes>
    </Router>

  )
}
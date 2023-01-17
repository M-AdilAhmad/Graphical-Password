import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthView = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {username} = state

    const handleSubmit = e => {
        e.preventDefault();
        window.history.replaceState({}, document.title)
        navigate('/')
    };

    return (
        <>
            <br/>
            <form onSubmit={handleSubmit}>
                <button type="submit" className='signout'>Signout</button>
            </form>
            {<h2 className='center'>Welcome {username}</h2>}
        </>
    )
}

export default AuthView
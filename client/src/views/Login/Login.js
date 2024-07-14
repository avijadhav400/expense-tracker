import React from 'react'
import './Login.css'

function Login() {
  return (
    <div>
      <h1 className='form-heading'>Login</h1>
      <form className='signup-form'>
       

        <input 
        type="email" 
        placeholder='Enter Email' 
        className='user-input'
        />

        <input 
        type="password" 
        placeholder='Enter Password' 
        className='user-input'
        />

        

        <button 
        type='button' 
        className='auth-btn'
        >Login</button>
      </form>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import url from '../../../api/url'
function Login() {
  const [user, setUser] = useState({
    email: '', password: ''
  })
  const onChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value.toLowerCase() })
  }
  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${url}/user/login`, { ...user })
      localStorage.setItem('firstLogin', true)
      localStorage.setItem('email',user.email)
      window.location.href = "/"

    } catch (error) {
      alert(error.response.data.msg)
    }
  }
  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input type="email" name='email' required placeholder='Email' value={user.email} onChange={onChangeInput} />
        <input type="password" name='password' required placeholder='Password' autoComplete='on' value={user.password} onChange={onChangeInput} />
        <div className="row">
          <button type='submit'>Login</button>
          <Link to='/register'>Register</Link>
        </div>
      </form>
    </div>
  )
}


export default Login
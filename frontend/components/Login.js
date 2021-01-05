import React, { useState } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'


const Login = (props) => {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, updateErrors] = useState({
    message: ''
  })

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    updateFormData(data)

  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/login', formData)
      .then(resp => {

        if (resp.data.message) {
          updateErrors(resp.data)

        } else {
          localStorage.setItem('token', resp.data.token)
          props.history.push('/resorts')
        }

      })
  }



  // console.log(formData)
  console.log(errors)

  return <div className="background-image-login">

    <Fade>
      <div className="container container-custom">

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <input
              className="form-control"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              required
            />

          </div>

          <div className="form-group">

            <input
              className="form-control"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              required
            />

          </div>

          {errors.message && <p id="error" style={{ color: 'red' }}>
            {errors.message}
          </p>}

          <button className="btn btn-dark">Login</button>

        </form>

      </div>
    </Fade>
  </div>

}

export default Login
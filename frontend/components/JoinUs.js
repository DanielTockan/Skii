import React, { useState } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'



const JoinUs = (props) => {


  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  function handleChange(event) {

    const name = event.target.name

    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    const newErrors = {
      ...errors,
      [name]: ''
    }

    updateFormData(data)
    updateErrors(newErrors)

  }

  function handleSubmit(event) {

    event.preventDefault()

    axios.post('/api/joinus', formData)
      .then(resp => {
        console.log(resp.data)
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
        } else {
          props.history.push('/login')
        }
      })

  }

  console.log(formData)

  return <div className="background-image-joinus">
    <Fade>
      <div className="container container-custom">

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="Username"
              type="text"
              onChange={handleChange}
              value={formData.username}
              name="username"
              required
            />
            {errors.username && <p id="error" style={{ color: 'red' }}>
              {`There was a problem with your ${errors.username.path}`}
            </p>}
          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              type="text"
              onChange={handleChange}
              value={formData.email}
              name="email"
              required
            />
            {errors.email && <p id="error" style={{ color: 'red' }}>
              {`There was a problem with your ${errors.email.path}`}
            </p>}
          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              type="Password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              required
            />
            {errors.password && <p id="error" style={{ color: 'red' }}>
              {`There was a problem with your ${errors.password.path}`}
            </p>}
          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="Confirm Password"
              type="password"
              onChange={handleChange}
              value={formData.passwordConfirmation}
              name="passwordConfirmation"
              required
            />
            {errors.passwordConfirmation && <p id="error" style={{ color: 'red' }}>
              {'Does not match password'}
            </p>}
          </div>

          <button className="btn btn-dark">Submit</button>

        </form>

      </div>
    </Fade>
  </div>

}

export default JoinUs
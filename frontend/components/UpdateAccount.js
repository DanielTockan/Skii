import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'


const UpdateAccount = (props) => {

  const token = localStorage.getItem('token')

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    image: ''
  })

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    image: ''
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

  function handleUpdate(event) {

    event.preventDefault()

    const token = localStorage.getItem('token')
    axios.put(`/api/users/${props.match.params.id}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log(res.data)
        props.history.push(`/users/${props.match.params.id}`)
      })

  }

  function handleDelete() {
    axios.delete(`/api/users/${props.match.params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        localStorage.removeItem('token')
        props.history.push('/resorts')
      })
    return console.log('delete function active')
  }

  function handleImageUpload(event) {
    event.preventDefault()

    const token = localStorage.getItem('token')

    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dzt94',
        uploadPreset: 'skiresortapp',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        axios.put(`/api/users/${props.match.params.id}`, { image: result.info.secure_url }, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((res) => updateFormData(res.data))
      }
    ).open()
  }

  console.log(formData)

  return <div className="background-image-single-account">
    <Fade>
      <div className="container container-custom">

        <form onSubmit={handleUpdate}>

          <div className="form-group">
            <img src={formData.image} />
            <button
              type="image"
              value={formData.image}
              onClick={handleImageUpload}
              name="image"
            >Upload Image
        </button>
          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="Username"
              type="text"
              onChange={handleChange}
              value={formData.username}
              name="username"
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
            />
            {errors.passwordConfirmation && <p id="error" style={{ color: 'red' }}>
              {'Does not match password'}
            </p>}
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Submit Changes</button>
          </div>
        </form>

        <div className="form-group">
          <Link to="#" className="">
            <button
              className="btn btn-danger"
              onClick={handleDelete}>
              Delete Acount {deleteIcon}
            </button>
          </Link>
        </div>

      </div>
    </Fade>
  </div>
}

export default UpdateAccount

const deleteIcon = <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
</svg>
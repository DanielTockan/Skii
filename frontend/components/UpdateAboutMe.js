import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'


const UpdateAboutMe = (props) => {

  const [accountData, updateAccountData] = useState({
    ski_or_board: '',
    favourite_region: '',
    hometown: '',
    experience: '',
    favourite_brand: ''
  })

  function handleChange(event) {

    const name = event.target.name

    const value = event.target.value

    const data = {
      ...accountData,
      [name]: value
    }

    updateAccountData(data)

  }

  function handleUpdate(event) {

    event.preventDefault()

    const token = localStorage.getItem('token')
    axios.put(`/api/users/${props.match.params.id}`, accountData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log(res.data)
        props.history.push(`/users/${props.match.params.id}`)
      })

  }

  function handleBack() {
    return props.history.push(`/users/${props.match.params.id}`)
  }


  console.log(accountData)

  return <div className="background-image-single-account">
    <Fade>
      <div className="container container-custom">

        <form onSubmit={handleUpdate}>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="Ski or Board"
              type="text"
              onChange={handleChange}
              value={accountData.ski_or_board}
              name="ski_or_board"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="My favourite region"
              type="text"
              onChange={handleChange}
              value={accountData.favourite_region}
              name="favourite_region"
            />

          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="My hometown is"
              type="Text"
              onChange={handleChange}
              value={accountData.hometown}
              name="hometown"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have 'x' years experience"
              type="text"
              onChange={handleChange}
              value={accountData.experience}
              name="experience"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="My favourite ski brand is"
              type="text"
              onChange={handleChange}
              value={accountData.favourite_brand}
              name="favourite_brand"
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary">Submit Changes</button>
          </div>
        </form>

        <div className="form-group">
          <button
            onClick={handleBack}
            className="btn btn-danger">
            {backArrowIcon} Discard changes
      </button>
        </div>

      </div>
    </Fade>
  </div>
}

export default UpdateAboutMe



const backArrowIcon = <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-bar-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z" />
</svg>
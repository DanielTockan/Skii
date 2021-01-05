import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'
import Rating from '@material-ui/lab/Rating'
import Fade from 'react-reveal/Fade'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const SingleResort = (props) => {
  const [favouriteToggle, updateFavouriteToggle] = useState(false)
  const token = localStorage.getItem('token')
  const [singleResort, updateSingleResort] = useState({})
  const [weather, updateWeather] = useState({ current: { weather: [{}] }, daily: [] })
  const [text, setText] = useState('')
  const trash = <FontAwesomeIcon icon={faTrash} size="1x" />
  const [rating, updateRating] = useState(0)
  const star = <FontAwesomeIcon icon={faStar} size="3x" />

  const favourite = singleResort.name


  const [isActive, setActive] = useState(false)

  const toggleClass = () => {
    setActive(!isActive)
  }

  // console.log(text)
  useEffect(() => {
    axios.get(`/api/resorts/${props.match.params.name}`)
      .then((axiosResponse) => {
        updateSingleResort(axiosResponse.data.resort)
        updateWeather(axiosResponse.data.weather)
        updateRating(axiosResponse.data.resort.userRating)

      })
  }, [])

  function handleComment() {
    axios.post(`/api/resorts/${singleResort.name}/comments`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        setText('')
        updateSingleResort(resp.data)
      })
  }

  function addFavourite() {
    toggleClass()

    if (!favouriteToggle) {
      axios.post(`/api/resorts/${singleResort.name}/favourite`, { favourite }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {

          console.log(resp.data)
          console.log('added')

        })
      updateFavouriteToggle(true)


    } else if (favouriteToggle) {
      console.log('deletion')
      console.log(token)

      axios.put(`/api/resorts/${singleResort.name}/favourite/${favourite}`, { favourite }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {

          console.log(resp.data)
          console.log('deleted')

        })

      updateFavouriteToggle(false)
    }
  }


  function handleDeleteComment(commentId) {

    axios.delete(`/api/resorts/${singleResort.name}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateSingleResort(resp.data)
      })
  }

  function handleNewRating(rating) {

    const totalRatings = (singleResort.numOfRatings + 1)
    const newAverage = (((singleResort.userRating) * singleResort.numOfRatings) + rating) / totalRatings
    const token = localStorage.getItem('token')

    const newRatingInfo = {
      userRating: newAverage,
      numOfRatings: totalRatings
    }

    console.log(newRatingInfo)
    console.log(singleResort)
    axios.put(`/api/resorts/${singleResort.name}`, newRatingInfo, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateSingleResort(resp.data)
        // updateRating(newAverage)
      })

  }

  return <div className="background-image-single-resort">
    <Fade>
      <div className="container-single">

        <div className="card card-single">

          <div className="text-center resort-single-info">
            <img className="card-img-top-single" src={`${singleResort.image}`} alt="Card image cap"></img>
            <p className="resort-single-side"><strong >Opening times</strong><br />{singleResort.openingtimes}</p>
            <p className="resort-single-side"><strong>Adult ticket</strong><br />{singleResort.adultticket}</p>
            <p className="resort-single-side"><strong>Child ticket</strong><br />{singleResort.childticket}</p>
            <p className="resort-single-side"><strong>Slope length</strong><br />{singleResort.slopeslength}</p>
            <p className="resort-single-side"><strong>Ski lifts</strong><br />{singleResort.skilifts}</p>
            <p className="resort-single-side"><strong>Top elevation</strong><br />{singleResort.top_elevation}m above sea level</p>
            <p className="resort-single-side"><strong>Bottom elevation</strong><br />{singleResort.bottom_elevation}m above sea level</p>
          </div>

          <div className="card-body">
            <div className="resort-info-upper">

              {token && <button className={isActive ? 'star-active' : 'star'} onClick={addFavourite} >{star}</button>}

              <h1 className="card-title">{singleResort.name}</h1>
              <h6>{singleResort.country}</h6>
              <div className="rating">
                <span id="rateMe1"></span>
              </div>
              <div className="rating">
                <Rating
                  name="hover-feedback"
                  value={rating}
                  precision={0.5}
                  onChange={(event, newRating) => {
                    updateRating(newRating)
                    handleNewRating(newRating)

                  }}
                // onChangeActive={(event, newHover) => {
                //   setHover(newHover)
                // }}
                />
                {/* {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>} */}
              </div>
              <p className="card-text card-text-single">{singleResort.description}</p>
              <h6>Current temperature: {(weather.current.temp - 273) | 0}°C {weather.current.weather[0].description}</h6>
              <div className="container">
                <div className="row weather-days">
                  {weather.daily.map(day => {
                    return <div className="col" key={day.dt}><p>{(day.temp.max - 273) | 0}°C</p> <p>{(day.temp.min - 273) | 0}°C</p> <p>{day.weather[0].main}</p></div>
                  })}
                </div>
              </div>
            </div>





            <div className="comments-box">
              {singleResort.comments && <h5>Comments</h5>}

              <div className="comments">

                {singleResort.comments && singleResort.comments.map(comment => {

                  return <div key={comment._id} className="row comments-spaced text-center">

                    <p className="comment-user">{comment.user.username}</p>
                    <p className="comment">{comment.text}</p>

                    {isCreator(comment.user._id) && <div>

                      <a className="trash-icon" onClick={() => handleDeleteComment(comment._id)}>{trash}</a>
                    </div>}

                  </div>

                })}

              </div>

              {/* POST comment */}

              {token && <div className="submit-area">

                <textarea
                  className="textarea"
                  placeholder="Make a comment.."
                  onChange={event => setText(event.target.value)}
                  value={text}
                  rows="1"
                  cols="15"
                >
                  {text}
                </textarea>


                <button
                  onClick={handleComment}
                  className="btn btn-dark btn-submit-comments"
                >
                  Submit</button>

              </div>}


            </div>

          </div>

        </div>
      </div>
    </Fade>
  </div>
}

export default SingleResort
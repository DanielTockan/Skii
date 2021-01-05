import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
const Resorts = () => {


  const [resorts, updateResorts] = useState([])

  useEffect(() => {

    Axios.get('api/resorts')
      .then(resp => {

        const data = resp.data
        updateResorts(data)
        console.log(data)

      })
  }, [])

  return <div className="container-resorts">

    {resorts.map((resort, index) => {

      return <Fade>
        <div key={index} className="card">
          <img className="card-img-top" src={`${resort.image}`} alt="Card image cap"></img>
          <div className="card-body">
            <h5 className="card-title">{resort.name}</h5>
            <h6>{resort.country}</h6>
            <p className="card-text-all-resorts">{resort.description}</p>
            <Link to={`/resorts/${resort.name}`} className="btn btn-dark btn-resort">View Resort</Link>
          </div>
        </div>
      </Fade>

    })}


  </div>

}

export default Resorts
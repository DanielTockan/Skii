import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL, { Marker, LinearInterpolator, FlyToInterpolator } from 'react-map-gl'
import d3 from 'd3-ease'
import { Link } from 'react-router-dom'

const Home = () => {
   
  const [resorts, updateResorts] = useState([])
  // const [resortLocations] = useState(mapData)
  const [viewPort, setViewPort] = useState({
    height: '100vh',
    width: '100vw', 
    zoom: 1.5,
    //europe coordinates
    latitude: 54.5260,
    longitude: 15.2551
    // latitude: 54.5260,
    // longtiude: 105.2551
    // transitionDuration: 5000,
    // transitionInterpolator: new FlyToInterpolator(),
    // transitionEasing: d3.easeCubic
  })
  
  useEffect(() => {
    axios.get('/api/resorts')
      .then(resp => {
        updateResorts(resp.data)
      })
  }, [])

  // onViewPortChange={(viewport) => setViewPort(viewPort)}
  function goToNorthAmerica() {
    const NorthAmericaViewport = {
      // height, 
      // width,
      // transitionDuration,
      // transitionInterpolator,
      latitude: 45.5260,
      longtiude: 105.2551,// transitionEasing,
      zoom: 2,
      // latitude: 54.5260,
      // longtiude: -105.2551,
      height: '100vh',
      width: '100vw'
    }
    // preventDefault()
    console.log('north america')
    setViewPort(NorthAmericaViewport)
  }
  function goToWorld() {
    const WorldViewport = {
      latitude: 54.5260,
      longitude: 15.2551,
      zoom: 1.5,
      height: '100vh',
      width: '100vw'
    }
    setViewPort(WorldViewport)
  }
  function goToEurope() {
    const WorldViewport = {
      latitude: 46.2276,
      longitude: 2.2137,
      zoom: 3,
      height: '100vh',
      width: '100vw'
    }
    setViewPort(WorldViewport)
  }
  function goToAusNZ() {
    const AusNZViewport = {
      latitude: -31.850223,
      longitude: 159.0134,
      zoom: 3,
      height: '100vh',
      width: '100vw'
    }
    setViewPort(AusNZViewport)
  }
  function goToJapan() {
    const JapanViewport = {
      latitude: 36.332465,
      longitude: 139.748212,
      zoom: 3,
      height: '100vh',
      width: '100vw'
    }
    setViewPort(JapanViewport)
  }

  

  return <div>

    <ReactMapGL
      
      mapboxApiAccessToken={'pk.eyJ1Ijoic2Vhbi1mZW5lbG9uIiwiYSI6ImNraGMxbHBvOTAycWUycm1wczNpemZ0MGsifQ.phMK4dt1j_7wvlbYTbLWxg'}
      { ...viewPort }
      onViewportChange={(viewPort) => setViewPort(viewPort)}
    >
      <div className="map-menu">
        <button onClick={goToWorld}>WORLD</button>
        <button onClick={goToNorthAmerica}>North America</button>
        <button onClick={goToEurope}>Europe</button>
        <button onClick={goToAusNZ}>AUS/NZ</button>
        <button onClick={goToJapan}>Japan</button>
        
      </div>
      

      {resorts.map((resort, index) => {
        return <Link to={`/resorts/${resort.name}`} key={index}>
          <Marker 
            latitude={resort.lat}
            longitude={resort.lon}
          >
            {/* <div>
              <span>{resort.name}</span>
            </div> */}

            <img src="https://img.icons8.com/material/24/000000/marker--v1.png" />
          </Marker>
        </Link>
      })}
    </ReactMapGL>
  </div>
  
  // return <h1>Hello World</h1>



  // return <div>

  //   <h1>Hello World</h1>
    

  // </div>
}

export default Home
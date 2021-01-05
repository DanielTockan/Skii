import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker, LinearInterpolator, FlyToInterpolator } from 'react-map-gl'
import { Link } from 'react-router-dom'

const Home = () => {

  const [resorts, updateResorts] = useState([])
  // const [resortLocations] = useState(mapData)
  const [viewPort, setViewPort] = useState({
    height: '100vh',
    width: '100vw',
    zoom: 1.5,
    latitude: 54.5260,
    longitude: 15.2551

  })

  useEffect(() => {
    axios.get('/api/resorts')
      .then(resp => {
        updateResorts(resp.data)
      })
  }, [])

  function goToNorthAmerica() {
    const NorthAmericaViewport = {

      latitude: 37,
      longitude: -102,
      zoom: 3,

      height: '100vh',
      width: '100vw'
    }
    console.log(NorthAmericaViewport.longitude)
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
      zoom: 4,
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
      zoom: 4,
      height: '100vh',
      width: '100vw'
    }
    setViewPort(JapanViewport)
  }



  return <div>

    <MapGL

      mapboxApiAccessToken={'pk.eyJ1Ijoic2Vhbi1mZW5lbG9uIiwiYSI6ImNraGMxbHBvOTAycWUycm1wczNpemZ0MGsifQ.phMK4dt1j_7wvlbYTbLWxg'}
      {...viewPort}
      onViewportChange={(viewPort) => setViewPort(viewPort)}
    >

      <div className="map-menu">
        <button type="button" className="btn btn-dark" onClick={goToWorld}>WORLD</button>
        <button type="button" className="btn btn-dark" onClick={goToNorthAmerica}>North America</button>
        <button type="button" className="btn btn-dark" onClick={goToEurope}>Europe</button>
        <button type="button" className="btn btn-dark" onClick={goToAusNZ}>AUS/NZ</button>
        <button type="button" className="btn btn-dark" onClick={goToJapan}>Japan</button>
      </div>


      {resorts.map((resort, index) => {
        return <Link to={`/resorts/${resort.name}`} key={index}>
          <Marker
            latitude={resort.lat}
            longitude={resort.lon}
          >
            <img className="marker" src="https://img.icons8.com/material/24/000000/marker--v1.png" />
          </Marker>
        </Link>
      })}
    </MapGL>
  </div >

}

export default Home
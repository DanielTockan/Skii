import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkiing } from '@fortawesome/free-solid-svg-icons'


const NavBar = (props) => {

  const ski = <FontAwesomeIcon icon={faSkiing} size="2x" />

  const token = localStorage.getItem('token')
  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))

    var finalId = parsedToken.sub
  }

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/resort')
  }

  return <nav className="navbar navbar-expand-md navbar-dark nav-background fixed-top">

    <div className="ski-icon" >{ski}</div>
    <h1 className="home-title" >Skii</h1>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse text-right" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">

        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>

        {!localStorage.getItem('token') && <li className="nav-item">
          <Link to="/Login" className="nav-link">Login</Link>
        </li>}

        {!localStorage.getItem('token') && <li className="nav-item">
          <Link to="/joinus" className="nav-link">Join us</Link>
        </li>}

        <li className="nav-item">
          <Link to="/resorts" className="nav-link">Resorts</Link>
        </li>

        {/* {localStorage.getItem('token') && <li className="nav-item">
          <Link to="/newresort" className="nav-link">New Resort</Link>
        </li>} */}


        {token && <li className="nav-item">
          <Link to={`/users/${finalId}`} className="nav-link">My Account</Link>
        </li>}


        {/*{localStorage.getItem('token') && <li className="nav-item">
          <Link to={`/users/${accountSplit[2]}`} className="nav-link">My Account</Link>
        </li>}*/}

        {localStorage.getItem('token') && <li className="nav-item">
          <Link to="/" className="nav-link nav-contact"
            onClick={handleLogout}
          >Logout</Link>
        </li>}


      </ul>
    </div>

  </nav>

}
// console.log(window.location.pathname)
// split string by /
// pass thrtough in line 48

// const account = window.location.pathname
// const accountSplit = account.split("/")
// console.log(props)
// console.log(account)
// console.log(accountSplit)
// console.log(accountSplit[2])

export default withRouter(NavBar)
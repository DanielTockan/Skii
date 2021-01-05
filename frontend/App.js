import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import 'bulma' 
import './bootstrap/dist/css/bootstrap.min.css'
import './styles/style.css'

//compoments
import Favourites from './components/Favourites'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import JoinUs from './components/JoinUs'
import Resorts from './components/Resorts'
import SingleResort from './components/SingleResort'
import SingleAccount from './components/SingleAccount'
import UpdateAccount from './components/UpdateAccount'
import ImageUpload from './components/ImageUpload'
import UpdateAboutMe from './components/UpdateAboutMe'


const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/joinus" component={JoinUs} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/resorts" component={Resorts} />
      <Route exact path="/resorts/:name" component={SingleResort} />
      <Route exact path="/favourites" component={Favourites} />
      <Route exact path="/users/:id" component={SingleAccount} />
      <Route exact path="/users/edit/:id" component={UpdateAccount} />
      <Route exact path="/users/aboutme/:id" component={UpdateAboutMe} />      
      <Route exact path="/users/:id/image" component={ImageUpload} />

    </Switch> 
  </BrowserRouter>
)

export default App
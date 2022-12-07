import React from 'react'
import HomeView from '../views/homeView'

function HomePresenter(props) {
  return (
    <HomeView link={props.model.currentUser ? "/play" : "/register"}/>
  )
}

export default HomePresenter
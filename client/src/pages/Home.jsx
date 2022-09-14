import React from 'react'
import Header from '../components/Header'
import AddMov from '../components/AddMov'
import MovList from '../components/MovList'


const Home = () => {
  return (
    <div>
        <Header />
        <AddMov />
        <MovList />
    </div>
  )
}

export default Home
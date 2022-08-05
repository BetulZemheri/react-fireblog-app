import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import "./Profile.css"

const Profile = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='profilee'>
      <h6 style={{color:"red", fontSize:"1.5rem", marginBottom:"1rem", marginTop:"1rem"}}>DISPLAY NAME :</h6>
      <h3 style={{marginBottom:"2rem"}} >{currentUser.displayName}</h3>
      <h6 style={{color:"red", fontSize:"1.5rem", marginTop:"1rem"}}>E-MAIL :</h6>
      <h3 style={{marginTop:"1rem"}} >{currentUser.email}</h3>

    </div>
  )
}

export default Profile
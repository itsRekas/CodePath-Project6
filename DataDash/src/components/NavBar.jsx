import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="nav">
        <div className='nav-inner'>
            <div>
                <h1><Link to={'/'} reloadDocument>DataDash</Link></h1>
            </div>
            <div>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/Mars'}>Mars</Link></li>
                    <li><Link to={'/History'}>History</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NavBar
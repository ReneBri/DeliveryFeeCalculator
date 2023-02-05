// components
import { NavLink } from 'react-router-dom'

// styles
import './Navbar.css'


export default function Navbar() {
  return (
    <nav className="nav-container">
        <h2>Wolt</h2>
        <ul>
            <li><NavLink to="/">Menu</NavLink></li>
            <li><NavLink to="/instructions">Assignment Instructions</NavLink></li>
        </ul>
    </nav>
  )
}

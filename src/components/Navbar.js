import './Navbar.css'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="nav-container">
        <h2>Wolt</h2>
        <ul>
            <li><NavLink to="/">Menu</NavLink></li>
            <li><NavLink to="/create">Create New Item</NavLink></li>
        </ul>
    </nav>
  )
}

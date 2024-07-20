import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaHome, FaBriefcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <Link to="/">
        <img
          src=" https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="navbar-website-logo"
        />
      </Link>

      <ul className="nav-links">
        <Link to="/" className="link-item">
          <li>Home</li>
        </Link>

        <Link to="/jobs" className="link-item">
          <li>Jobs</li>
        </Link>
      </ul>
      <button
        type="button"
        className="logout-button"
        onClick={onClickLogoutButton}
      >
        <li> Logout</li>
      </button>
      <ul className="link-icons-container">
        <Link to="/">
          <FaHome className="link-icon" />
        </Link>
        <Link to="/jobs">
          <FaBriefcase className="link-icon" />
        </Link>
        <FiLogOut className="link-icon" onClick={onClickLogoutButton} />
      </ul>
    </nav>
  )
}

export default withRouter(Header)

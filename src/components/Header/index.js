import {Link, NavLink, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FaShoppingCart} from 'react-icons/fa'
import {GiShoppingBag} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'

import './index.css'
import CartContext from '../../context/CartContext'

const navLinksList = [
  {tabId: 'HOME', text: 'Home', linkPath: '/'},
  {tabId: 'PRODUCTS', text: 'Products', linkPath: '/products'},
  {tabId: 'CART', text: 'Cart', linkPath: '/cart'},
]

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

const Header = props => {
  const onLogoutClick = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  //   Cart Items Count Section
  const cartListCountRender = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartListLength = cartList.length

        return (
          <>
            {cartListLength > 0 && (
              <span className="show-cart-count">{cartListLength}</span>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  //   Mobile view Header Logo Section
  const smHeaderLogoContainer = () => (
    <div className="sm-navbar-logo-container">
      <Link to="/">
        <img
          className="sm-navbar-website-logo"
          src={websiteLogo}
          alt="website logo"
        />
      </Link>
      <button type="button" className="logout-icon-btn" onClick={onLogoutClick}>
        <FiLogOut className="logout-icon" size="24px" color="#475569" />
      </button>
    </div>
  )

  //   Mobile View Navbar Section
  const smNavLinkContainer = () => (
    <ul className="sm-navbar-list-container">
      <li className="sm-nav-link-item">
        <NavLink
          exact
          to="/"
          className="nav-link"
          activeClassName="active-nav-link"
        >
          <AiFillHome />
        </NavLink>
      </li>
      <li className="sm-nav-link-item">
        <NavLink
          exact
          to="/products"
          className="nav-link"
          activeClassName="active-nav-link"
        >
          <GiShoppingBag />
        </NavLink>
      </li>
      <li className="sm-nav-link-item">
        <NavLink
          exact
          to="/cart"
          className="nav-link"
          activeClassName="active-nav-link"
        >
          <FaShoppingCart />
        </NavLink>
        {cartListCountRender()}
      </li>
    </ul>
  )

  //   Medium devices Navbar Section
  const mdNavLinksContainer = () => (
    <div className="md-navbar-container">
      <Link to="/">
        <img
          className="nav-website-logo"
          src={websiteLogo}
          alt="website logo"
        />
      </Link>

      <ul className="nav-links-list-container">
        {navLinksList.map(each => {
          const {tabId, text, linkPath} = each

          return (
            <li key={tabId}>
              <NavLink
                exact
                to={linkPath}
                activeClassName="active-link"
                className="inActive-link navbar-link"
              >
                {text}
              </NavLink>
            </li>
          )
        })}
        <li>{cartListCountRender()}</li>
        <li>
          <button type="button" className="logout-btn" onClick={onLogoutClick}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )

  //   Header Component Render Section
  return (
    <nav className="header-container">
      {smHeaderLogoContainer()}
      {smNavLinkContainer()}
      {mdNavLinksContainer()}
    </nav>
  )
}

export default withRouter(Header)

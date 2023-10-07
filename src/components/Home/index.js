import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const homeImg =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png'

const Home = () => (
  <div className="home-route-container">
    <Header />
    <div className="home-app-container">
      <div className="home-content-container">
        <h1 className="website-heading">Clothes That You Get Noticed</h1>
        <img
          className="sm-home-img"
          src={homeImg}
          alt="clothes that get you noticed"
        />
        <p className="website-description">
          Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.
        </p>
        <Link to="/products">
          <button type="button" className="shop-now-btn">
            Shop Now
          </button>
        </Link>
      </div>
      <img
        className="md-home-img"
        src={homeImg}
        alt="clothes that get you noticed"
      />
    </div>
  </div>
)

export default Home

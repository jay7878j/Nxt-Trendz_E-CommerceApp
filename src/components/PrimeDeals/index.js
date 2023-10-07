import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProductCard from '../ProductCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PrimeDeals extends Component {
  state = {
    primeDealsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPrimeDealsData()
  }

  //   Fetching Prime Deals Data
  getPrimeDealsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const primeDealsApi = 'https://apis.ccbp.in/prime-deals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(primeDealsApi, options)

    if (response.ok) {
      const data = await response.json()
      //   console.log(data)

      const formattedPrimeDeals = data.prime_deals.map(each => ({
        id: each.id,
        availability: each.availability,
        brand: each.brand,
        description: each.description,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        style: each.style,
        title: each.title,
        totalReviews: each.total_reviews,
      }))

      this.setState({
        primeDealsList: formattedPrimeDeals,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  //   Prime Deals Loading View
  loadingView = () => (
    <div className="loading-view-container">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  //   No Prime Deals Render View
  failureView = () => {
    const noPrimeDealsImg =
      'https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png'

    return (
      <img
        className="no-prime-deals-img"
        src={noPrimeDealsImg}
        alt="no prime deals"
      />
    )
  }

  //   Prime Deals Success View
  successView = () => {
    const {primeDealsList} = this.state

    return (
      <div className="primeDeals-container">
        <h1 className="prime-deals-heading">Exclusive Prime Deals</h1>
        <ul className="prime-deals-list-container">
          {primeDealsList.map(each => (
            <ProductCard product={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  //   Prime Deals Render Views
  primeDealsRenderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()

      default:
        return null
    }
  }

  render() {
    return this.primeDealsRenderViews()
  }
}

export default PrimeDeals

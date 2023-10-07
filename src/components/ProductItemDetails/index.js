import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {
  AiFillStar,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from 'react-icons/ai'

import Header from '../Header'

import './index.css'
import ProductCard from '../ProductCard'
import CartContext from '../../context/CartContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.productDetailsData()
  }

  //   Fetching Product Details Data
  productDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const productDetailsApi = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(productDetailsApi, options)

    if (response.ok) {
      const data = await response.json()
      // console.log(data)

      const formattedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
        similarProducts: data.similar_products.map(each => ({
          availability: each.availability,
          brand: each.brand,
          description: each.description,
          id: each.id,
          imageUrl: each.image_url,
          price: each.price,
          rating: each.rating,
          style: each.style,
          title: each.title,
          totalReviews: each.total_reviews,
        })),
      }
      this.setState({
        productDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  //   Product Details Loading View
  loadingView = () => (
    <div className="loading-view-container">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  //  Product Details Failure View
  productDetailsFailureView = () => {
    const failureViewImg =
      'https://assets.ccbp.in/frontend/react-js/failure-img.png'

    const onRetryClick = () => {
      this.productDetailsData()
    }

    return (
      <div className="failure-view-container">
        <img className="failure-view-img" src={failureViewImg} alt="failure" />
        <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
        <p className="failure-view-description">
          We are having some trouble processing your request. Please try again.
        </p>
        <button type="button" className="retry-btn" onClick={onRetryClick}>
          Try Again
        </button>
      </div>
    )
  }

  onDecreaseQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prev => ({
        quantity: prev.quantity - 1,
      }))
    }
  }

  onIncreaseQuantity = () => {
    this.setState(prev => ({
      quantity: prev.quantity + 1,
    }))
  }

  //   Product Details Card
  productsDetailsAppCard = () => {
    const {productDetails, quantity} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {addToCart} = value

          const {
            availability,
            brand,
            description,
            imageUrl,
            price,
            rating,
            title,
            totalReviews,
          } = productDetails

          const product = {
            ...productDetails,
            quantity,
          }

          const onAddToCartClick = () => {
            addToCart(product)
          }

          return (
            <div className="product-details-card">
              <img className="product-details-img" src={imageUrl} alt={title} />
              <div className="product-info">
                <h1 className="product-title">{title}</h1>
                <p className="product-pricing">Rs {price}/-</p>
                <div className="product-reviews-container">
                  <p className="product-rating">
                    {rating}
                    <AiFillStar className="rating-icon" color="#ffffff" />
                  </p>
                  <p className="reviews">{totalReviews} Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <p className="availability">
                  Available: <span className="available">{availability}</span>
                </p>
                <p className="availability">
                  Brand: <span className="available">{brand}</span>
                </p>
                <hr className="hr-line" />
                <div className="count-container">
                  <button
                    type="button"
                    className="count-btn"
                    onClick={this.onDecreaseQuantity}
                  >
                    <AiOutlineMinusSquare className="count-icon" />
                  </button>
                  <p className="count">{quantity}</p>
                  <button
                    type="button"
                    className="count-btn"
                    onClick={this.onIncreaseQuantity}
                  >
                    <AiOutlinePlusSquare className="count-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="add-to-cart-btn"
                  onClick={onAddToCartClick}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  //   Product Details Success View
  productDetailsSuccessView = () => {
    const {productDetails} = this.state
    const {similarProducts} = productDetails

    return (
      <div className="product-details-container">
        {this.productsDetailsAppCard()}
        <div className="similar-products-container">
          <h1 className="similar-products-heading">Similar Products</h1>
          <ul className="similar-products-list">
            {similarProducts.map(each => (
              <ProductCard product={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  //   Product Details Render Views
  productDetailsRenderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.loadingView()
      case apiStatusConstants.success:
        return this.productDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.productDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-details-route-container">
          {this.productDetailsRenderViews()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails

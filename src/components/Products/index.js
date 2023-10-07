import Loader from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import ProductCard from '../ProductCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Products = props => {
  const {sortByOptionsList, sortByOptionChange} = props

  //   Products Header
  const allProductsHeader = () => {
    const {sortByOption} = props
    const getSortByIcon = () => {
      switch (sortByOption) {
        case 'PRICE_HIGH':
          return <FcGenericSortingDesc className="sort-by-icon" />

        case 'PRICE_LOW':
          return <FcGenericSortingAsc className="sort-by-icon" />

        default:
          return null
      }
    }

    return (
      <div className="all-products-header">
        <h1 className="all-products-heading">All Products</h1>
        <div className="sort-by-filter-container">
          {getSortByIcon()}
          <p className="sort-by">Sort by</p>
          <select
            className="sort-option"
            value={sortByOption}
            onChange={event => sortByOptionChange(event.target.value)}
          >
            {sortByOptionsList.map(each => {
              const {optionId, displayText} = each

              return (
                <option value={optionId} key={optionId}>
                  {displayText}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    )
  }

  //   Products Loading View
  const loadingView = () => (
    <div className="loading-view-container">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  //   Empty products view
  const emptyProductsListView = () => {
    const emptyListImg =
      'https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png'

    return (
      <div className="empty-products-view-container">
        <img className="empty-list-img" src={emptyListImg} alt="empty" />
        <h1 className="empty-view-heading">No Products Found</h1>
        <p className="empty-view-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  //   All Products Success View
  const successView = () => {
    const {productsList, setFavorite} = props

    const isListEmpty = productsList.length === 0

    return isListEmpty ? (
      emptyProductsListView()
    ) : (
      <ul className="all-products-list-container">
        {productsList.map(each => (
          <ProductCard
            product={each}
            key={each.id}
            setFavorite={() => setFavorite}
          />
        ))}
      </ul>
    )
  }

  //   All Products Failure View
  const failureView = () => {
    const {retryClick} = props

    const failureViewImg =
      'https://assets.ccbp.in/frontend/react-js/failure-img.png'

    return (
      <div className="failure-view-container">
        <img className="failure-view-img" src={failureViewImg} alt="failure" />
        <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
        <p className="failure-view-description">
          We are having some trouble processing your request. Please try again.
        </p>
        <button
          type="button"
          className="retry-btn"
          onClick={() => retryClick()}
        >
          Try Again
        </button>
      </div>
    )
  }

  //   All Products Render Views
  const allProductsRenderViews = () => {
    const {apiStatus} = props

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return loadingView()

      case apiStatusConstants.success:
        return successView()

      case apiStatusConstants.failure:
        return failureView()

      default:
        return null
    }
  }

  //   Products Component Render section
  return (
    <div className="all-available-products-container">
      {allProductsHeader()}
      {allProductsRenderViews()}
    </div>
  )
}

export default Products

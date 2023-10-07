import {Component} from 'react'
import Cookies from 'js-cookie'
import FiltersGroup from '../FiltersGroup'
import Products from '../Products'
import './index.css'

const categoriesList = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortByOptionsList = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductsSection extends Component {
  state = {
    allProductsList: [],
    apiStatus: apiStatusConstants.initial,
    ratingId: '',
    categoryId: '',
    searchInput: '',
    sortByOption: sortByOptionsList[0].optionId,
  }

  componentDidMount() {
    this.allProductsData()
  }

  //   Fetching All Products Data
  allProductsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, ratingId, categoryId, sortByOption} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const allProductApi = `https://apis.ccbp.in/products?sort_by=${sortByOption}&category=${categoryId}&title_search=${searchInput}&rating=${ratingId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(allProductApi, options)

    if (response.ok) {
      const data = await response.json()
      //   console.log(data)

      const formattedData = data.products.map(each => ({
        id: each.id,
        brand: each.brand,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        allProductsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  userSearchInput = searchValue => {
    this.setState({searchInput: searchValue}, this.allProductsData)
  }

  searchBtnClick = () => {
    this.allProductsData()
  }

  searchEnterClick = keyValue => {
    if (keyValue === 'Enter') {
      this.allProductsData()
    }
  }

  changeCategoryId = categoryId => {
    this.setState({categoryId}, this.allProductsData)
  }

  changeRatingId = ratingId => {
    this.setState({ratingId}, this.allProductsData)
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        ratingId: '',
        categoryId: '',
        sortByOption: sortByOptionsList[0].optionId,
      },
      this.allProductsData,
    )
  }

  sortByOptionChange = sortByOption => {
    this.setState({sortByOption}, this.allProductsData)
  }

  retryClick = () => {
    this.allProductsData()
  }

  render() {
    const {
      searchInput,
      allProductsList,
      sortByOption,
      ratingId,
      categoryId,
      apiStatus,
    } = this.state

    return (
      <div className="all-products-container">
        <FiltersGroup
          ratingsList={ratingsList}
          categoriesList={categoriesList}
          searchInput={searchInput}
          rating={ratingId}
          category={categoryId}
          userSearchInput={this.userSearchInput}
          searchBtnClick={this.searchBtnClick}
          searchEnterClick={this.searchEnterClick}
          changeRatingId={this.changeRatingId}
          changeCategoryId={this.changeCategoryId}
          clearFilters={this.clearFilters}
        />
        <Products
          sortByOptionsList={sortByOptionsList}
          productsList={allProductsList}
          sortByOption={sortByOption}
          apiStatus={apiStatus}
          sortByOptionChange={this.sortByOptionChange}
          retryClick={this.retryClick}
        />
      </div>
    )
  }
}

export default ProductsSection

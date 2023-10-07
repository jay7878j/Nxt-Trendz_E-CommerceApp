import {BiSearchAlt2} from 'react-icons/bi'
import './index.css'

const FiltersGroup = props => {
  // Search Container
  const searchContainer = () => {
    const {
      userSearchInput,
      searchBtnClick,
      searchEnterClick,
      searchInput,
    } = props

    const onSearchInputChange = event => {
      userSearchInput(event.target.value)
    }

    const onSearchBtnClick = () => {
      searchBtnClick()
    }

    const onSearchEnterClick = () => {
      searchEnterClick()
    }

    return (
      <div className="search-container">
        <input
          type="search"
          className="search-box"
          placeholder="Search"
          value={searchInput}
          onChange={onSearchInputChange}
          onKeyDown={onSearchEnterClick}
        />
        <button type="button" className="search-btn" onClick={onSearchBtnClick}>
          <BiSearchAlt2 className="search-icon" size="17px" color="#475569" />
        </button>
      </div>
    )
  }

  //   Category Container
  const categoryContainer = () => {
    const {categoriesList, changeCategoryId, category} = props

    return (
      <div className="category-container">
        <h1 className="filter-heading">Category</h1>
        <ul className="categories-list-container">
          {categoriesList.map(each => {
            const {name, categoryId} = each
            const categoryClassName =
              categoryId === category ? 'active-filter' : ''

            const onCategoryClick = () => {
              changeCategoryId(categoryId)
            }

            return (
              <li className="category-item" key={categoryId}>
                <button
                  type="button"
                  className={`filter-btn category ${categoryClassName}`}
                  onClick={onCategoryClick}
                >
                  {name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  //   Ratings Container
  const ratingContainer = () => {
    const {ratingsList, changeRatingId, rating} = props

    return (
      <div className="rating-container">
        <h1 className="filter-heading">Rating</h1>
        <ul className="rating-list-container">
          {ratingsList.map(each => {
            const {ratingId, imageUrl} = each

            const ratingClassName =
              each.ratingId === rating ? 'active-rating-filter' : ''

            const onRatingBtnClick = () => {
              changeRatingId(ratingId)
            }

            return (
              <li className="rating-list-item" key={ratingId}>
                <button
                  type="button"
                  className="filter-btn"
                  onClick={onRatingBtnClick}
                >
                  <img className="rating-img" src={imageUrl} alt={ratingId} />
                  <p className={`${ratingClassName} rating`}>& above</p>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  //   Clear Filter
  const clearFilterBtn = () => {
    const {clearFilters} = props

    const onClearFilterClick = () => {
      clearFilters()
    }

    return (
      <button
        type="button"
        className="clear-filter-btn"
        onClick={onClearFilterClick}
      >
        Clear Filter
      </button>
    )
  }

  //   FiltersGroup Component Render
  return (
    <div className="filters-group-container">
      {searchContainer()}
      {categoryContainer()}
      {ratingContainer()}
      {clearFilterBtn()}
    </div>
  )
}

export default FiltersGroup

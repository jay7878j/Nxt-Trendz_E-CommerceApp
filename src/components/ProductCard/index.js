import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const ProductCard = props => {
  const {product} = props

  const {id, brand, imageUrl, price, title, rating} = product

  return (
    <li className="prime-deals-product-item">
      <Link to={`/product/${id}`}>
        <img className="product-img" src={imageUrl} alt={title} />
        <div className="product-info-container">
          <h1 className="product-heading">{title}</h1>
          <p className="product-brand">by {brand}</p>
          <div className="product-price-container">
            <p className="product-price">Rs {price}/-</p>
            <p className="product-rating">
              {rating}
              <AiFillStar className="rating-icon" color="#ffffff" />
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default ProductCard

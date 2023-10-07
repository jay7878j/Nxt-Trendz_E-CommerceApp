import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {product} = props
  const {title, brand, price, imageUrl, quantity, id} = product

  return (
    <CartContext.Consumer>
      {value => {
        const {onIncrementQuantity, onDecrementQuantity, removeCartItem} = value

        const onDecreaseQuantity = () => {
          onDecrementQuantity(id)
        }

        const onIncreaseQuantity = () => {
          onIncrementQuantity(id)
        }

        const onDeleteItemClick = () => {
          removeCartItem(id)
        }

        return (
          <li className="cart-list-item">
            <div className="cart-product">
              <img className="cart-product-img" src={imageUrl} alt={title} />
              <div className="cart-product-title-container">
                <h1 className="cart-product-heading">{title}</h1>
                <p className="cart-product-brand">{brand}</p>
                <p className="sm-product-item-total-price">
                  Rs {quantity * price}/-
                </p>
              </div>
            </div>
            <div className="cart-item-quantity">
              <div className="cart-count-container">
                <button
                  type="button"
                  className="count-btn"
                  onClick={onDecreaseQuantity}
                >
                  <AiOutlineMinusSquare className="cart-count-icon" />
                </button>
                <p className="cart-count">{quantity}</p>
                <button
                  type="button"
                  className="count-btn"
                  onClick={onIncreaseQuantity}
                >
                  <AiOutlinePlusSquare className="cart-count-icon" />
                </button>
              </div>
              <p className="md-product-item-total-price">
                Rs {quantity * price}/-
              </p>
              <button
                type="button"
                className="delete-icon-btn"
                onClick={onDeleteItemClick}
              >
                <MdDelete className="delete-icon" />
              </button>
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem

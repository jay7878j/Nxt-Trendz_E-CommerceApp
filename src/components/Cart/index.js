import {Link} from 'react-router-dom'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import OrderTotal from '../OrderTotal'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItem} = value

      const isCartListEmpty = cartList.length === 0

      const onRemoveAll = () => {
        removeAllCartItem()
      }

      //  Empty Cart View
      const emptyCartListView = () => (
        <div className="cart-empty-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            className="cart-empty-img"
            alt="cart empty"
          />
          <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

          <Link to="/products">
            <button type="button" className="shop-now-btn">
              Shop Now
            </button>
          </Link>
        </div>
      )

      //  Cart Container
      const cartListContainer = () => (
        <div className="cart-container">
          <h1 className="my-cart-heading">My Cart</h1>
          <button
            type="button"
            className="remove-all-btn"
            onClick={onRemoveAll}
          >
            Remove All
          </button>
          <ul className="cart-list-container">
            {cartList.map(each => (
              <CartItem product={each} key={each.id} />
            ))}
          </ul>
          <OrderTotal />
        </div>
      )

      return (
        <>
          <Header />
          {isCartListEmpty ? emptyCartListView() : cartListContainer()}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart

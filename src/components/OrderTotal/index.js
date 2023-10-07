import {withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const OrderTotal = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList, emptyCartList, onProductCheckout} = value

      let orderTotal = 0

      cartList.forEach(each => {
        orderTotal += each.quantity * each.price
      })

      const onCheckoutClick = () => {
        const {history} = props
        onProductCheckout()
        emptyCartList()
        history.push('/checkout')
      }

      return (
        <div className="order-total-container">
          <h1 className="order-total">
            Order Total: <span className="total-price">Rs {orderTotal}/-</span>
          </h1>
          <p className="items-in-cart">2 items in cart</p>

          <button
            type="button"
            className="checkout-btn"
            onClick={onCheckoutClick}
          >
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(OrderTotal)

import {Link} from 'react-router-dom'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

const checkoutImg =
  'https://res.cloudinary.com/jay19/image/upload/v1692959061/pbncsdh684yuz0oa3yqc.png'

const noItemsCheckoutImg =
  'https://res.cloudinary.com/jay19/image/upload/v1692962630/shopping-cart-371979_1920_xic1da.png'

const ProductCheckout = () => (
  <CartContext.Consumer>
    {value => {
      const {isCheckout} = value

      return (
        <>
          <Header />
          {isCheckout ? (
            <div className="checkout-container">
              <img className="checkout-img" src={checkoutImg} alt="checkout" />
              <h1 className="checkout-heading">Order Successfully Placed</h1>
              <p className="checkout-description">
                Thanks for Shopping. Keep shopping more
              </p>

              <Link to="/products">
                <button type="button" className="shop-now-btn">
                  SHOP MORE
                </button>
              </Link>
            </div>
          ) : (
            <div className="no-items-checkout-container">
              <img
                className="checkout-img"
                src={noItemsCheckoutImg}
                alt="checkout"
              />

              <h1 className="checkout-heading">
                Oops! There is no items to bo deliver
              </h1>
              <p className="checkout-description">
                Best products are available to shop & ready to deliver
              </p>
              <Link to="/products">
                <button type="button" className="shop-now-btn">
                  SHOP NOW
                </button>
              </Link>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default ProductCheckout

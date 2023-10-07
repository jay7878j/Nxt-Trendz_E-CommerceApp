import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProductsRoute from './components/ProductsRoute'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import ProductItemDetails from './components/ProductItemDetails'
// import ProductCheckout from './components/ProductCheckout'
import CartContext from './context/CartContext'
import ProductCheckout from './components/ProductCheckout'

class App extends Component {
  state = {
    cartList: [],
    isCheckout: false,
  }

  onAddToCart = product => {
    const {cartList} = this.state
    // console.log(cartList)
    const findProduct = cartList.findIndex(each => each.id === product.id)
    // console.log(findProduct)

    if (findProduct === -1) {
      this.setState(prev => ({
        cartList: [...prev.cartList, product],
      }))
    } else {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.id === product.id) {
            const updatedQuantity = each.quantity + product.quantity
            const updatedObject = {...each, quantity: updatedQuantity}
            return updatedObject
          }
          return each
        }),
      }))
    }
  }

  onIncrementQuantity = productId => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each => {
        if (each.id === productId) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))
  }

  onDecrementQuantity = productId => {
    const {cartList} = this.state

    const productObject = cartList.find(each => each.id === productId)
    if (productObject.quantity === 1) {
      const filteredList = cartList.filter(each => each.id !== productId)
      this.setState({cartList: filteredList})
    } else {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.id === productId) {
            return {...each, quantity: each.quantity - 1}
          }
          return each
        }),
      }))
    }
  }

  removeCartItem = productId => {
    const {cartList} = this.state

    const filteredList = cartList.filter(each => each.id !== productId)
    console.log('filteredList', filteredList)
    this.setState({
      cartList: filteredList,
    })
  }

  removeAllCartItem = () => {
    this.setState({
      cartList: [],
    })
  }

  emptyCartList = () => {
    this.setState({cartList: []})
  }

  onProductCheckout = () => {
    this.setState({
      isCheckout: true,
    })
  }

  render() {
    const {cartList, isCheckout} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          isCheckout,
          addToCart: this.onAddToCart,
          removeCartItem: this.removeCartItem,
          onIncrementQuantity: this.onIncrementQuantity,
          onDecrementQuantity: this.onDecrementQuantity,
          removeAllCartItem: this.removeAllCartItem,
          emptyCartList: this.emptyCartList,
          onProductCheckout: this.onProductCheckout,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={ProductsRoute} />
          <ProtectedRoute exact path="/checkout" component={ProductCheckout} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute
            exact
            path="/product/:id"
            component={ProductItemDetails}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  isCheckout: false,
  addToCart: () => {},
  removeCartItem: () => {},
  onIncrementQuantity: () => {},
  onDecrementQuantity: () => {},
  removeAllCartItem: () => {},
  emptyCartList: () => {},
  onProductCheckout: () => {},
})

export default CartContext

const CART_KEY = 'cart'

export const getCart = () => {
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export const clearCart = () => {
  localStorage.removeItem(CART_KEY)
}

export const removeCartItem = (id) => {
  const cart = getCart()
  const updatedCart = cart.filter(item => item.id !== id)
  saveCart(updatedCart)
}

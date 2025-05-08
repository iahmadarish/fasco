"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

interface CartItem {
  _id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  color?: string
}

interface CartResponse {
  success: boolean
  cart: {
    items: CartItem[]
    totalAmount: number
  }
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://sass-ecommerce-dashobard.onrender.com/api/cart/abandoned")
        if (!response.ok) {
          throw new Error("Failed to fetch cart")
        }

        const data: CartResponse = await response.json()

        if (data && data.cart) {
          setCartItems(data.cart.items || [])
          setTotalAmount(data.cart.totalAmount || 0)
        } else {
          setCartItems([])
          setTotalAmount(0)
        }
      } catch (err) {
        console.error("Error fetching cart:", err)
        setError("Error loading cart. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item._id === id ? { ...item, quantity: newQuantity } : item)))

    // Recalculate total
    updateTotalAmount()
  }

  const updateTotalAmount = () => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotalAmount(newTotal)
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id))

    // Recalculate total
    updateTotalAmount()
  }

  const handleClearCart = () => {
    setCartItems([])
    setTotalAmount(0)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 rounded mb-4"></div>
          <div className="h-16 bg-gray-200 rounded mb-4"></div>
          <div className="h-16 bg-gray-200 rounded mb-8"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <p className="text-xl mb-8">Your cart is empty</p>
        <Link to="/products" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="border-b border-gray-200 pb-2 mb-4 hidden md:grid md:grid-cols-12 gap-4 text-sm text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Subtotal</div>
          </div>

          {cartItems.map((item) => (
            <div key={item._id} className="border-b border-gray-200 py-4 md:grid md:grid-cols-12 gap-4 items-center">
              <div className="col-span-6 flex items-center gap-4 mb-4 md:mb-0">
                <img
                  src={item.image || "/placeholder.svg?height=80&width=80"}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                  }}
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                  {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                  <button onClick={() => handleRemoveItem(item._id)} className="text-sm text-red-500 mt-1 md:hidden">
                    Remove
                  </button>
                </div>
              </div>

              <div className="col-span-2 text-center">
                <span className="md:hidden inline-block w-24 text-gray-500">Price: </span>${item.price.toFixed(2)}
              </div>

              <div className="col-span-2 text-center flex items-center justify-center">
                <span className="md:hidden inline-block w-24 text-gray-500">Quantity: </span>
                <div className="flex">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, Number.parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-12 h-8 border-t border-b border-gray-300 text-center"
                  />
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-span-2 text-center">
                <span className="md:hidden inline-block w-24 text-gray-500">Subtotal: </span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="hidden md:block text-sm text-red-500 mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <Link to="/products" className="text-black hover:underline">
              ← Continue Shopping
            </Link>
            <button onClick={handleClearCart} className="text-red-500 hover:underline">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors">
              Proceed to Checkout
            </button>

            <div className="mt-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-sm text-gray-500">We accept:</span>
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">Taxes and shipping calculated at checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

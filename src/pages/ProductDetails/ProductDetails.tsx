"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

interface Product {
  _id: string
  name: string
  slug: string
  description: string
  price: number
  finalPrice?: number
  discount?: number
  stock?: number
  category: {
    _id: string
    name: string
  }
  subcategory?: {
    _id: string
    name: string
  }
  brand: string
  image: string
  rating?: {
    average: number
    totalReviews: number
  }
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>("M")
  const [selectedColor, setSelectedColor] = useState<string>("")

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://sass-ecommerce-dashobard.onrender.com/api/v1/products`)
        if (!response.ok) {
          throw new Error("Failed to fetch product")
        }

        const data = await response.json()

        if (data && data.products && Array.isArray(data.products)) {
          const foundProduct = data.products.find((p: Product) => p._id === id)
          if (foundProduct) {
            setProduct(foundProduct)
            // Set default selected color if available
            if (foundProduct.image) {
              setSelectedColor("default")
            }
          } else {
            setError("Product not found")
          }
        } else {
          setError("Failed to load product data")
        }
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Error loading product. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
  }

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log("Adding to cart:", {
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    })

    alert("Product added to cart!")
  }

  // Available sizes
  const sizes = ["XS", "S", "M", "L", "XL"]

  // Available colors (placeholder)
  const colors = [
    { name: "default", class: "bg-gray-200" },
    { name: "black", class: "bg-black" },
    { name: "white", class: "bg-white border border-gray-300" },
  ]

  if (loading) {
    return (
      <div className=" container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="w-full md:w-1/2 bg-gray-200 h-96"></div>
          <div className="w-full md:w-1/2">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error || "Product not found"}</h2>
        <Link to="/products" className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            className="w-full h-auto object-cover"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=600&width=600"
            }}
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < (product.rating?.average || 5) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating?.totalReviews || 0} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold">${(product.finalPrice || product.price).toFixed(2)}</span>
            {product.discount && product.discount > 0 && (
              <>
                <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">{product.discount}% OFF</span>
              </>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700">
              {product.description.length > 300 ? `${product.description.substring(0, 300)}...` : product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Size</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`w-10 h-10 border ${selectedSize === size ? "border-black bg-black text-white" : "border-gray-300"} flex items-center justify-center`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Color</h3>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(color.name)}
                  className={`w-8 h-8 rounded-full ${color.class} ${selectedColor === color.name ? "ring-2 ring-offset-2 ring-black" : ""}`}
                  title={color.name}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="w-16 h-10 border-t border-b border-gray-300 text-center"
              />
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors mb-4"
          >
            Add to Cart
          </button>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Category:</span>
              <span className="text-black">{product.category.name}</span>
            </div>
            {product.subcategory && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>Subcategory:</span>
                <span className="text-black">{product.subcategory.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Brand:</span>
              <span className="text-black">{product.brand}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Availability:</span>
              <span className={`${product.stock && product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                {product.stock && product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

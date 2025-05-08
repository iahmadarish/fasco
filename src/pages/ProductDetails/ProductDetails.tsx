"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Star } from "lucide-react"

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
  images?: string[]
  variantId?: string
  rating?: {
    average: number
    totalReviews: number
  }
  createdAt: string
  updatedAt: string
}

interface VariantOption {
  name: string
  value: string
}

interface Variant {
  _id: string
  productId: string
  sku: string
  price: number
  stock: number
  options: VariantOption[]
  image?: string
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [variants, setVariants] = useState<Variant[]>([])
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
  const [loading, setLoading] = useState(true)
  const [variantLoading, setVariantLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [mainImage, setMainImage] = useState<string>("")
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const [availableSizes, setAvailableSizes] = useState<string[]>([])
  const [availableColors, setAvailableColors] = useState<string[]>([])

  // Fetch product data
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
            setMainImage(foundProduct.image || "")

            // Set thumbnails from product images if available
            const productImages = foundProduct.images || [foundProduct.image]
            setThumbnails(productImages.filter(Boolean))

            // Check if product has variants
            if (foundProduct.variantId) {
              fetchVariants(foundProduct.variantId)
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

  // Fetch variants if product has variantId
  const fetchVariants = async (variantId: string) => {
    setVariantLoading(true)
    try {
      const response = await fetch(`https://sass-ecommerce-dashobard.onrender.com/api/v1/variants/${variantId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch variants")
      }

      const data = await response.json()

      if (data && Array.isArray(data)) {
        setVariants(data)

        // Extract available sizes and colors from variants
        const sizes = new Set<string>()
        const colors = new Set<string>()

        data.forEach((variant: Variant) => {
          variant.options.forEach((option) => {
            if (option.name.toLowerCase() === "size") {
              sizes.add(option.value)
            }
            if (option.name.toLowerCase() === "color") {
              colors.add(option.value)
            }
          })
        })

        setAvailableSizes(Array.from(sizes))
        setAvailableColors(Array.from(colors))

        // Set default selected size and color if available
        if (sizes.size > 0) {
          setSelectedSize(Array.from(sizes)[0])
        }
        if (colors.size > 0) {
          setSelectedColor(Array.from(colors)[0])
        }

        // Find the default variant based on selected size and color
        updateSelectedVariant(Array.from(sizes)[0], Array.from(colors)[0], data)
      }
    } catch (err) {
      console.error("Error fetching variants:", err)
      // Don't set error state here, just log it
    } finally {
      setVariantLoading(false)
    }
  }

  // Update selected variant when size or color changes
  const updateSelectedVariant = (size: string, color: string, variantList: Variant[] = variants) => {
    const matchingVariant = variantList.find((variant) => {
      const variantSize = variant.options.find((opt) => opt.name.toLowerCase() === "size")?.value
      const variantColor = variant.options.find((opt) => opt.name.toLowerCase() === "color")?.value

      return variantSize === size && variantColor === color
    })

    if (matchingVariant) {
      setSelectedVariant(matchingVariant)
      if (matchingVariant.image) {
        setMainImage(matchingVariant.image)
      }
    } else {
      setSelectedVariant(null)
    }
  }

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
    updateSelectedVariant(size, selectedColor)
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    updateSelectedVariant(selectedSize, color)
  }

  const handleThumbnailClick = (image: string) => {
    setMainImage(image)
  }

  const handleVariantClick = (variant: Variant) => {
    setSelectedVariant(variant)

    // Update size and color based on variant
    const variantSize = variant.options.find((opt) => opt.name.toLowerCase() === "size")?.value
    const variantColor = variant.options.find((opt) => opt.name.toLowerCase() === "color")?.value

    if (variantSize) {
      setSelectedSize(variantSize)
    }

    if (variantColor) {
      setSelectedColor(variantColor)
    }

    // Update main image if variant has an image
    if (variant.image) {
      setMainImage(variant.image)
    }
  }

  const handleAddToCart = () => {
    // Implement add to cart functionality
    const itemToAdd = {
      productId: product?._id,
      name: product?.name,
      price: selectedVariant ? selectedVariant.price : product?.finalPrice || product?.price,
      quantity,
      variant: selectedVariant
        ? {
            id: selectedVariant._id,
            size: selectedSize,
            color: selectedColor,
            options: selectedVariant.options,
          }
        : null,
    }

    console.log("Adding to cart:", itemToAdd)
    alert("Product added to cart!")
  }

  // Get the current price based on selected variant or product
  const getCurrentPrice = () => {
    if (selectedVariant) {
      return selectedVariant.price
    }
    return product?.finalPrice || product?.price || 0
  }

  // Get the original price
  const getOriginalPrice = () => {
    return product?.price || 0
  }

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    const currentPrice = getCurrentPrice()
    const originalPrice = getOriginalPrice()

    if (originalPrice > currentPrice) {
      return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    }
    return 0
  }

  // Get color class for display
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      black: "bg-black",
      white: "bg-white border border-gray-300",
      blue: "bg-blue-500",
      red: "bg-red-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      purple: "bg-purple-500",
      pink: "bg-pink-300",
      gray: "bg-gray-500",
      brown: "bg-amber-800",
    }

    return colorMap[color.toLowerCase()] || "bg-gray-200"
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="w-full md:w-1/2">
            <div className="bg-gray-200 h-96 mb-4"></div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 bg-gray-200"></div>
              ))}
            </div>
          </div>
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="order-2 md:order-1 md:w-1/5 flex md:flex-col gap-2 mt-4 md:mt-0">
              {thumbnails.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(image)}
                  className={`border ${mainImage === image ? "border-black" : "border-gray-200"} p-1 w-20 h-20`}
                >
                  <img
                    src={image || "/placeholder.svg?height=80&width=80"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="order-1 md:order-2 md:w-4/5">
              <img
                src={mainImage || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=600&width=600"
                }}
              />
            </div>
          </div>

          {/* Variants */}
          {variants.length > 0 && (
            <div className="mt-8">
              <h3 className="font-medium mb-3">Variants:</h3>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant._id}
                    onClick={() => handleVariantClick(variant)}
                    className={`border p-1 w-20 h-20 ${selectedVariant?._id === variant._id ? "border-black" : "border-gray-200"}`}
                  >
                    <img
                      src={variant.image || product.image || "/placeholder.svg?height=80&width=80"}
                      alt={`Variant ${variant.options.map((o) => o.value).join(" ")}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=80&width=80"
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <div className="mb-1 text-sm text-gray-500">FASCO</div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.rating?.average || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating?.totalReviews || 0})</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold">${getCurrentPrice().toFixed(2)}</span>
            {getDiscountPercentage() > 0 && (
              <>
                <span className="text-lg text-gray-500 line-through">${getOriginalPrice().toFixed(2)}</span>
                <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">SAVE {getDiscountPercentage()}%</span>
              </>
            )}
          </div>

          {/* Size Selection - Only show if variants have sizes */}
          {availableSizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size: {selectedSize}</h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`min-w-[40px] h-10 px-3 ${
                      selectedSize === size ? "bg-black text-white" : "border border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection - Only show if variants have colors */}
          {availableColors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color: {selectedColor}</h3>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full ${getColorClass(color)} ${
                      selectedColor === color ? "ring-2 ring-offset-2 ring-black" : ""
                    }`}
                    title={color}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity</h3>
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
            className="w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors mb-8"
          >
            Add to cart
          </button>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold mb-4">Product Details:</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <span className="font-medium w-24">Category:</span>
                <span className="text-gray-700">{product.category.name}</span>
              </div>

              {product.subcategory && (
                <div className="flex items-start gap-2 text-sm">
                  <span className="font-medium w-24">Subcategory:</span>
                  <span className="text-gray-700">{product.subcategory.name}</span>
                </div>
              )}

              <div className="flex items-start gap-2 text-sm">
                <span className="font-medium w-24">Brand:</span>
                <span className="text-gray-700">{product.brand}</span>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <span className="font-medium w-24">Availability:</span>
                <span
                  className={
                    selectedVariant
                      ? selectedVariant.stock > 0
                        ? "text-green-500"
                        : "text-red-500"
                      : product.stock && product.stock > 0
                        ? "text-green-500"
                        : "text-red-500"
                  }
                >
                  {selectedVariant
                    ? selectedVariant.stock > 0
                      ? "In Stock"
                      : "Out of Stock"
                    : product.stock && product.stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                </span>
              </div>

              {selectedVariant && (
                <div className="flex items-start gap-2 text-sm">
                  <span className="font-medium w-24">SKU:</span>
                  <span className="text-gray-700">{selectedVariant.sku}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

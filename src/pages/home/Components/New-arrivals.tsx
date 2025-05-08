"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"

interface Category {
  _id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

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
  createdAt: string
  updatedAt: string
}

interface ProductsResponse {
  success: boolean
  count: number
  totalPages: number
  currentPage: number
  products: Product[]
}

export default function NewArrivals() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://sass-ecommerce-dashobard.onrender.com/api/v1/categories")
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }
        const data = await response.json()

        // Check if data is an array and has items
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data)
          // Set the first category as selected by default
          setSelectedCategory(data[0]._id)
        } else {
          // Handle case where data is not in expected format
          console.log("Categories data format:", data)
          setCategories([])
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
        setError("Error fetching categories")
        setCategories([])
      }
    }

    fetchCategories()
  }, [])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch("https://sass-ecommerce-dashobard.onrender.com/api/v1/products")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data: ProductsResponse = await response.json()
        console.log("Products data format:", data)

        // Extract the products array from the response
        if (data && data.products && Array.isArray(data.products)) {
          // Ensure all required fields exist
          const validatedProducts = data.products.map((product) => ({
            _id: product._id || `temp-${Math.random()}`,
            name: product.name || "Unnamed Product",
            slug: product.slug || "",
            description: product.description || "",
            price: typeof product.price === "number" ? product.price : 0,
            finalPrice: typeof product.finalPrice === "number" ? product.finalPrice : product.price,
            discount: typeof product.discount === "number" ? product.discount : 0,
            stock: typeof product.stock === "number" ? product.stock : 0,
            category: {
              _id: product.category?._id || "",
              name: product.category?.name || "Uncategorized",
            },
            subcategory: product.subcategory,
            brand: product.brand || "Unknown",
            image: product.image || "",
            rating: product.rating || { average: 0, totalReviews: 0 },
            createdAt: product.createdAt || "",
            updatedAt: product.updatedAt || "",
          }))

          setProducts(validatedProducts)
        } else {
          // Handle case where data is not in expected format
          console.log("Products data format is invalid:", data)
          setProducts([])
        }
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Error fetching products")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products by selected category
  useEffect(() => {
    if (selectedCategory && products.length > 0) {
      const filtered = products.filter((product) => product.category && product.category._id === selectedCategory)
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [selectedCategory, products])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  // Check if product is almost sold out (less than 10 items)
  const isAlmostSoldOut = (stock = 0) => {
    return stock < 10 && stock > 0
  }

  // Render placeholder if no products are available
  const renderPlaceholders = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <div key={`placeholder-${index}`} className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="h-80 bg-gray-200 animate-pulse"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3 mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
            </div>
          </div>
        </div>
      ))
  }

  // Generate star rating based on average rating
  const renderStarRating = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">New Arrivals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem.
            Scelerisque duis ultrices sollicitudin
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.length > 0
            ? categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category._id)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    selectedCategory === category._id
                      ? "bg-black text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))
            : // Placeholder buttons if no categories
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={`cat-placeholder-${index}`}
                    className="px-6 py-2 rounded-full bg-gray-200 animate-pulse w-24"
                  ></div>
                ))}
        </div>

        {loading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{renderPlaceholders()}</div>
        ) : error ? (
          // Error state
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          // Products grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.slice(0, 6).map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link to={`/products/${product._id}`}>
                  <div className="h-80 overflow-hidden relative">
                    <img
                      src={product.image || "/placeholder.svg?height=400&width=400"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=400"
                      }}
                    />
                    {product.discount && product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <div className="flex">{renderStarRating(product.rating?.average || 5)}</div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">At {product.brand || "Keram"}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      ({product.rating?.totalReviews || 0}+) Customer Reviews
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">${(product.finalPrice || product.price).toFixed(2)}</span>
                        {product.discount && product.discount > 0 && (
                          <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      {isAlmostSoldOut(product.stock) && <span className="text-sm text-red-500">Almost Sold Out</span>}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          // No products found
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}

        {/* View More button */}
        {filteredProducts && filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors inline-block"
            >
              View More
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

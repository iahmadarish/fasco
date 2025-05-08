"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

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

interface Category {
  _id: string
  name: string
  slug: string
}

interface SubCategory {
  _id: string
  name: string
  slug: string
  category: string
}

interface ProductsResponse {
  success: boolean
  count: number
  totalPages: number
  currentPage: number
  products: Product[]
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

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

        if (data && data.products && Array.isArray(data.products)) {
          setProducts(data.products)
          setTotalPages(data.totalPages || 1)
        } else {
          setProducts([])
        }
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Error loading products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage])

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://sass-ecommerce-dashobard.onrender.com/api/v1/categories")
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }
        const data = await response.json()

        if (Array.isArray(data)) {
          setCategories(data)
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }

    fetchCategories()
  }, [])

  // Fetch subcategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await fetch("https://sass-ecommerce-dashobard.onrender.com/api/v1/subcategories")
        if (!response.ok) {
          throw new Error("Failed to fetch subcategories")
        }
        const data = await response.json()

        if (Array.isArray(data)) {
          setSubCategories(data)
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err)
      }
    }

    fetchSubCategories()
  }, [])

  // Filter subcategories based on selected category
  const filteredSubCategories = selectedCategory
    ? subCategories.filter((sub) => sub.category === selectedCategory)
    : subCategories

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (selectedCategory && product.category._id !== selectedCategory) {
      return false
    }

    // Filter by subcategory
    if (selectedSubCategory && (!product.subcategory || product.subcategory._id !== selectedSubCategory)) {
      return false
    }

    // Add more filters as needed (size, color, etc.)

    return true
  })

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId)
    setSelectedSubCategory(null) // Reset subcategory when category changes
  }

  const handleSubCategoryChange = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId === selectedSubCategory ? null : subCategoryId)
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size === selectedSize ? null : size)
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color === selectedColor ? null : color)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Available sizes
  const sizes = ["S", "M", "L", "XL"]

  // Available colors
  const colors = [
    { name: "Red", class: "bg-red-500" },
    { name: "Orange", class: "bg-orange-500" },
    { name: "Yellow", class: "bg-yellow-500" },
    { name: "Green", class: "bg-green-500" },
    { name: "Teal", class: "bg-teal-500" },
    { name: "Blue", class: "bg-blue-500" },
    { name: "Indigo", class: "bg-indigo-500" },
    { name: "Purple", class: "bg-purple-500" },
    { name: "Pink", class: "bg-pink-500" },
    { name: "Gray", class: "bg-gray-500" },
    { name: "Black", class: "bg-black" },
    { name: "White", class: "bg-white border border-gray-300" },
  ]

  // Collections
  const collections = ["All products", "Best sellers", "New arrivals", "Accessories"]

  // Tags
  const tags = [
    "Fashion",
    "Hats",
    "Sandal",
    "Belt",
    "Bags",
    "Sneaker",
    "Denim",
    "Minimal",
    "Vagabond",
    "Sunglasses",
    "Beachwear",
  ]

  return (
    <div className="max-w-7xl mx-auto mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">Fashion</h1>

      <div className="flex text-sm text-gray-500 justify-center mb-12">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="text-black">Products</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-bold mb-6">Filters</h2>

          {/* Size filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Size</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={`w-10 h-10 border ${selectedSize === size ? "border-black" : "border-gray-300"} flex items-center justify-center`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Colors</h3>
            <div className="flex flex-wrap gap-2">
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

          {/* Category filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Category</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category._id}>
                  <button
                    onClick={() => handleCategoryChange(category._id)}
                    className={`text-left w-full hover:text-black ${selectedCategory === category._id ? "text-black" : "text-gray-500"}`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sub Category filter */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Sub Category</h3>
              <button className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <ul className="space-y-2">
              {filteredSubCategories.map((subCategory) => (
                <li key={subCategory._id}>
                  <button
                    onClick={() => handleSubCategoryChange(subCategory._id)}
                    className={`text-left w-full hover:text-black ${selectedSubCategory === subCategory._id ? "text-black" : "text-gray-500"}`}
                  >
                    {subCategory.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Collections</h3>
              <button className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <ul className="space-y-2">
              {collections.map((collection) => (
                <li key={collection}>
                  <button className="text-left w-full text-gray-500 hover:text-black">{collection}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button key={tag} className="text-sm text-gray-500 hover:text-black">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-80 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="group">
                    <Link to={`/products/${product._id}`} className="block">
                      <div className="relative overflow-hidden mb-4">
                        <img
                          src={product.image || "/placeholder.svg?height=400&width=400"}
                          alt={product.name}
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=400"
                          }}
                        />
                        {product.discount && product.discount > 0 && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {product.discount}% OFF
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-medium">${(product.finalPrice || product.price).toFixed(2)}</span>
                        {product.discount && product.discount > 0 && (
                          <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <div className="flex mt-2">
                        {/* Color options - just placeholders */}
                        <div className="w-5 h-5 rounded-full bg-yellow-400 border border-gray-300 mr-1"></div>
                        <div className="w-5 h-5 rounded-full bg-black mr-1"></div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-8 h-8 flex items-center justify-center border ${
                        currentPage === index + 1 ? "border-black bg-black text-white" : "border-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button className="w-8 h-8 flex items-center justify-center border border-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products

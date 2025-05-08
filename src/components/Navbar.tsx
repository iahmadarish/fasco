"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Menu, X, User, Search } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-gray-800">
            FASCO
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-black">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-black">
              Products
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-black">
              New Arrivals
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-black">
              Deals
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleSearch} className="text-gray-600 hover:text-black" aria-label="Search">
              <Search size={20} />
            </button>
            <Link to="/cart" className="text-gray-600 hover:text-black relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/login" className="text-gray-600 hover:text-black hidden md:block">
              <User size={20} />
            </Link>
            <button onClick={toggleMenu} className="text-gray-600 hover:text-black md:hidden" aria-label="Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="flex flex-col py-4 space-y-4">
              <Link to="/" className="text-gray-600 hover:text-black">
                Home
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-black">
                Products
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-black">
                New Arrivals
              </Link>
              <Link to="/products" className="text-gray-600 hover:text-black">
                Deals
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-black">
                Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar

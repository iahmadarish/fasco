import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FASCO</h3>
            <p className="text-gray-600 mb-4">
              Discover the latest fashion trends and high-quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-black">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-black">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-black">
                  Deals
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-black">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-black">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-gray-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Fashion Street, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gray-600 mr-2 flex-shrink-0" />
                <span className="text-gray-600">+880 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gray-600 mr-2 flex-shrink-0" />
                <span className="text-gray-600">info@fasco.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-200 pt-8 pb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-bold mb-2">Subscribe to our Newsletter</h3>
            <p className="text-gray-600 mb-4">Get the latest updates on new products and upcoming sales</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button className="bg-black text-white px-4 py-2 rounded-r hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} FASCO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

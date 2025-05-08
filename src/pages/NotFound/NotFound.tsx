import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-black mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound

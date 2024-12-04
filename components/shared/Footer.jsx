export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Servify. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="/about"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Contact
              </a>
              <a
                href="/privacy-policy"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
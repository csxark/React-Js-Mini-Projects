export const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white animate-slide-in-right">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms and Conditions</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Employee Reviews</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Categories Near You</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              </ul>
            </div>
  
            <div>
              <h4 className="text-lg font-semibold mb-4">For Professionals</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Register as Professional</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Professional Guidelines</a></li>
              </ul>
            </div>
          </div>
  
          <div className="pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 SERVICE-LO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };

export default Footer; 
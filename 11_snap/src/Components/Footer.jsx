import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
    return (
      <footer className="bg-gradient-to-b from-orange-800 to-black text-white animate-slide-in-bottom">
        <div className="container mx-auto px-4 py-8">
          {/* Logo and Description */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-orange-400 mb-2">SnapFix</h3>
            <p className="text-orange-100 max-w-2xl mx-auto text-sm">
              Connecting you with trusted professionals for all your service needs
            </p>
          </div>

          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-3 text-orange-400">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-orange-100 hover:text-orange-400 transition-colors duration-300">About us</a></li>
                <li><a href="#" className="text-sm text-orange-100 hover:text-orange-400 transition-colors duration-300">Terms and Conditions</a></li>
                <li><a href="#" className="text-sm text-orange-100 hover:text-orange-400 transition-colors duration-300">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-3 text-orange-400">For Customers</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-orange-100 hover:text-orange-400 transition-colors duration-300">Employee Reviews</a></li>
                <li><a href="#" className="text-sm text-orange-100 hover:text-orange-400 transition-colors duration-300">Categories Near You</a></li>
                <li><a href="#" className="text-sm text-orange-100 hover:text-orange-400 transition-colors duration-300">Blog</a></li>
              </ul>
            </div>
  
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-3 text-orange-400">For Professionals</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-orange-100 hover:text-orange-400 transition-colors duration-300">Register as Professional</a></li>
                <li><a href="#" className="text-sm text-orange-100 hover:text-orange-400 transition-colors duration-300">Professional Guidelines</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
              <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
            </a>
            {/* <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
              <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
            </a> */}
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
            </a>
            <a href="#" className="text-orange-400 hover:text-orange-300 transition-colors duration-300">
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-orange-800/30 text-center">
            <p className="text-orange-200 text-sm">&copy; {new Date().getFullYear()} SnapFix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;
import { NavLink } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
import logo from "../assets/personal_diary_logo.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <NavLink
            to=""
            className="flex items-center space-x-3 min-w-0 flex-1 group"
          >
            <div className="relative">
              <img
                src={logo}
                alt="Website-Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 flex-shrink-0 
                           transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <h1
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate 
                             bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent
                             group-hover:from-purple-100 group-hover:to-white transition-all duration-300"
              >
                Your Personal Diary
              </h1>
              <p className="text-xs sm:text-sm text-purple-100/80 font-medium hidden sm:block">
                Capture Your Moments
              </p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavLink
              className="flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-sm
                         font-semibold transition-all duration-300 px-6 py-3 rounded-xl
                         border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl
                         transform hover:scale-105 group"
              to="/posts"
            >
              <div
                className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center 
                              rounded-full transition-all duration-300"
              >
                <DotLottieReact
                  src="https://lottie.host/28982f4f-26cc-40aa-92fa-1b1d57a34c78/AmokKFs5qg.lottie"
                  loop
                  autoplay
                  style={{
                    width: "100%",
                    height: "100%",
                    filter: "hue-rotate(-140deg) saturate(6) contrast(2)",
                  }}
                />
              </div>
              <span className="whitespace-nowrap text-sm lg:text-base text-white font-semibold">
                Create New Post
              </span>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm
                       border border-white/20 hover:border-white/40 transition-all duration-300
                       transform hover:scale-110 shadow-lg"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                transform: isMobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
          }`}
        >
          <div className="py-6 border-t border-white/20 mt-4">
            <NavLink
              className="flex items-center justify-center bg-white/10 hover:bg-white/20 
                         backdrop-blur-sm font-semibold transition-all duration-300 
                         px-6 py-4 rounded-xl mx-4 border border-white/20 hover:border-white/40
                         shadow-lg hover:shadow-xl transform hover:scale-105"
              to="/posts"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-white font-semibold">Create New Post</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

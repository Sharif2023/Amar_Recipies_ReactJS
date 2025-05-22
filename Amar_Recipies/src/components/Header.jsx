import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    });
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition">
          Home
        </Link>
      </li>
      <li>
        <Link to="/recipes" className="text-gray-700 hover:text-orange-600 font-medium transition">
          Recipes
        </Link>
      </li>
      <li>
        <Link to="/submit" className="text-gray-700 hover:text-orange-600 font-medium transition">
          Submit Recipe
        </Link>
      </li>
      <li>
        <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition">
          About Us
        </Link>
      </li>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-50 mx-auto max-w-screen-xl rounded-none px-4 py-3 shadow-md border bg-white lg:px-8 lg:py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-600 tracking-wide">
          Amar Recipe 🍲
        </Link>
        <div className="hidden lg:flex items-center gap-6">{navList}</div>
        <div className="hidden lg:flex gap-2">
          <Button variant="outlined" size="sm">
            Log In
          </Button>
          <Button variant="gradient" size="sm" color="orange">
            Sign Up
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-gray-800 lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav} className="lg:hidden">
        {navList}
        <div className="mt-4 flex flex-col gap-2">
          <Button variant="outlined" size="sm">
            Log In
          </Button>
          <Button variant="gradient" size="sm" color="orange">
            Sign Up
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}

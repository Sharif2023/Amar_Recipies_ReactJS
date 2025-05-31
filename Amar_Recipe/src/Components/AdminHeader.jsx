import React, { useState } from "react";
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  // Dropdown visibility state
  const [firstDropdownOpen, setFirstDropdownOpen] = useState(false);
  const [secondDropdownOpen, setSecondDropdownOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(true);

  return (
    <header>
      {/* Navbar */}
      <nav className="relative flex w-full items-center bg-[#1f1f1f] py-2 px-4 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between">
          {/* Hamburger button for mobile */}
          <button
            type="button"
            className="block border-0 bg-transparent p-2 text-neutral-400 hover:text-orange-600 focus:outline-none lg:hidden"
            aria-controls="navbarSupportedContent1"
            aria-expanded={!navCollapsed}
            aria-label="Toggle navigation"
            onClick={() => setNavCollapsed(!navCollapsed)}
          >
            {/* Hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center text-white font-bold text-2xl mb-4 lg:mb-0 cursor-pointer gap-2">
            <img
              src="src/assets/Amar_Recipe_Header_Logo.svg"
              className="w-8 h-8"
              alt="Amar Recipe Header Logo"
            />
            আমার রেসিপি <small> (Admin Panel) </small>
          </div>

          {/* Nav links + search (collapsible on mobile) */}
          <div
            className={`w-full lg:flex lg:w-auto lg:items-center ${
              navCollapsed ? "hidden" : "block"
            }`}
            id="navbarSupportedContent1"
          >
            <ul className="flex flex-col lg:flex-row list-none gap-4 lg:gap-6 mb-4 lg:mb-0 lg:mr-6 text-neutral-400">
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 rounded hover:text-orange-600 transition"
                >
                  ড্যাশবোর্ড
                </a>
              </li>
              <li>
                <a
                  href="/submissionrequests"
                  className="block px-2 py-1 rounded hover:text-orange-600 transition"
                >
                  সাবমিশন রিকুয়েষ্ট
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-2 py-1 rounded hover:text-orange-600 transition"
                >
                  রিপোর্ট
                </a>
              </li>
            </ul>

            {/* Search bar */}
            <div className="mb-4 lg:mb-0 lg:ml-0 lg:mr-6 flex justify-center">
              <input
                type="text"
                placeholder="Search..."
                className="w-full max-w-md rounded-md border border-gray-600 bg-[#2a2a2a] px-3 py-1.5 text-sm text-neutral-300 placeholder:text-neutral-500 focus:border-orange-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Right elements */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <a
              href="#"
              className="text-neutral-400 hover:text-orange-600 transition"
              aria-label="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </a>

            {/* First dropdown */}
            <div className="relative">
              <button
                onClick={() => setFirstDropdownOpen(!firstDropdownOpen)}
                className="flex items-center text-neutral-400 hover:text-orange-600 transition"
                aria-expanded={firstDropdownOpen}
                aria-haspopup="true"
                aria-controls="dropdownMenu1"
                aria-label="Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="absolute -mt-4 ml-2 rounded-full bg-red-600 px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">
                  1
                </span>
              </button>
              {firstDropdownOpen && (
                <ul
                  id="dropdownMenu1"
                  className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-lg bg-[#1f1f1f] py-1 shadow-lg shadow-black/80"
                  role="menu"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-neutral-300 hover:bg-orange-600"
                      role="menuitem"
                    >
                      Action
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-neutral-300 hover:bg-orange-600"
                      role="menuitem"
                    >
                      Another action
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-neutral-300 hover:bg-orange-600"
                      role="menuitem"
                    >
                      Something else here
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* Second dropdown */}
            <div className="relative">
              <button
                onClick={() => setSecondDropdownOpen(!secondDropdownOpen)}
                className="flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none text-neutral-400 hover:text-orange-600"
                aria-expanded={secondDropdownOpen}
                aria-haspopup="true"
                aria-controls="dropdownMenu2"
                aria-label="User menu"
              >
                <img
                  src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                  alt="User avatar"
                  loading="lazy"
                  className="h-6 w-6 rounded-full"
                />
              </button>
              {secondDropdownOpen && (
                <ul
                  id="dropdownMenu2"
                  className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-lg bg-[#1f1f1f] py-1 shadow-lg shadow-black/80"
                  role="menu"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-neutral-300 hover:bg-orange-600"
                      role="menuitem"
                    >
                      Action
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-neutral-300 hover:bg-orange-600"
                      role="menuitem"
                    >
                      Another action
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-neutral-300 hover:bg-orange-600"
                      role="menuitem"
                    >
                      Something else here
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;

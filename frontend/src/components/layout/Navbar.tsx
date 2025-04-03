import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-primary-600">
                  StartTex
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`relative px-3 py-2 text-sm font-medium transition duration-200 ease-in-out rounded-md 
                        ${
                          location.pathname === item.href
                            ? "text-primary-600 font-semibold"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                    >
                      {item.name}
                      {location.pathname === item.href && (
                        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-600" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:flex sm:items-center">
                <Link
                  to="/login"
                  className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  Sign in
                </Link>
              </div>
              <div className="-mr-2 flex sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition duration-200 ease-in-out 
                    ${
                      location.pathname === item.href
                        ? "bg-primary-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="mt-4 px-4">
                <Link
                  to="/login"
                  className="block w-full text-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-primary-500"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

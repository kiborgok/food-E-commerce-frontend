import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <>
      <div className="min-h-full bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
              Create account
            </h2>
          </div>
          <form className="mt-8 space-y-8" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-6 border-t-0 border-r-0 border-l-0 border-b-2 border-red-600 focus:border-none placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-t-0 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-6 border-t-0 border-r-0 border-l-0 border-b-2 border-red-600 focus:border-none placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-t-0 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  autoComplete="current-phone"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-6 border-t-0 border-r-0 border-l-0 border-b-2 border-red-600 focus:border-none placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-t-0 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-6 border-t-0 border-r-0 border-l-0 border-b-2 border-red-600 focus:border-none placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-t-0 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="password_confirmation" className="sr-only">
                  Password Confirmation
                </label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  autoComplete="current-password_confirmation"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 my-6 border-t-0 border-r-0 border-l-0 border-b-2 border-red-600 focus:border-none placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-t-0 focus:z-10 sm:text-sm"
                  placeholder="Password Confirmation"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border-2 border-red-600 text-sm font-medium rounded-full text-gray-700  hover:border-4 focus:outline-none"
              >
                Signup
              </button>
            </div>
            <div class="text-sm text-center">
              <p class="font-medium text-black-600 hover:text-black-500">
                Aleady have an account?{" "}
                <Link
                  to="/signin"
                  class="font-medium underline text-bold text-black-600 hover:text-black-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function Product({ features, onHover }) {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Transactions
          </h2>
        </div> */}

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-14">
            {features.map((feature) => (
              <div className="relative  ">
                <div
                  key={feature.name}
                  className={
                    feature.active
                      ? "border p-3 rounded-lg shadow absolute"
                      : "relative"
                  }
                  onMouseEnter={() => onHover(feature.name)}
                  onMouseLeave={() => onHover(feature.name)}
                >
                  <dt>
                    <p className="ml-20 p-1 text-lg leading-6 font-medium">
                      {feature.name}
                    </p>
                    <div className="absolute flex h-25 w-25 items-center justify-center text-white">
                      <img
                        src={feature.photo_url}
                        className="h-20 w-20 rounded-full"
                        aria-hidden="true"
                        alt={feature.name}
                      />
                    </div>
                    <p className="ml-20 p-1 text-lg leading-6 text-red-500">
                      Ksh. {feature.price}
                    </p>
                  </dt>
                  <dd className="ml-20 p-1 text-base text-gray-500">
                    {feature.description}
                  </dd>
                  <dd
                    className={
                      feature.active
                        ? "mt-2 ml-16 text-base text-gray-500"
                        : "hidden mt-2 ml-16 text-base text-gray-500"
                    }
                  >
                    <button class="flex items-center px-24 py-2 text-red-500 text-lg outline outline-red-500 rounded-full hover:outline-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 mr-2 text-red"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span>Add To cart</span>
                    </button>
                  </dd>

                  <div
                    className={
                      feature.active
                        ? ""
                        : "border-3 shadow border mt-6 border-gray-200"
                    }
                  />
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

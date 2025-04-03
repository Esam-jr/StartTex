import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to <span className="text-primary-600">StartTex</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Connecting startups with opportunities through meaningful
            conversations.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              to="/login"
              className="rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-primary-500 focus:ring focus:ring-primary-400"
            >
              Get started
            </Link>
            <Link
              to="/about"
              className="text-sm font-semibold text-gray-900 hover:text-primary-600 transition duration-300"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-lg font-semibold text-primary-600">
              Grow faster
            </h2>
            <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to scale your startup
            </p>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Connect with mentors, investors, and other entrepreneurs to take
              your startup to the next level.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: "Expert Mentorship",
    description:
      "Connect with experienced mentors who can guide you through your startup journey.",
  },
  {
    name: "Investor Network",
    description:
      "Access our network of investors looking for promising startups to support.",
  },
  {
    name: "Resource Library",
    description:
      "Get access to our curated library of resources, tools, and best practices.",
  },
];

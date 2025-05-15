import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-20 pb-24 md:pt-32">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <h1 className="mb-6 text-5xl font-bold text-indigo-600 md:text-6xl">
            SocialNova
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            The next generation social platform that redefines how people connect, express, and grow in the digital world.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <Link
              href="/auth"
              className="rounded-full bg-indigo-600 px-8 py-3 text-white hover:bg-indigo-700"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-indigo-600 px-8 py-3 text-indigo-600 hover:bg-indigo-50"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
            Revolutionary Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 rounded-full bg-indigo-100 p-3 text-indigo-600 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI-Powered Creation</h3>
              <p className="text-gray-600">
                Enhance your content with AI tools that help you create, edit, and improve your posts.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 rounded-full bg-indigo-100 p-3 text-indigo-600 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Interest Realms</h3>
              <p className="text-gray-600">
                Join micro-communities around your passions with smart moderation and live interactions.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 rounded-full bg-indigo-100 p-3 text-indigo-600 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Creator Economy</h3>
              <p className="text-gray-600">
                Monetize your content with tipping, branded collaborations, and transparent metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-xl bg-indigo-600 p-8 text-center text-white md:p-12">
          <h2 className="mb-4 text-3xl font-bold">Ready to redefine social media?</h2>
          <p className="mx-auto mb-6 max-w-2xl">
            Join SocialNova today and experience the future of digital connection, creativity, and community.
          </p>
          <Link
            href="/auth"
            className="inline-block rounded-full bg-white px-8 py-3 font-medium text-indigo-600 hover:bg-gray-100"
          >
            Sign Up Now
          </Link>
        </section>
      </div>
    </>
  );
}

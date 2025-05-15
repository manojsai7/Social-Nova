import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-center text-4xl font-bold text-indigo-600">About SocialNova</h1>
          
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">Our Vision</h2>
            <p className="mb-4 text-lg text-gray-700">
              SocialNova is a revolutionary social media platform designed to redefine how people connect, express, and grow in the digital world. We're not just another photo-sharing app; we're a comprehensive ecosystem that empowers creators, fosters authentic communities, and leverages cutting-edge technology to enhance human connection.
            </p>
            <p className="text-lg text-gray-700">
              Our platform fuses the best aspects of Instagram, TikTok, Pinterest, and Reddit — and then goes far beyond them, creating something entirely new and transformative.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">Core Principles</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">Creator Empowerment</h3>
                <p className="text-gray-700">
                  We put creators first with transparent algorithms, robust monetization tools, and growth metrics that give power back to the people who make the platform valuable.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">Community-Centric</h3>
                <p className="text-gray-700">
                  Our "Realms" feature enables micro-communities around niche interests, with smart moderation tools and governance that fosters healthy interaction.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">Privacy & Control</h3>
                <p className="text-gray-700">
                  Users have total control over their data, visibility, and feed curation, unlike black-box algorithms that dictate what you see.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">AI-Enhanced Creativity</h3>
                <p className="text-gray-700">
                  We leverage AI not to replace human creativity but to enhance it, with tools that help creators overcome blocks and reach new heights.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">Revolutionary Features</h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">Ultra-Smooth Media Sharing</h3>
                <p className="text-gray-700">
                  Share photos, short videos, and audio snippets with a seamless, intuitive interface designed for both casual users and professional creators.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">AI-Curated Discovery</h3>
                <p className="text-gray-700">
                  Our advanced machine learning models adapt to your evolving interests, moods, and creativity styles, delivering a hyper-personalized feed that feels magical.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">Real-Time Collaboration</h3>
                <p className="text-gray-700">
                  Co-create with friends and collaborators through live co-posting, duet videos, and collaborative albums that make creativity social.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">Next-Level Creative Tools</h3>
                <p className="text-gray-700">
                  Access powerful editing tools powered by generative AI and AR, including real-time background replacement, emotion-enhancing filters, and AI remixes.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">Gamified Growth</h3>
                <p className="text-gray-700">
                  Earn reputation scores, skill-based badges, and participate in story quests and community challenges that make engagement rewarding and fun.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold">Join the Revolution</h2>
            <p className="mb-6 text-lg text-gray-700">
              SocialNova is more than a platform—it's a movement to reclaim social media as a force for creativity, connection, and positive growth. We're building a digital space that respects your privacy, amplifies your voice, and helps you find your people.
            </p>
            <div className="flex justify-center">
              <Link
                href="/auth"
                className="rounded-full bg-indigo-600 px-8 py-3 text-white hover:bg-indigo-700"
              >
                Join SocialNova Today
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <header className="bg-blue-600 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-8 flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Welcome to ArticleHub</h1>
          <div>
            <Link href="/auth/login" className="text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Login
            </Link>
            <Link href="/auth/register" className="ml-4 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Register
            </Link>
          </div>
        </div>
      </header>

      <main className="py-16 px-8">
        <div className="max-w-screen-xl mx-auto">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Recent Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src="/article-image1.jpg"
                  alt="Article 1"
                  width={300}
                  height={200}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">How to Get Started with React</h3>
                  <p className="mt-4 text-gray-600">A beginner's guide to learning React and building modern web applications.</p>
                  <Link href="#" className="mt-4 text-blue-600 hover:underline block">
                    Read more
                  </Link>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src="/article-image1.jpg"
                  alt="Article 1"
                  width={300}
                  height={200}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">How to Get Started with React</h3>
                  <p className="mt-4 text-gray-600">A beginner's guide to learning React and building modern web applications.</p>
                  <Link href="#" className="mt-4 text-blue-600 hover:underline block">
                    Read more
                  </Link>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  className="w-full h-64 object-cover"
                  src="/article-image1.jpg"
                  alt="Article 1"
                  width={300}
                  height={200}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">How to Get Started with React</h3>
                  <p className="mt-4 text-gray-600">A beginner's guide to learning React and building modern web applications.</p>
                  <Link href="#" className="mt-4 text-blue-600 hover:underline block">
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Want to Contribute?</h2>
            <p className="text-lg text-gray-600 mb-6">If you're passionate about writing, we welcome guest posts! Share your expertise with our community.</p>
            <Link
              href="/submit-article"
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-xl hover:bg-blue-700 transition"
            >
              Submit an Article
            </Link>
          </section>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex justify-center space-x-8 mb-6">
            <Link href="/about" className="hover:underline">About Us</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          </div>
          <p className="text-center text-sm text-gray-400">&copy; 2025 ArticleHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

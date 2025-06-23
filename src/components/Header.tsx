import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Design Tools</h1>
              <p className="text-xs text-gray-500">Directory</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/category/design-tools" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Design Tools
            </Link>
            <Link href="/category/icons" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Icons
            </Link>
            <Link href="/category/illustrations" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Illustrations
            </Link>
            <Link href="/category/ai-tools" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
              AI Tools
            </Link>
          </nav>
          
          <a
            href="https://www.toools.design/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Visit Source
          </a>
        </div>
      </div>
    </header>
  );
}

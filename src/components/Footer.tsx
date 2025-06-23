export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Design Tools Directory</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              A comprehensive collection of the best design tools, resources, and inspiration 
              for designers, developers, and creators. Discover new tools to enhance your workflow 
              and bring your ideas to life.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
            <div className="space-y-2 text-sm">
              <a href="/category/design-tools" className="block text-gray-600 hover:text-blue-600 transition-colors">Design Tools</a>
              <a href="/category/icons" className="block text-gray-600 hover:text-blue-600 transition-colors">Icons</a>
              <a href="/category/illustrations" className="block text-gray-600 hover:text-blue-600 transition-colors">Illustrations</a>
              <a href="/category/mockups" className="block text-gray-600 hover:text-blue-600 transition-colors">Mockups</a>
              <a href="/category/typography" className="block text-gray-600 hover:text-blue-600 transition-colors">Typography</a>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Resources</h4>
            <div className="space-y-2 text-sm">
              <a href="/category/learning" className="block text-gray-600 hover:text-blue-600 transition-colors">Learning</a>
              <a href="/category/blogs" className="block text-gray-600 hover:text-blue-600 transition-colors">Blogs</a>
              <a href="/category/podcasts" className="block text-gray-600 hover:text-blue-600 transition-colors">Podcasts</a>
              <a href="/category/books" className="block text-gray-600 hover:text-blue-600 transition-colors">Books</a>
              <a href="/category/community" className="block text-gray-600 hover:text-blue-600 transition-colors">Community</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Design Tools Directory. Data sourced from{' '}
            <a 
              href="https://www.toools.design/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              toools.design
            </a>
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-500">
              Last updated: January 2025
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

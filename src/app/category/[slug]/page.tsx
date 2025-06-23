import Link from "next/link";
import { notFound } from "next/navigation";

async function getDesignToolsData(): Promise<any> {
  try {
    // In development, fetch from the file directly
    if (process.env.NODE_ENV === 'development') {
      const fs = require('fs');
      const path = require('path');
      const dataPath = path.join(process.cwd(), 'public', 'design_tools_database.json');
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    }
    
    // In production, fetch via HTTP
    const response = await fetch('/design_tools_database.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching design tools data:', error);
    return null;
  }
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow group">
      <div className="flex items-start gap-4">
        <img 
          src={tool.image} 
          alt={`${tool.name} icon`}
          className="w-12 h-12 rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
                tool.pricing === 'FREE' ? 'bg-green-100 text-green-700' :
                tool.pricing === 'FREEMIUM' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {tool.pricing}
              </span>
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {tool.description}
          </p>
          {tool.use_cases && tool.use_cases.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tool.use_cases.slice(0, 3).map((useCase: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {useCase}
                </span>
              ))}
              {tool.use_cases.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{tool.use_cases.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getDesignToolsData();
  
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to load design tools</h1>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  const category = data?.categories?.[slug];
  
  if (!category) {
    notFound();
  }

  const tools = category.tools || [];

  // Category icon mapping
  const categoryIcons: { [key: string]: string } = {
    inspiration: "🎨",
    illustrations: "🖼️",
    icons: "✨",
    mockups: "📱",
    typography: "🔤",
    "stock-photos": "📸",
    learning: "📚",
    blogs: "📝",
    podcasts: "🎙️",
    books: "📖",
    accessibility: "♿",
    community: "👥",
    "ai-tools": "🤖",
    "design-tools": "🛠️",
    "ux-tools": "🔍",
    "color-tools": "🎨",
    "project-tools": "📋",
    "web-builder": "🌐"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{categoryIcons[slug] || "🔧"}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                {category.description}
              </p>
              <div className="mt-2 text-sm text-gray-500">
                {tools.length} tools available
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tools.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔧</div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No tools available</h3>
            <p className="text-gray-600">Check back later for new tools in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool: any, index: number) => (
              <ToolCard key={`${tool.name}-${index}`} tool={tool} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 Design Tools Directory. Data sourced from {data.meta?.source || 'Various sources'}</p>
            <p className="mt-1">Last updated: {data.meta?.created_date || 'Recently'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

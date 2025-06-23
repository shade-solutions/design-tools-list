import Link from "next/link";
import FeaturedToolCard from "@/components/FeaturedToolCard";

// Category icons mapping
const categoryIcons = {
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

function CategoryCard({ category, categoryKey, toolCount }: {
  category: { name: string; description: string; tools: any[] };
  categoryKey: string;
  toolCount: number;
}) {
  return (
    <Link 
      href={`/category/${categoryKey}`}
      className="group block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{categoryIcons[categoryKey as keyof typeof categoryIcons] || "🔧"}</span>
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {category.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {toolCount} tools
        </span>
        <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export default async function Home() {
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

  const categories = Object.entries(data?.categories || {});
  const featuredTools = categories
    .flatMap(([_, category]: [string, any]) => category.tools || [])
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Design Tools Directory
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the best design tools, resources, and inspiration for your creative projects
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {data.meta?.total_tools || 0}+ tools across {categories.length} categories
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Tools Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool, index) => (
              <FeaturedToolCard key={`${tool.name}-${index}`} tool={tool} />
            ))}
          </div>
        </section>

        {/* Categories Grid */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map(([categoryKey, category]: [string, any]) => (
              <CategoryCard
                key={categoryKey}
                category={category}
                categoryKey={categoryKey}
                toolCount={category.tools.length}
              />
            ))}
          </div>
        </section>
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

import Link from "next/link";
import { notFound } from "next/navigation";
import ToolCard from "@/components/ToolCard";

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
    <div className="bg-gray-50">
      {/* Category Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{categoryIcons[slug] || "🔧"}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                {category.description}
              </p>
              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {tools.length} tools
                </span>
                <span>•</span>
                <span>Updated regularly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {tools.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔧</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No tools available</h3>
            <p className="text-gray-600 mb-6">Check back later for new tools in this category.</p>
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Other Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool: any, index: number) => (
              <ToolCard key={`${tool.name}-${index}`} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

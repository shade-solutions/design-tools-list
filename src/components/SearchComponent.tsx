'use client';

import { useState, useMemo } from 'react';

interface Tool {
  name: string;
  description: string;
  url: string;
  image: string;
  pricing: string;
  use_cases?: string[];
}

interface SearchProps {
  data: {
    categories: Record<string, {
      name: string;
      tools: Tool[];
    }>;
  };
}

export default function SearchComponent({ data }: SearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const allTools: (Tool & { category: string; categoryName: string })[] = [];
    
    Object.entries(data.categories).forEach(([categoryKey, category]) => {
      category.tools.forEach((tool) => {
        allTools.push({
          ...tool,
          category: categoryKey,
          categoryName: category.name
        });
      });
    });

    return allTools.filter((tool) => 
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase()) ||
      tool.use_cases?.some(useCase => 
        useCase.toLowerCase().includes(query.toLowerCase())
      )
    ).slice(0, 8); // Limit results
  }, [query, data]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search design tools..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
        />
        <svg 
          className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {isOpen && query.trim() && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
            {searchResults.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <div className="text-2xl mb-2">🔍</div>
                <p>No tools found for &ldquo;{query}&rdquo;</p>
              </div>
            ) : (
              <div className="py-2">
                {searchResults.map((tool, index) => (
                  <a
                    key={`${tool.name}-${index}`}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <img 
                      src={tool.image}
                      alt={`${tool.name} icon`}
                      className="w-8 h-8 rounded bg-gray-50"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-icon.svg';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 truncate">
                          {tool.name}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-md ml-2 font-medium ${
                          tool.pricing === 'FREE' ? 'bg-gray-100 text-gray-700' :
                          tool.pricing === 'FREEMIUM' ? 'bg-gray-100 text-gray-700' :
                          'bg-gray-900 text-white'
                        }`}>
                          {tool.pricing}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {tool.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        in {tool.categoryName}
                      </p>
                    </div>
                  </a>
                ))}
                {searchResults.length === 8 && (
                  <div className="p-3 text-center text-xs text-gray-500 border-t border-gray-100">
                    Showing top 8 results
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

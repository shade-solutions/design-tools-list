'use client';

import { useState } from 'react';

interface Tool {
  name: string;
  description: string;
  url: string;
  image: string;
  pricing: string;
  use_cases?: string[];
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200 group">
      <div className="flex items-start gap-4">
        <img 
          src={imageError ? '/placeholder-icon.svg' : tool.image}
          alt={`${tool.name} icon`}
          className="w-12 h-12 rounded-lg flex-shrink-0 bg-gray-50"
          onError={() => setImageError(true)}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                {tool.name}
              </h3>
              <span className={`inline-block text-xs px-2 py-1 rounded-md mt-1 font-medium ${
                tool.pricing === 'FREE' ? 'bg-gray-100 text-gray-700' :
                tool.pricing === 'FREEMIUM' ? 'bg-gray-100 text-gray-700' :
                'bg-gray-900 text-white'
              }`}>
                {tool.pricing}
              </span>
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
          {tool.use_cases && tool.use_cases.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tool.use_cases.slice(0, 3).map((useCase: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100"
                >
                  {useCase}
                </span>
              ))}
              {tool.use_cases.length > 3 && (
                <span className="text-xs text-gray-400">
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

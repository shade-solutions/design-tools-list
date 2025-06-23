'use client';

import { useState } from 'react';

interface Tool {
  name: string;
  description: string;
  url: string;
  image: string;
  pricing: string;
}

export default function FeaturedToolCard({ tool }: { tool: Tool }) {
  const [imageError, setImageError] = useState(false);

  return (
    <a 
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200 block group"
    >
      <div className="flex items-center gap-3 mb-2">
        <img 
          src={imageError ? '/placeholder-icon.svg' : tool.image}
          alt={`${tool.name} icon`}
          className="w-8 h-8 rounded-lg bg-gray-50"
          onError={() => setImageError(true)}
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            {tool.name}
          </h4>
          <span className={`text-xs px-2 py-0.5 rounded-md font-medium mt-1 inline-block ${
            tool.pricing === 'FREE' ? 'bg-gray-100 text-gray-700' :
            tool.pricing === 'FREEMIUM' ? 'bg-gray-100 text-gray-700' :
            'bg-gray-900 text-white'
          }`}>
            {tool.pricing}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{tool.description}</p>
    </a>
  );
}

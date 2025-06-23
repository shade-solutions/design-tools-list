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
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow block"
    >
      <div className="flex items-center gap-3 mb-2">
        <img 
          src={imageError ? '/placeholder-icon.svg' : tool.image}
          alt={`${tool.name} icon`}
          className="w-8 h-8 rounded"
          onError={() => setImageError(true)}
        />
        <div>
          <h4 className="font-medium text-gray-900">{tool.name}</h4>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            tool.pricing === 'FREE' ? 'bg-green-100 text-green-700' :
            tool.pricing === 'FREEMIUM' ? 'bg-blue-100 text-blue-700' :
            'bg-orange-100 text-orange-700'
          }`}>
            {tool.pricing}
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-600 line-clamp-2">{tool.description}</p>
    </a>
  );
}

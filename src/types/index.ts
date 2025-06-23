export interface Tool {
  name: string;
  description: string;
  url: string;
  image: string;
  pricing: string;
  use_cases?: string[];
}

export interface Category {
  name: string;
  description: string;
  tools: Tool[];
}

export interface DesignToolsData {
  meta: {
    source: string;
    created_date: string;
    total_tools: number;
    description: string;
  };
  categories: Record<string, Category>;
}

export interface SearchResult extends Tool {
  category: string;
  categoryName: string;
}

#!/usr/bin/env python3
"""
Design Tools Database Search Tool
Allows searching and filtering through the scraped design tools database
"""

import json
import argparse
import sys
from typing import List, Dict, Any, Optional

def load_database(file_path: str) -> Dict[str, Any]:
    """Load the JSON database file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print(f"Error: Database file '{file_path}' not found.")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in '{file_path}'.")
        sys.exit(1)

def search_tools(database: Dict[str, Any], query: str, category: Optional[str] = None, pricing: Optional[str] = None) -> List[Dict[str, Any]]:
    """Search for tools based on query, category, and pricing"""
    results = []
    
    # Get all tools from the comprehensive database
    if 'comprehensive_tools_database' in database:
        categories = database['comprehensive_tools_database']['categories']
    else:
        categories = database.get('categories', {})
    
    for cat_name, cat_data in categories.items():
        # Skip if specific category requested and doesn't match
        if category and category.lower() not in cat_name.lower():
            continue
            
        tools = []
        
        # Handle different data structures
        if isinstance(cat_data, list):
            tools = cat_data
        elif isinstance(cat_data, dict):
            if 'tools' in cat_data:
                tools = cat_data['tools']
            else:
                # Handle subcategories
                for subcat_name, subcat_data in cat_data.items():
                    if isinstance(subcat_data, list):
                        tools.extend(subcat_data)
                    elif isinstance(subcat_data, dict) and 'tools' in subcat_data:
                        tools.extend(subcat_data['tools'])
        
        for tool in tools:
            if isinstance(tool, dict):
                # Check if tool matches search criteria
                matches_query = True
                matches_pricing = True
                
                if query:
                    query_lower = query.lower()
                    matches_query = (
                        query_lower in tool.get('name', '').lower() or
                        query_lower in tool.get('description', '').lower() or
                        any(query_lower in use_case.lower() for use_case in tool.get('use_cases', []))
                    )
                
                if pricing:
                    tool_pricing = tool.get('pricing', '').lower()
                    matches_pricing = pricing.lower() in tool_pricing
                
                if matches_query and matches_pricing:
                    tool_copy = tool.copy()
                    tool_copy['category'] = cat_name
                    results.append(tool_copy)
    
    return results

def display_results(results: List[Dict[str, Any]], detailed: bool = False):
    """Display search results"""
    if not results:
        print("No tools found matching your criteria.")
        return
    
    print(f"\nFound {len(results)} tool(s):\n")
    
    for i, tool in enumerate(results, 1):
        name = tool.get('name', 'Unknown')
        description = tool.get('description', 'No description')
        pricing = tool.get('pricing', 'Unknown')
        category = tool.get('category', 'Unknown')
        url = tool.get('url', 'No URL')
        
        print(f"{i}. {name}")
        print(f"   Category: {category}")
        print(f"   Pricing: {pricing}")
        
        if detailed:
            print(f"   Description: {description}")
            print(f"   URL: {url}")
            use_cases = tool.get('use_cases', [])
            if use_cases:
                print(f"   Use Cases: {', '.join(use_cases)}")
        else:
            # Truncate description for brief view
            desc_short = description[:80] + "..." if len(description) > 80 else description
            print(f"   Description: {desc_short}")
        
        print()

def list_categories(database: Dict[str, Any]):
    """List all available categories"""
    print("Available categories:")
    
    if 'comprehensive_tools_database' in database:
        categories = database['comprehensive_tools_database']['categories']
    else:
        categories = database.get('categories', {})
    
    for cat_name in categories.keys():
        print(f"  - {cat_name}")

def list_pricing_options():
    """List available pricing options"""
    print("Available pricing options:")
    print("  - free")
    print("  - freemium") 
    print("  - paid")
    print("  - free + paid")

def main():
    parser = argparse.ArgumentParser(description='Search design tools database')
    parser.add_argument('query', nargs='?', help='Search query (tool name, description, or use case)')
    parser.add_argument('-c', '--category', help='Filter by category')
    parser.add_argument('-p', '--pricing', help='Filter by pricing (free, freemium, paid, free+paid)')
    parser.add_argument('-d', '--detailed', action='store_true', help='Show detailed information')
    parser.add_argument('--list-categories', action='store_true', help='List all categories')
    parser.add_argument('--list-pricing', action='store_true', help='List pricing options')
    parser.add_argument('--database', default='comprehensive_database.json', help='Database file to use')
    
    args = parser.parse_args()
    
    # Load database
    database = load_database(args.database)
    
    # Handle list commands
    if args.list_categories:
        list_categories(database)
        return
    
    if args.list_pricing:
        list_pricing_options()
        return
    
    # Perform search
    results = search_tools(database, args.query, args.category, args.pricing)
    display_results(results, args.detailed)

if __name__ == '__main__':
    main()

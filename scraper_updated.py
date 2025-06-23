#!/usr/bin/env python3
"""
Updated scraper for toools.design current structure
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import os
import re
from urllib.parse import urljoin, urlparse

def scrape_category_page(url, category_name):
    """Scrape a category page and extract tool information"""
    print(f"Scraping {category_name}: {url}")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        tools = []
        
        # Find tool links - they are simple links with tool names and descriptions
        # Looking for pattern: [Tool Name Description PRICING_TAG](url)
        text_content = soup.get_text()
        
        # Find all links that match the pattern
        links = soup.find_all('a', href=True)
        
        for link in links:
            try:
                url_href = link.get('href', '')
                if not url_href or url_href.startswith('#') or 'toools.design' in url_href:
                    continue
                
                link_text = link.get_text(strip=True)
                if not link_text or len(link_text) < 3:
                    continue
                
                # Try to parse the link text to extract name, description, and pricing
                parts = link_text.split()
                if len(parts) < 2:
                    continue
                
                # Look for pricing tags at the end
                pricing_tags = ['FREE', 'PAID', 'FREEMIUM', 'FREE + PAID', 'WITH ATTRIBUTION']
                pricing = 'FREE'  # default
                
                for tag in pricing_tags:
                    if tag in link_text.upper():
                        pricing = tag
                        link_text = link_text.replace(tag, '').strip()
                        break
                
                # Try to separate name from description
                # Usually the first few words are the name
                words = link_text.split()
                if len(words) >= 2:
                    # First 1-3 words are likely the name
                    if len(words) <= 3:
                        name = link_text
                        description = ""
                    else:
                        # Try to find where the name ends and description begins
                        name_words = []
                        desc_words = []
                        
                        # Look for capital letters or common patterns
                        for i, word in enumerate(words):
                            if i < 3 and (word[0].isupper() or word in ['uicons', 'Heroicons', 'Lucide']):
                                name_words.append(word)
                            else:
                                desc_words.extend(words[i:])
                                break
                        
                        if not name_words:
                            name_words = words[:2]
                            desc_words = words[2:]
                        
                        name = ' '.join(name_words)
                        description = ' '.join(desc_words)
                
                # Get favicon as image
                domain = urlparse(url_href).netloc
                image_url = f"https://{domain}/favicon.ico"
                
                # Default use cases based on category
                category_use_cases = {
                    'icons': ['Icons', 'UI Design', 'Web Design'],
                    'illustrations': ['Illustrations', 'Graphics', 'Design'],
                    'typography': ['Fonts', 'Typography', 'Web Fonts'],
                    'color-tools': ['Color Palettes', 'Design', 'UI'],
                    'mockups': ['Mockups', 'Presentation', 'Design'],
                    'inspiration': ['Inspiration', 'Design Showcase', 'Gallery'],
                    'ai-tools': ['AI', 'Automation', 'Design'],
                    'design-tools': ['Design', 'UI/UX', 'Software'],
                    'ux-tools': ['UX', 'User Experience', 'Research'],
                    'accessibility': ['Accessibility', 'A11y', 'Inclusive Design'],
                    'learning': ['Learning', 'Education', 'Tutorial'],
                    'community': ['Community', 'Design Community', 'Networking'],
                    'blogs': ['Blog', 'Articles', 'Design Writing'],
                    'podcasts': ['Podcast', 'Audio', 'Design Discussion'],
                    'books': ['Books', 'Reading', 'Design Education'],
                    'stock-photos': ['Stock Photos', 'Photography', 'Images'],
                    'project-tools': ['Project Management', 'Collaboration', 'Workflow'],
                    'web-builder': ['Website Builder', 'No-Code', 'Web Development']
                }
                use_cases = category_use_cases.get(category_name.lower(), ['Design', 'Tools'])
                
                if name and len(name.strip()) > 1:
                    tools.append({
                        'name': name.strip(),
                        'description': description.strip() if description else f"A useful tool for {category_name.lower()}",
                        'image': image_url,
                        'url': url_href,
                        'pricing': pricing,
                        'use_cases': use_cases
                    })
                    
            except Exception as e:
                print(f"Error processing link: {e}")
                continue
        
        # Remove duplicates and very short names
        unique_tools = []
        seen_names = set()
        
        for tool in tools:
            name_lower = tool['name'].lower()
            if (name_lower not in seen_names and 
                len(tool['name']) > 2 and 
                not tool['name'].lower() in ['home', 'blog', 'deals', 'image']):
                unique_tools.append(tool)
                seen_names.add(name_lower)
        
        return unique_tools
        
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return []

def scrape_toools_design():
    """Main scraping function"""
    base_url = "https://www.toools.design"
    
    # Define categories with their URLs
    categories = {
        "inspiration": {
            "name": "Inspiration",
            "description": "Design inspiration, galleries, and showcases",
            "urls": [f"{base_url}/ui-web-design-inspiration-websites"]
        },
        "illustrations": {
            "name": "Illustrations", 
            "description": "Free and premium illustration resources",
            "urls": [f"{base_url}/free-open-source-illustrations"]
        },
        "icons": {
            "name": "Icons",
            "description": "Free and premium icon libraries and resources", 
            "urls": [f"{base_url}/free-open-source-icon-libraries"]
        },
        "mockups": {
            "name": "Mockups",
            "description": "Device mockups and presentation templates",
            "urls": [f"{base_url}/mockups-ui-kits-and-freebies"]
        },
        "typography": {
            "name": "Typography", 
            "description": "Font libraries and typography tools",
            "urls": [f"{base_url}/font-library-and-font-inspiration-sites"]
        },
        "stock-photos": {
            "name": "Stock Photos",
            "description": "Free and premium stock photography",
            "urls": [f"{base_url}/free-stock-photo-and-video-websites"]
        },
        "learning": {
            "name": "Learning",
            "description": "Design courses, tutorials, and educational resources",
            "urls": [f"{base_url}/design-learning-courses"]
        },
        "blogs": {
            "name": "Blogs",
            "description": "Design blogs and publications",
            "urls": [f"{base_url}/best-ui-ux-design-blogs"]
        },
        "podcasts": {
            "name": "Podcasts", 
            "description": "Design and creativity podcasts",
            "urls": [f"{base_url}/best-ui-ux-design-podcasts"]
        },
        "books": {
            "name": "Books",
            "description": "Design books and publications",
            "urls": [f"{base_url}/best-product-design-books"]
        },
        "accessibility": {
            "name": "Accessibility",
            "description": "Accessibility tools and resources",
            "urls": [f"{base_url}/accessibility"]
        },
        "community": {
            "name": "Community",
            "description": "Design communities and networking",
            "urls": [f"{base_url}/community"]
        },
        "ai-tools": {
            "name": "AI Tools",
            "description": "AI-powered design and creative tools",
            "urls": [f"{base_url}/ai-tools-for-designers-and-marketing"]
        },
        "design-tools": {
            "name": "Design Tools",
            "description": "Professional design software and applications",
            "urls": [f"{base_url}/best-product-design-tools"]
        },
        "ux-tools": {
            "name": "UX Tools",
            "description": "User experience and research tools",
            "urls": [f"{base_url}/best-ux-design-and-prototype-tools"]
        },
        "color-tools": {
            "name": "Color Tools",
            "description": "Color palette generators and color theory tools",
            "urls": [f"{base_url}/color-inspiration-and-combination-tools"]
        },
        "project-tools": {
            "name": "Project Tools",
            "description": "Project management and collaboration tools",
            "urls": [f"{base_url}/best-remote-tools-for-product-designers"]
        },
        "web-builder": {
            "name": "Web Builder",
            "description": "Website builders and no-code platforms",
            "urls": [f"{base_url}/best-no-code-website-builder"]
        }
    }
    
    database = {
        "meta": {
            "source": "https://www.toools.design/",
            "created_date": "2025-01-23",
            "total_tools": 0,
            "description": "A comprehensive database of design tools with images and detailed information"
        },
        "categories": {}
    }
    
    total_tools = 0
    
    for category_key, category_info in categories.items():
        print(f"\n=== Scraping {category_info['name']} ===")
        
        all_tools = []
        
        for url in category_info['urls']:
            tools = scrape_category_page(url, category_key)
            all_tools.extend(tools)
            time.sleep(2)  # Be respectful
        
        if all_tools:
            database["categories"][category_key] = {
                "name": category_info['name'],
                "description": category_info['description'],
                "tools": all_tools
            }
            
            print(f"Added {len(all_tools)} tools to {category_info['name']}")
            total_tools += len(all_tools)
        else:
            print(f"No tools found for {category_info['name']}")
    
    database["meta"]["total_tools"] = total_tools
    
    # Save to JSON file
    output_file = "data/design_tools_database.json"
    os.makedirs("data", exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=2, ensure_ascii=False)
    
    # Also copy to public folder for Next.js
    public_file = "public/design_tools_database.json"
    with open(public_file, 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=2, ensure_ascii=False)
    
    print(f"\n=== Scraping Complete ===")
    print(f"Total tools: {total_tools}")
    print(f"Categories: {len(database['categories'])}")
    print(f"Database saved to: {output_file}")
    print(f"Public copy saved to: {public_file}")
    
    return database

if __name__ == "__main__":
    scrape_toools_design()

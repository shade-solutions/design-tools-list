#!/usr/bin/env python3
"""
Enhanced scraper for toools.design with image extraction
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import os
from urllib.parse import urljoin, urlparse

def scrape_category_page(url, category_name):
    """Scrape a category page and extract tool information including images"""
    print(f"Scraping {category_name}: {url}")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        tools = []
        
        # Find tool cards - updated selectors for current site structure
        tool_cards = soup.find_all('div', class_='tool-card') or soup.find_all('a', class_='tool-item') or soup.find_all('div', class_='collection-item')
        
        if not tool_cards:
            # Try alternative selectors
            tool_cards = soup.find_all('div', {'class': lambda x: x and 'tool' in x.lower()})
            
        print(f"Found {len(tool_cards)} tool cards")
        
        for card in tool_cards:
            try:
                # Extract tool name
                name_elem = card.find('h3') or card.find('h2') or card.find('div', class_='tool-name')
                if not name_elem:
                    name_elem = card.find('a')
                
                name = name_elem.get_text(strip=True) if name_elem else "Unknown Tool"
                
                # Extract description
                desc_elem = card.find('p') or card.find('div', class_='tool-description')
                description = desc_elem.get_text(strip=True) if desc_elem else ""
                
                # Extract image URL
                img_elem = card.find('img')
                image_url = ""
                if img_elem:
                    image_url = img_elem.get('src') or img_elem.get('data-src')
                    if image_url and not image_url.startswith('http'):
                        image_url = urljoin(url, image_url)
                
                # Extract tool URL
                link_elem = card.find('a')
                tool_url = ""
                if link_elem:
                    tool_url = link_elem.get('href', '')
                    if tool_url and not tool_url.startswith('http'):
                        tool_url = urljoin(url, tool_url)
                
                # Extract pricing info
                pricing = "FREE"  # Default
                pricing_elem = card.find('span', class_='pricing') or card.find('div', class_='price')
                if pricing_elem:
                    pricing_text = pricing_elem.get_text(strip=True).upper()
                    if 'PAID' in pricing_text or '$' in pricing_text:
                        pricing = "PAID"
                    elif 'FREEMIUM' in pricing_text:
                        pricing = "FREEMIUM"
                    elif 'FREE' in pricing_text and 'PAID' in pricing_text:
                        pricing = "FREE + PAID"
                
                # Extract tags/use cases
                use_cases = []
                tag_elems = card.find_all('span', class_='tag') or card.find_all('div', class_='tag')
                for tag in tag_elems:
                    use_cases.append(tag.get_text(strip=True))
                
                if not use_cases:
                    # Default use cases based on category
                    category_use_cases = {
                        'icons': ['Icons', 'UI Design', 'Web Design'],
                        'illustrations': ['Illustrations', 'Graphics', 'Design'],
                        'typography': ['Fonts', 'Typography', 'Web Fonts'],
                        'colors': ['Color Palettes', 'Design', 'UI'],
                        'mockups': ['Mockups', 'Presentation', 'Design'],
                        'inspiration': ['Inspiration', 'Design Showcase', 'Gallery'],
                        'ai-tools': ['AI', 'Automation', 'Design'],
                        'design-tools': ['Design', 'UI/UX', 'Software'],
                        'ux-tools': ['UX', 'User Experience', 'Research'],
                        'accessibility': ['Accessibility', 'A11y', 'Inclusive Design'],
                        'learning': ['Learning', 'Education', 'Tutorial'],
                        'community': ['Community', 'Design Community', 'Networking']
                    }
                    use_cases = category_use_cases.get(category_name.lower(), ['Design', 'Tools'])
                
                if name and name != "Unknown Tool":
                    tools.append({
                        'name': name,
                        'description': description,
                        'image': image_url,
                        'url': tool_url,
                        'pricing': pricing,
                        'use_cases': use_cases
                    })
                    
            except Exception as e:
                print(f"Error processing tool card: {e}")
                continue
        
        return tools
        
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return []

def scrape_toools_design():
    """Main scraping function"""
    base_url = "https://www.toools.design"
    
    # Define categories with their URLs - using the correct URLs from the site
    categories = {
        "inspiration": {
            "name": "Inspiration",
            "description": "Design inspiration, galleries, and showcases",
            "urls": [
                f"{base_url}/ui-web-design-inspiration-websites"
            ]
        },
        "illustrations": {
            "name": "Illustrations", 
            "description": "Free and premium illustration resources",
            "urls": [
                f"{base_url}/free-open-source-illustrations"
            ]
        },
        "icons": {
            "name": "Icons",
            "description": "Free and premium icon libraries and resources", 
            "urls": [
                f"{base_url}/free-open-source-icon-libraries"
            ]
        },
        "mockups": {
            "name": "Mockups",
            "description": "Device mockups and presentation templates",
            "urls": [
                f"{base_url}/mockups-ui-kits-and-freebies"
            ]
        },
        "typography": {
            "name": "Typography", 
            "description": "Font libraries and typography tools",
            "urls": [
                f"{base_url}/font-library-and-font-inspiration-sites"
            ]
        },
        "stock-photos": {
            "name": "Stock Photos",
            "description": "Free and premium stock photography",
            "urls": [
                f"{base_url}/free-stock-photo-and-video-websites"
            ]
        },
        "learning": {
            "name": "Learning",
            "description": "Design courses, tutorials, and educational resources",
            "urls": [
                f"{base_url}/design-learning-courses"
            ]
        },
        "blogs": {
            "name": "Blogs",
            "description": "Design blogs and publications",
            "urls": [
                f"{base_url}/best-ui-ux-design-blogs"
            ]
        },
        "podcasts": {
            "name": "Podcasts", 
            "description": "Design and creativity podcasts",
            "urls": [
                f"{base_url}/best-ui-ux-design-podcasts"
            ]
        },
        "books": {
            "name": "Books",
            "description": "Design books and publications",
            "urls": [
                f"{base_url}/best-product-design-books"
            ]
        },
        "accessibility": {
            "name": "Accessibility",
            "description": "Accessibility tools and resources",
            "urls": [
                f"{base_url}/accessibility"
            ]
        },
        "community": {
            "name": "Community",
            "description": "Design communities and networking",
            "urls": [
                f"{base_url}/community"
            ]
        },
        "ai-tools": {
            "name": "AI Tools",
            "description": "AI-powered design and creative tools",
            "urls": [
                f"{base_url}/ai-tools-for-designers-and-marketing"
            ]
        },
        "design-tools": {
            "name": "Design Tools",
            "description": "Professional design software and applications",
            "urls": [
                f"{base_url}/best-product-design-tools"
            ]
        },
        "ux-tools": {
            "name": "UX Tools",
            "description": "User experience and research tools",
            "urls": [
                f"{base_url}/best-ux-design-and-prototype-tools"
            ]
        },
        "color-tools": {
            "name": "Color Tools",
            "description": "Color palette generators and color theory tools",
            "urls": [
                f"{base_url}/color-inspiration-and-combination-tools"
            ]
        },
        "project-tools": {
            "name": "Project Tools",
            "description": "Project management and collaboration tools",
            "urls": [
                f"{base_url}/best-remote-tools-for-product-designers"
            ]
        },
        "web-builder": {
            "name": "Web Builder",
            "description": "Website builders and no-code platforms",
            "urls": [
                f"{base_url}/best-no-code-website-builder"
            ]
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
        
        # Remove duplicates based on name
        unique_tools = []
        seen_names = set()
        
        for tool in all_tools:
            if tool['name'].lower() not in seen_names:
                unique_tools.append(tool)
                seen_names.add(tool['name'].lower())
        
        if unique_tools:
            database["categories"][category_key] = {
                "name": category_info['name'],
                "description": category_info['description'],
                "tools": unique_tools
            }
            
            print(f"Added {len(unique_tools)} unique tools to {category_info['name']}")
            total_tools += len(unique_tools)
        else:
            print(f"No tools found for {category_info['name']}")
    
    database["meta"]["total_tools"] = total_tools
    
    # Save to JSON file
    output_file = "data/design_tools_database.json"
    os.makedirs("data", exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=2, ensure_ascii=False)
    
    print(f"\n=== Scraping Complete ===")
    print(f"Total tools: {total_tools}")
    print(f"Categories: {len(database['categories'])}")
    print(f"Database saved to: {output_file}")
    
    return database

if __name__ == "__main__":
    scrape_toools_design()

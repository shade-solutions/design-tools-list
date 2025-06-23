#!/usr/bin/env python3
"""
Fix missing images in the design tools database using Google's favicon service
"""

import json
import re
from urllib.parse import urlparse

def extract_domain(url):
    """Extract domain from URL"""
    try:
        parsed = urlparse(url)
        domain = parsed.netloc
        if domain.startswith('www.'):
            domain = domain[4:]
        return domain
    except:
        return None

def generate_favicon_url(domain, size=180):
    """Generate Google favicon URL for a domain"""
    return f"https://www.google.com/s2/favicons?domain={domain}&sz=180"

def fix_images():
    """Fix missing images in the database"""
    
    # Load the current database
    with open('src/data/design_tools_database.json', 'r', encoding='utf-8') as f:
        database = json.load(f)
    
    fixed_count = 0
    total_tools = 0
    
    # Process each category
    for category_key, category in database['categories'].items():
        for tool in category['tools']:
            total_tools += 1
            
            # Check if image is missing, empty, or just a domain favicon
            needs_fix = False
            
            if not tool.get('image'):
                needs_fix = True
            elif tool['image'] == 'N/A' or tool['image'] == '':
                needs_fix = True
            elif tool['image'].endswith('/favicon.ico') and 'google.com/s2/favicons' not in tool['image']:
                needs_fix = True
            elif not tool['image'].startswith('http'):
                needs_fix = True
            
            if needs_fix:
                domain = extract_domain(tool.get('url', ''))
                if domain:
                    tool['image'] = generate_favicon_url(domain)
                    fixed_count += 1
                    print(f"Fixed image for {tool['name']}: {tool['image']}")
                else:
                    # Use placeholder if we can't extract domain
                    tool['image'] = '/placeholder-icon.svg'
                    print(f"Used placeholder for {tool['name']} (no valid domain)")
    
    # Save the updated database to all locations
    with open('src/data/design_tools_database.json', 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=2, ensure_ascii=False)
    
    with open('public/design_tools_database.json', 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=2, ensure_ascii=False)
    
    with open('data/design_tools_database.json', 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=2, ensure_ascii=False)
    
    print(f"\nFixed {fixed_count} images out of {total_tools} total tools")
    print("Updated all database files (src/data, public, data)")
    
    return database

if __name__ == "__main__":
    fix_images()

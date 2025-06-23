#!/usr/bin/env python3
"""
Manual data cleanup and enhancement for key tools
"""

import json
import re

def fix_tool_data():
    """Fix and enhance the scraped tool data"""
    
    # Load the current database
    with open('public/design_tools_database.json', 'r', encoding='utf-8') as f:
        database = json.load(f)
    
    # Manual fixes for important tools
    fixes = {
        'icons': [
            {
                'name': 'Material Symbols',
                'description': 'Over 2,500 glyphs in a single font file with a wide range of design variants.',
                'image': 'https://cdn.prod.website-files.com/5ce10a4d0b5f0b560c22e756/6267b6660e723375d445ead5_material-symbols.svg',
                'url': 'https://fonts.google.com/icons',
                'pricing': 'FREE',
                'use_cases': ['Google Icons', 'Material Design', 'System Icons']
            },
            {
                'name': 'Heroicons',
                'description': 'Beautiful hand-crafted SVG icons.',
                'image': 'https://heroicons.com/favicon.ico',
                'url': 'https://heroicons.com/',
                'pricing': 'FREE',
                'use_cases': ['Hand-crafted', 'SVG Icons', 'Web Development']
            },
            {
                'name': 'Lucide',
                'description': 'Beautiful & consistent icon toolkit made by the community.',
                'image': 'https://lucide.dev/favicon.ico',
                'url': 'https://lucide.dev/',
                'pricing': 'FREE',
                'use_cases': ['Community Made', 'Consistent Design', 'Open Source']
            },
            {
                'name': 'Streamline',
                'description': 'All the icons you need, in every style you love.',
                'image': 'https://streamlinehq.com/favicon.ico',
                'url': 'https://home.streamlinehq.com/',
                'pricing': 'FREEMIUM',
                'use_cases': ['Largest Collection', 'Multiple Styles', 'Professional']
            },
            {
                'name': 'Feather',
                'description': 'Simply beautiful open source icons.',
                'image': 'https://feathericons.com/favicon.ico',
                'url': 'https://feathericons.com/',
                'pricing': 'FREE',
                'use_cases': ['Open Source', 'Minimalist', 'Beautiful']
            },
            {
                'name': 'Phosphor Icons',
                'description': 'A flexible icon family for everyone.',
                'image': 'https://phosphoricons.com/favicon.ico',
                'url': 'https://phosphoricons.com/',
                'pricing': 'FREE',
                'use_cases': ['Flexible', 'Family', 'Multi-weight']
            }
        ],
        'illustrations': [
            {
                'name': 'unDraw',
                'description': 'Lots of free illustrations that match with your brand colors on the fly.',
                'image': 'https://undraw.co/favicon.ico',
                'url': 'https://undraw.co/',
                'pricing': 'FREE',
                'use_cases': ['Brand Colors', 'SVG Illustrations', 'Open Source']
            },
            {
                'name': 'Humaaans',
                'description': 'Mix-&-match illustrations of people with a design library.',
                'image': 'https://www.humaaans.com/favicon.ico',
                'url': 'https://www.humaaans.com/',
                'pricing': 'FREE',
                'use_cases': ['People Illustrations', 'Character Design', 'Customizable']
            },
            {
                'name': 'Storyset',
                'description': 'Awesome free customizable illustrations for your next project.',
                'image': 'https://storyset.com/favicon.ico',
                'url': 'https://storyset.com/',
                'pricing': 'FREE',
                'use_cases': ['Animated Illustrations', 'Customizable', 'Story Themes']
            }
        ],
        'mockups': [
            {
                'name': 'Rotato',
                'description': 'Mac app that lets you create, capture, and animate 3D mockups for your digital designs in seconds.',
                'image': 'https://rotato.app/favicon.ico',
                'url': 'https://rotato.app/',
                'pricing': 'PAID',
                'use_cases': ['3D Mockups', 'Mac App', 'Animation']
            },
            {
                'name': 'Mockuuups Studio',
                'description': 'Drag-and-drop tool for creating beautiful app and website mockups.',
                'image': 'https://mockuuups.studio/favicon.ico',
                'url': 'https://mockuuups.studio/',
                'pricing': 'FREEMIUM',
                'use_cases': ['Drag & Drop', 'App Mockups', 'Website Mockups']
            }
        ]
    }
    
    # Apply fixes
    for category_key, fixed_tools in fixes.items():
        if category_key in database['categories']:
            # Keep existing tools but replace the first few with our fixed versions
            existing_tools = database['categories'][category_key]['tools']
            
            # Replace tools with matching names or add new ones
            for fixed_tool in fixed_tools:
                # Find if this tool already exists
                found = False
                for i, existing_tool in enumerate(existing_tools):
                    if (fixed_tool['name'].lower() in existing_tool['name'].lower() or 
                        existing_tool['name'].lower() in fixed_tool['name'].lower()):
                        existing_tools[i] = fixed_tool
                        found = True
                        break
                
                if not found:
                    # Add to the beginning of the list
                    existing_tools.insert(0, fixed_tool)
            
            # Remove duplicates
            seen_names = set()
            unique_tools = []
            for tool in existing_tools:
                name_lower = tool['name'].lower()
                if name_lower not in seen_names:
                    unique_tools.append(tool)
                    seen_names.add(name_lower)
            
            database['categories'][category_key]['tools'] = unique_tools
    
    # Update meta information
    total_tools = sum(len(cat['tools']) for cat in database['categories'].values())
    database['meta']['total_tools'] = total_tools
    
    # Save the updated database to all locations
    with open('public/design_tools_database.json', 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=2, ensure_ascii=False)
    
    with open('data/design_tools_database.json', 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=2, ensure_ascii=False)
    
    # Also update the src/data version used for SSR
    with open('src/data/design_tools_database.json', 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=2, ensure_ascii=False)
    
    print(f"Database updated with {total_tools} total tools")
    print(f"Key tools enhanced in {len(fixes)} categories")
    
    return database

if __name__ == "__main__":
    fix_tool_data()

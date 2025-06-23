# Design Tools Directory

A professional, Notion-style design tools directory built with Next.js 15 and Tailwind CSS. This comprehensive platform showcases carefully curated design tools, resources, and inspiration for designers, developers, and creators.

## ✨ Features

- **Modern UI/UX**: Clean, minimal, professional design with Notion-inspired aesthetics
- **Comprehensive Tool Database**: 500+ design tools across multiple categories
- **Smart Search**: Real-time search functionality with instant results
- **Category Browsing**: Organized tool discovery by categories
- **Featured Tools**: Handpicked tools highlighted on the homepage
- **Responsive Design**: Optimized for all devices and screen sizes
- **Type-Safe**: Built with TypeScript for robust development
- **Performance Optimized**: Built with Next.js 15 for optimal performance
- **SEO Ready**: Properly structured for search engine optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Source**: Scraped from toools.design
- **Deployment**: Vercel-ready

## 📂 Project Structure

```
design-tools/
├── src/
│   ├── app/
│   │   ├── category/[slug]/
│   │   │   └── page.tsx          # Dynamic category pages
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/
│   │   ├── ClientLayout.tsx     # Client-side layout wrapper
│   │   ├── FeaturedToolCard.tsx # Featured tool card component
│   │   ├── Footer.tsx           # Footer component
│   │   ├── Header.tsx           # Header component
│   │   ├── SearchComponent.tsx  # Search functionality
│   │   └── ToolCard.tsx         # Tool card component
│   ├── lib/
│   │   └── data.ts              # Data fetching utilities
│   └── types/
│       └── index.ts             # TypeScript type definitions
├── public/
│   ├── design_tools_database.json # Tools database
│   └── placeholder-icon.svg      # Fallback icon
├── data/
│   └── design_tools_database.json # Source database
└── scrapers/
    ├── scraper.py               # Initial scraper
    ├── scraper_updated.py       # Enhanced scraper
    └── fix_data.py             # Data cleaning script
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shade-solutions/design-tools-list.git
cd design-tools-list
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
# or
pnpm build
```

## 📊 Data Management

The tool database is managed through Python scrapers that extract data from toools.design:

- **scraper.py**: Initial data extraction
- **scraper_updated.py**: Enhanced scraper with better categorization
- **fix_data.py**: Data cleaning and enhancement script

To update the database:

```bash
python scraper_updated.py
python fix_data.py
```

## 🎨 Design Philosophy

The design follows modern web standards with:

- **Minimal Color Palette**: Professional gray/white scheme with subtle blue accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Generous whitespace for better readability
- **Interactions**: Subtle hover effects and smooth transitions
- **Accessibility**: Proper contrast ratios and semantic HTML

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Friendly**: Adaptive layouts for tablets
- **Desktop Enhanced**: Rich desktop experience with multi-column layouts

## 🔍 Search Functionality

- **Real-time Search**: Instant results as you type
- **Smart Matching**: Searches across tool names and descriptions
- **Visual Results**: Tool cards with images and descriptions
- **Keyboard Navigation**: Accessible search interface

## 📂 Categories

Tools are organized into the following categories:

- **Design Tools**: UI/UX design applications
- **Icons**: Icon libraries and generators
- **Illustrations**: Vector graphics and artwork
- **Mockups**: Device mockups and templates
- **Typography**: Font libraries and tools
- **Inspiration**: Design galleries and showcases
- **Learning**: Educational resources
- **Blogs**: Design-focused publications
- **Community**: Design communities and forums

## 🚢 Deployment

The project is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Next.js project
3. Deploy with default settings

For other platforms, build the project and serve the `.next` folder.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Data sourced from [toools.design](https://www.toools.design/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from various open-source libraries

## 📞 Support

For support, please open an issue on GitHub or contact the maintainers.

---

**Last Updated**: January 2025
**Version**: 1.0.0

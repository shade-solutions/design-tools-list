import { getDesignToolsData } from '@/lib/data';

export default async function sitemap() {
    const data = await getDesignToolsData();
    const baseUrl = 'https://design.30tools.com';

    if (!data) {
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily' as const,
                priority: 1,
            },
        ];
    }

    // Get all unique categories
    const categories = Object.keys(data.categories);

    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        ...categories.map((category: string) => ({
            url: `${baseUrl}/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        })),
    ];

    return routes;
}

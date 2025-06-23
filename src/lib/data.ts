import type { DesignToolsData } from '@/types';
import designToolsDatabase from '@/data/design_tools_database.json';

export async function getDesignToolsData(): Promise<DesignToolsData | null> {
  try {
    // Direct import of JSON data - works perfectly with SSR and is great for SEO
    return designToolsDatabase as DesignToolsData;
  } catch (error) {
    console.error('Error loading design tools data:', error);
    return null;
  }
}

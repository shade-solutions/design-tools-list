import { promises as fs } from 'fs';
import path from 'path';
import type { DesignToolsData } from '@/types';

export async function getDesignToolsData(): Promise<DesignToolsData | null> {
  try {
    // In development, fetch from the file directly
    if (process.env.NODE_ENV === 'development') {
      const dataPath = path.join(process.cwd(), 'public', 'design_tools_database.json');
      const data = await fs.readFile(dataPath, 'utf8');
      return JSON.parse(data) as DesignToolsData;
    }
    
    // In production, fetch via HTTP
    const response = await fetch('/design_tools_database.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json() as DesignToolsData;
  } catch (error) {
    console.error('Error fetching design tools data:', error);
    return null;
  }
}

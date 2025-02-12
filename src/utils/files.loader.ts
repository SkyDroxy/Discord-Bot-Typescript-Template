import { glob } from 'glob';

export async function loadFiles(directory: string): Promise<string[]> {
  const pattern = `${process.cwd().replace(/\\/g, '/')}/src/${directory}/**/*{.ts,.js}`;
  try {
    const files = await glob(pattern, { ignore: 'node_modules/' });
    return files;
  } catch (error) {
    console.error('Error while loading files:', error);
    throw error;
  }
}

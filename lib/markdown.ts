import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Point to the 'content' directory at the root of your project
const contentDirectory = path.join(process.cwd(), 'content');

export type Course = {
  id: string;
  title: string;
  content: string;
};

export function getCourses(): Course[] {
  // Read all file names in the content directory
  const fileNames = fs.readdirSync(contentDirectory);
  
  const allCourses = fileNames
    // Only process .md files
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      return {
        id,
        title: matterResult.data.title || id, // Fallback to id if title is missing
        content: matterResult.content,
      };
    });

  return allCourses;
}
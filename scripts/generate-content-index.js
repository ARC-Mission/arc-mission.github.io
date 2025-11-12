import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const postsDir = path.join(projectRoot, 'public', 'posts');
const projectsDir = path.join(projectRoot, 'public', 'projects');
const outputFile = path.join(projectRoot, 'public', 'data', 'content-index.json');

function getMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(dir, file));
}

function parseMarkdownFile(filePath, type) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);

  const filename = path.basename(filePath);
  const slug = data.slug || filename.replace('.md', '');

  // Determine the correct path based on type
  const folder = type === 'blog' ? 'posts' : 'projects';

  // Normalize field names
  const imageUrl = data.cover || data.imageUrl;

  return {
    ...data,
    slug,
    imageUrl,
    markdownFile: `/${folder}/${filename}`,
    type
  };
}

function generateIndex() {
  const postFiles = getMarkdownFiles(postsDir);
  const projectFiles = getMarkdownFiles(projectsDir);

  const posts = postFiles.map((file, index) => ({
    id: index + 1,
    ...parseMarkdownFile(file, 'blog')
  }));

  const projects = projectFiles.map((file, index) => ({
    id: index + 1,
    ...parseMarkdownFile(file, 'project')
  }));

  const index = {
    posts,
    projects,
    generatedAt: new Date().toISOString()
  };

  // Ensure data directory exists
  const dataDir = path.dirname(outputFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(index, null, 2));

  console.log(`✅ Generated content index:`);
  console.log(`   - ${posts.length} blog posts`);
  console.log(`   - ${projects.length} projects`);
  console.log(`   - Output: ${outputFile}`);
}

generateIndex();

# Content Management Guide

## Overview

This site uses markdown files with frontmatter for all blog posts and projects. No need to create React components for each post/project - just write a markdown file!

## How It Works

1. **Write** a markdown file with frontmatter metadata
2. **Save** it to the appropriate folder (`public/posts/` or `public/projects/`)
3. **Build** - the site automatically generates an index and renders your content

## Adding a Blog Post

Create a new `.md` file in `public/posts/`:

```markdown
---
title: "My Awesome Post"
date: "December 1, 2024"
author: "Your Name"
summary: "A brief description of your post for the blog listing page."
slug: "my-awesome-post"
cover: "/assets/blog/my-cover.jpg"
---

Your content starts here. You can use all markdown features:

## Headings

**Bold text**, *italic text*, and `code`.

### Lists

- Item 1
- Item 2
- Item 3

### Code Blocks

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

### Images

![Alt text](/assets/images/photo.jpg)
```

## Adding a Project

Create a new `.md` file in `public/projects/`:

```markdown
---
title: "Awesome Project"
status: "Active"
description: "Brief description for the projects listing page."
slug: "awesome-project"
cover: "/assets/projects/project-cover.jpg"
focusAreas:
  - "AI/ML"
  - "Robotics"
  - "Computer Vision"
---

## Overview

Your project description starts here...

## Goals

- Goal 1
- Goal 2

## Get Involved

How people can contribute...
```

## Frontmatter Fields

### Blog Posts

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `date` | Yes | Publication date (any format) |
| `author` | Yes | Author name |
| `summary` | Yes | Short description for listings |
| `slug` | Yes | URL-friendly identifier |
| `cover` | No | Cover image path |

### Projects

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Project title |
| `status` | Yes | "Active", "Proposed", or "Completed" |
| `description` | Yes | Short description for listings |
| `slug` | Yes | URL-friendly identifier |
| `cover` | No | Project image path |
| `focusAreas` | No | Array of focus area tags |

## Build Process

The build automatically:

1. Scans `public/posts/` and `public/projects/` for markdown files
2. Parses frontmatter from each file
3. Generates `public/data/content-index.json` with all metadata
4. Builds the React app

### Manual Content Index Generation

```bash
npm run generate:content
```

### Full Build

```bash
npm run build
```

This runs content generation + Vite build automatically.

## Development

When developing locally:

```bash
npm run dev
```

The content index is generated during build, so if you add new posts/projects, you'll need to rebuild or run `npm run generate:content` manually during development.

## Styling

All markdown content is styled using:

- Tailwind Typography plugin (`prose` classes)
- Custom dark theme configuration in `tailwind.config.js`
- Syntax highlighting for code blocks via `rehype-highlight`

The styling automatically matches your landing page design.

## Benefits

- ✅ No React components needed for each post/project
- ✅ Write content in pure markdown
- ✅ Metadata in frontmatter (all-in-one file)
- ✅ Automatic index generation
- ✅ Consistent styling across all content
- ✅ Easy to version control
- ✅ Fast, static output

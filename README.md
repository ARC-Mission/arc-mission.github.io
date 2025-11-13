# ARCM - Alliance for Resilient Computing Munich

Official website for the Alliance for Resilient Computing Munich, built with Jekyll.

## Development Setup

### Prerequisites

- Ruby (version 3.0 or higher)
- Bundler (`gem install bundler`)

### Local Development

1. **Install dependencies:**
   ```bash
   bundle install
   ```

2. **Build the site:**
   ```bash
   bundle exec jekyll build
   ```

3. **Serve the site locally:**
   ```bash
   bundle exec jekyll serve
   ```

   The site will be available at `http://localhost:4000`

## Site Structure

```
├── _config.yml           # Jekyll configuration
├── _layouts/             # Page layouts
│   ├── default.html      # Base layout with header/sidebar
│   ├── post.html         # Blog post layout
│   └── project.html      # Project page layout
├── _includes/            # Reusable components
│   ├── header.html       # Top navigation with marquee
│   └── sidebar.html      # Side navigation
├── _posts/               # Blog posts (YYYY-MM-DD-title.md)
├── _projects/            # Project pages
├── _data/                # Data files
│   └── team.yaml         # Team member information
├── assets/               # Static assets
│   ├── css/              # Stylesheets
│   ├── logo_white.png    # Logo
│   └── projects/         # Project images
├── index.html            # Homepage (About Us)
├── blog.html             # Blog listing page
├── projects.html         # Projects listing page
└── team.html             # Team page
```

## Adding Content

### Creating a New Blog Post

Create a new markdown file in `_posts/` with the filename format: `YYYY-MM-DD-title.md`

Example: `_posts/2025-11-15-new-post.md`

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-11-15
author: "Author Name"
summary: "Brief summary of the post"
---

Your post content here in markdown...
```

### Creating a New Project

Create a new markdown file in `_projects/` with any filename (e.g., `my-project.md`)

```markdown
---
layout: project
title: "Your Project Title"
status: "Active"  # Options: Active, Proposed, Completed
description: "Brief project description"
slug: "my-project"
cover: "/assets/projects/image.jpg"
focusAreas:
  - "Area 1"
  - "Area 2"
---

Your project content here in markdown...
```

### Updating Team Members

Edit `_data/team.yaml`:

```yaml
- id: 1
  name: "Member Name"
  role: "Role Title"
  imageUrl: "/assets/team/photo.jpg"
```

## Deployment

This site is configured for GitHub Pages. Simply push to the `main` branch and GitHub will automatically build and deploy the site.

### Manual Deployment

To deploy manually:

1. Build the site: `bundle exec jekyll build`
2. The static site will be in `_site/`
3. Deploy the `_site/` directory to your hosting provider

## Styling

The site uses Tailwind CSS via CDN for styling. All styles are configured in `_layouts/default.html`.

The dark theme is applied globally with custom typography settings optimized for technical content.

## URL Structure

- Homepage (About): `/`
- Blog listing: `/blog/`
- Individual blog posts: `/blog/YYYY/MM/DD/title/`
- Projects listing: `/projects/`
- Individual projects: `/projects/slug/`
- Team: `/team/`

## Features

- Responsive design with mobile-friendly navigation
- Syntax highlighting for code blocks
- Markdown support with GFM (GitHub Flavored Markdown)
- Automatic blog post and project listing generation
- SEO-friendly URLs
- Fast loading with static site generation

## Current Projects

1. **Isaac Sim Dual-Use Benchmark Suite** - Standardized benchmarks for autonomous systems
2. **Sim-to-Real Drone Surveillance Pipeline** - Training drones for extreme environments
3. **Robotic Arm for Medical Logistics** - Automated field-aid setup

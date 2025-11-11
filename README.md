# ARCM - Alliance for Resilient Technology Munich

A website for the Alliance for Resilient Technology Munich, built with React, TypeScript, and Vite.

## Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Setup and Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to http://localhost:3000

### Building for Production

To build the site for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Deployment to GitHub Pages

This site uses GitHub Actions for automatic deployment. Every push to the `main` branch will automatically build and deploy the site.

### First-time Setup

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
4. Push your code to the `main` branch

The GitHub Action will automatically:
- Install dependencies
- Build the project
- Deploy to GitHub Pages

### Manual Deployment (if needed)

If you need to deploy manually without GitHub Actions:

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist` folder contains the static files that can be deployed to any static hosting service.

## Project Structure

- `App.tsx` - Main application component
- `components/` - React components
- `data/` - YAML data files for blog posts, team members, and projects
- `types.ts` - TypeScript type definitions
- `constants.ts` - Application constants

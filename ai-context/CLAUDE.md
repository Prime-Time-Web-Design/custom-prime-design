# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Main development workflow:**
```bash
# Start development server with TinaCMS
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Optimize images
npm run optimize-images

# Sync content with TinaCMS
npm run sync:content
```

**Working directory:** Always work within `custom-design-template/` subdirectory - this is the actual Next.js project.

## Project Architecture

This is a **Next.js 14+ therapy website template** with **TinaCMS integration** for content management. The architecture follows a component-based design with strict separation of concerns.

### Core Structure

**App Router Pattern:**
- `src/app/layout.tsx` - Root layout with font loading and global settings
- `src/app/[...urlSegments]/page.tsx` - Dynamic routing for YAML-based pages
- Content is stored in `content/pages/` as YAML files and dynamically rendered

**Component Architecture:**
- **Atoms** (`src/components/atoms/`) - Basic UI elements (Button, Dropdown)
- **Molecules** (`src/components/molecules/`) - Composed components (Card, OptimizedImage)  
- **Blocks** (`src/components/blocks/`) - Page sections mapped to TinaCMS schema
- **Templates** (`src/components/templates/`) - Full page layouts
- **Layout** (`src/components/layout/`) - Navigation, header, footer structure

**Content Management:**
- **TinaCMS** handles all content via `tina/config.ts`
- Content types defined in `tina/page.ts`, `tina/global.ts`  
- Generated TypeScript types in `tina/__generated__/types.ts`
- YAML content files in `content/pages/` and `content/global/`

### Key Patterns

**Dynamic Block Rendering:**
- `src/components/blocks/index.tsx` maps TinaCMS block types to React components
- Blocks are type-safe using generated TinaCMS types
- Each block component receives `{ data }` props matching its schema

**Image Optimization:**
- Custom `OptimizedImage` component with WebP/AVIF support
- Images stored in `public/` with optimized versions in `public/optimized/`
- `scripts/optimize-images.js` processes images automatically

**Performance Optimizations:**
- Font preloading with Montserrat
- Critical resource preloading in layout
- Bundle analysis available via `ANALYZE=true npm run build`
- Source maps disabled in production

**Type Safety:**
- Custom types in `src/lib/component-types.ts` (decoupled from TinaCMS)
- Generated TinaCMS types for content schema
- Strict TypeScript configuration

### Development Notes

**TinaCMS Integration:**
- Local development uses `NEXT_PUBLIC_USE_LOCAL_CLIENT=1`
- Admin interface available at `/admin` when running dev server
- Content changes trigger automatic rebuilds

**Content Structure:**
- Pages defined as `content/pages/{slug}.yaml`
- Global settings in `content/global/Navigation_Data.yaml`
- All content is version-controlled and editable via TinaCMS UI

**Custom Scripts:**
- `scripts/optimize-images.js` - Converts images to WebP/optimizes sizes
- `scripts/refresh-tina.js` - Syncs TinaCMS content changes
- `scripts/trim-logo.js` - Logo optimization utility
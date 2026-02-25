# Assets Folder

This folder contains all static assets used throughout the application.

## Structure

### `/icons`
- **Purpose**: Store all icon files (SVG, PNG, etc.)
- **Naming Convention**: Use kebab-case (e.g., `user-profile-icon.svg`)
- **File Types**: `.svg`, `.png`, `.ico`
- **Usage**: Import icons in components for UI elements

### `/images`
- **Purpose**: Store all image files (photos, illustrations, backgrounds)
- **Naming Convention**: Use kebab-case (e.g., `hero-banner.jpg`)
- **File Types**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- **Usage**: Import images for backgrounds, illustrations, and media content

## Best Practices

1. **Optimization**: Compress images before adding them
2. **Naming**: Use descriptive, consistent naming conventions
3. **Organization**: Group related assets in subfolders if needed
4. **Formats**: Use modern formats like WebP when possible
5. **Size**: Keep file sizes reasonable for web performance

## Example Usage

```typescript
// Importing an icon
import UserIcon from '@/assets/icons/user-icon.svg';

// Importing an image
import HeroImage from '@/assets/images/hero-banner.jpg';
```

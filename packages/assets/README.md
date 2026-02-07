# @start-jr/assets

Shared assets package for Start Jr. applications.

## Available Logos

- `logo-dark.png` - Blue text with red accent (for light backgrounds)
- `logo-light.png` - White text with red accent (for dark backgrounds)  
- `icon.png` - Red standalone icon (for favicon/app icon)

## Usage

### Install in your app

```bash
pnpm add @start-jr/assets
```

### Using Logo URLs

```typescript
import { LOGOS } from '@start-jr/assets';

// Main logo (blue/red variant)
<img src={LOGOS.main} alt="Start Jr." className="h-12 w-auto" />

// For light backgrounds
<img src={LOGOS.dark} alt="Start Jr." />

// For dark backgrounds
<img src={LOGOS.light} alt="Start Jr." />

// Icon only (for favicon, small avatars)
<img src={LOGOS.icon} alt="Start Jr." width={32} height={32} />
```

### TypeScript Support

```typescript
import type { LogoVariant } from '@start-jr/assets';

const variant: LogoVariant = 'main'; // 'main' | 'dark' | 'light' | 'icon'
```

## Updating Logos

1. Replace files in `src/logos/` with new versions (keep same filenames)
2. Run `pnpm build` in the assets package
3. Restart your dev server to see changes

## Adding New Logo Variants

1. Add the new file to `src/logos/`
2. Update `src/index.ts` to export the new logo
3. Rebuild with `pnpm build`

## Supported Formats

- **PNG** - Current format (best for photos/complex graphics)
- **SVG** - Recommended for scalability and React component usage
- **ICO** - For browser favicons

**Note:** React component imports (`import { LogoIcon } from '@start-jr/assets'`) only work with SVG files.

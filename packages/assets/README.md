# @start-jr/assets

Shared assets for Start Jr. applications.

## Available Logos

- `logo-dark.png` - For light backgrounds
- `logo-light.png` - For dark backgrounds  
- `icon.png` - Favicon/app icon

## Usage

```bash
pnpm add @start-jr/assets
```

```typescript
import { LOGOS } from '@start-jr/assets';

<img src={LOGOS.main} alt="Start Jr." className="h-12" />
<img src={LOGOS.dark} alt="Start Jr." />
<img src={LOGOS.light} alt="Start Jr." />
<img src={LOGOS.icon} alt="Start Jr." width={32} />
```

## Updating

Replace files in `src/logos/`, run `pnpm build`, restart dev server

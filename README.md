# OCR Text Extractor

Ultra-premium OCR text extractor with glassmorphism UI, inspired by Apple smart-home dashboards.

## Features

- **Glassmorphism Design**: Premium translucent UI with backdrop blur
- **Real-time OCR**: Client-side text extraction using Tesseract.js
- **Split Interface**: Full-screen layout with input and results panels
- **Responsive**: Works on desktop and mobile devices
- **Dark/Light Mode**: Automatic theme switching
- **File Upload & URL**: Support for local files and web images

## Technologies

- HTML5
- CSS3 (Glassmorphism, CSS Variables)
- JavaScript (ES6+)
- Tesseract.js (OCR Engine)
- Bootstrap (Utilities)
- Font Awesome (Icons)

## Local Development

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Or run a local server:

```bash
npm run dev
# or
python3 -m http.server 8000
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- OCR processing happens client-side
- Large images may take longer to process
- Best results with clear, high-contrast text

## License

MIT License - feel free to use and modify.

## Credits

- OCR powered by [Tesseract.js](https://github.com/naptha/tesseract.js)
- Icons by [Font Awesome](https://fontawesome.com/)
- UI inspired by Apple design language

## Cloudflare Pages / Wrangler environment

This project can be deployed to Cloudflare Pages using Wrangler. The repository includes a `wrangler.toml` file with example environment blocks for `production` and `staging`.

Important notes:
- Do NOT commit API tokens or secrets into `wrangler.toml`. Use environment variables or Wrangler secrets.
- For Pages deployments in CI, set a `CF_API_TOKEN` (or `WRANGLER_TOKEN`) with Pages write permissions.

Quick steps to deploy locally:

1. Build (no-op for this static site):

```bash
npm run build
```

2. Deploy to Pages (uses `npx` so Wrangler is downloaded automatically):

```bash
npm run deploy
# or directly:
npx wrangler pages deploy . --project-name ocr-text-extractor --branch production
```

How to set environment-specific values

- Use `wrangler.toml`'s `[env.production]` (or `[env.staging]`) for non-secret configuration like `account_id` or `pages_build_output_dir`.
- For secrets (API tokens, keys), use:

```bash
# interactive: stores secret locally in wrangler's config (not recommended for CI)
npx wrangler secret put MY_SECRET

# For CI, add CF_API_TOKEN (or WRANGLER_TOKEN) to your CI provider's secret/env settings
```

If you want, I can:
- Add a GitHub Actions workflow (or Netlify/Other CI snippet) that runs `npm run build` and `npm run deploy` using a `CF_API_TOKEN` secret.
- Help you generate a scoped Cloudflare API token with only the Pages permissions you need.
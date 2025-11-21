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

## Deployment to Cloudflare Pages

### Method 1: Direct Upload (Recommended for quick deployment)

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project"
3. Choose "Direct upload"
4. Upload the following files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `package.json`
   - `README.md`
   - `_headers`
   - `wrangler.toml`

### Method 2: Git Integration

1. Push this code to a Git repository (GitHub, GitLab, etc.)
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
3. Click "Create a project"
4. Connect your Git repository
5. Set build settings:
   - Build command: (leave empty)
   - Build output directory: `/` (root)
6. Deploy

### Method 3: Wrangler CLI (For advanced users)

1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler auth login`
3. Deploy: `wrangler pages deploy .`
   - This will upload all files in the current directory
   - The `wrangler.toml` file configures the deployment

**Note**: If you get a Worker deployment error, make sure you're using `wrangler pages deploy` for static sites, not `wrangler deploy` (which is for Workers).

### Environment Variables (Optional)

No environment variables required for this static app.

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
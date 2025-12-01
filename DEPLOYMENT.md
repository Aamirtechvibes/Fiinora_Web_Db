# Deployment Guide for Fiinora

## Vercel Deployment

This project is configured to deploy on Vercel with the following settings:

### Configuration Files

1. **vercel.json** - Specifies the build configuration:
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Framework: Vite

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel configuration"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the `vercel.json` configuration
   - Click "Deploy"

### Manual Configuration (if needed)

If you need to configure manually in Vercel dashboard:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Environment Variables

No environment variables are required for this project currently.

### Build Output

The build creates:
- `build/index.html` - Main HTML file
- `build/assets/` - CSS and JS bundles

### Troubleshooting

**Error: "No Output Directory named 'dist' found"**
- Solution: The `vercel.json` file specifies `outputDirectory: "build"` which matches our Vite config

**Build fails**
- Check that all dependencies are installed: `npm install`
- Verify build works locally: `npm run build`
- Check Node.js version (recommended: 18.x or higher)

### Local Testing

Test the production build locally:
```bash
npm run build
npx serve build
```

Then open http://localhost:3000 to view the production build.

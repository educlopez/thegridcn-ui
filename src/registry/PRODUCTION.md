# Production Registry Setup

## How Registry Files Are Served in Production

### Static Files (Recommended)

When you run `pnpm registry:build`, it generates individual JSON files in `public/r/`:
- `public/r/button.json`
- `public/r/alert-dialog.json`
- etc.

**Next.js automatically serves these files in production** at:
- `https://your-domain.com/r/button.json`
- `https://your-domain.com/r/alert-dialog.json`

These files are:
- ✅ Included in the production build
- ✅ Served as static assets (fast, cached by CDN)
- ✅ Available immediately after deployment

### Route Handler (Fallback)

The route handler at `src/app/r/[name]/route.ts` provides a fallback:
- If a file doesn't exist in `public/r/`, it generates it from `registry.json`
- This ensures the registry works even if you forget to run `registry:build`

## Build Process

The production build script now automatically runs `registry:build`:

```json
{
  "scripts": {
    "build": "pnpm registry:build && next build"
  }
}
```

This ensures:
1. Registry files are generated before building
2. All JSON files are included in the production bundle
3. Files are available at `/r/[name].json` URLs

## Verification

After deployment, verify your registry is working:

```bash
# Test individual component
curl https://your-domain.com/r/button.json

# Should return the component JSON
```

## Troubleshooting

### Files not appearing in production?

1. **Check build logs**: Make sure `registry:build` ran successfully
2. **Verify files exist**: Check that `public/r/*.json` files exist after build
3. **Check deployment**: Ensure `public/` folder is included in deployment
4. **Route handler fallback**: The route handler will serve files even if static files are missing

### Files are too large?

The route handler can generate files on-the-fly from `registry.json`, which is smaller. However, static files are faster and better cached.

## Best Practice

**Always run `registry:build` before deploying** to ensure optimal performance:

```bash
pnpm registry:build  # Generate static files
pnpm build          # Build Next.js app (includes registry:build automatically)
```

This ensures:
- Fast static file serving
- Better CDN caching
- Reduced server load

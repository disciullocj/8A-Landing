# 8Assist landing page

Responsive recreation of the supplied 8assist.com screenshot, built with HTML, CSS, and browser JavaScript. Includes local generated replacement photography, an interactive case preview, task checkboxes, FAQs, mobile navigation, and a demo request dialog.

## Development

Requires Node.js 20 or newer. No runtime dependencies or credentials are needed.

```sh
npm ci
npm run dev
```

The server listens on port 3000. Set `PORT` to change it.

## Production

```sh
npm run build
npm start
```

Deploy the generated `dist/` directory to any static host. To serve the production output with the included server, run `SERVE_DIST=1 npm start`.

## Validation

```sh
npm test
```

HTTP smoke tests cover the page, assets, and missing routes. Chromium browser checks also verified desktop/mobile layouts, form validation and submission, tabs, task checkboxes, FAQs, and mobile navigation.

## Private preview on Vercel

`vercel.json` builds and serves the static `dist/` directory. Import this repository into Vercel or deploy with the Vercel CLI as a preview deployment (without `--prod`). Before deploying, enable **Vercel Authentication** for preview deployments in the project's **Settings → Deployment Protection**. Verify that a signed-out browser is asked to sign in before viewing the site. An unlisted URL and the included `noindex` header do not provide access control.

For automated deployment from the cloud environment, supply `VERCEL_TOKEN` securely in environment settings. Never commit tokens. Team members must have permission to view the protected deployment.

## Integration status

The demo form processes information only in the browser and explicitly reports that requests have not been sent. Connect a booking or submission service before launch. Login and legal links open explanatory preview dialogs until real destinations and policies are provided. FAQ answers are draft copy. Images are locally stored generated replacements; original website photography and font assets were not available.

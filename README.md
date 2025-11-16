# Custom Google Reviews Widget for Shopify
This setup includes:
- A backend API to fetch Google reviews using Google Places API (to be deployed on Vercel)
- A frontend widget script (`widget.js`) to embed on Shopify

## Steps to Deploy:
1. Add your API Key and Place ID in Vercel Environment Variables
2. Deploy the API folder on Vercel
3. Host the `widget.js` via GitHub Pages or Vercel or similar
4. Embed in Shopify using:
   <div id="google-reviews-widget"></div>
   <script src="https://yourdomain.com/widget.js"></script>

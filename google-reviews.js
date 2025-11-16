const axios = require("axios");

let cache = { reviews: null, lastUpdate: null };

module.exports = async (req, res) => {
  const GOOGLE_API_KEY = process.env.AIzaSyBP_HfI7dz5zv3sXT0CxaHxNJqtI9r9uw0; // <-- Add this in Vercel dashboard
  const PLACE_ID = process.env.ChIJ3dU3tpa_wjsRLnikJj7ujMU;            // <-- Add this too

  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  if (!cache.lastUpdate || now - cache.lastUpdate > oneWeek) {
    console.log("Fetching fresh reviews...");
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${GOOGLE_API_KEY}`;
      const response = await axios.get(url);
      cache.reviews = response.data.result.reviews || [];
      cache.lastUpdate = now;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Unable to fetch reviews" });
    }
  } else {
    console.log("Using cached reviews");
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(cache.reviews);
};

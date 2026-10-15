export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) {
    return res.status(503).json({ error: "Google Reviews are not configured." });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews,googleMapsUri",
      },
    });
    if (!response.ok) {
      console.error("Google Places request failed:", response.status);
      return res.status(502).json({ error: "Unable to retrieve Google reviews." });
    }
    const place = await response.json();
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json({
      name: place.displayName?.text || "",
      rating: place.rating ?? null,
      userRatingCount: place.userRatingCount ?? null,
      googleMapsUri: place.googleMapsUri || null,
      reviews: (place.reviews || []).map((review) => ({
        rating: review.rating,
        text: review.text,
        originalText: review.originalText,
        publishTime: review.publishTime,
        relativePublishTimeDescription: review.relativePublishTimeDescription,
        authorAttribution: review.authorAttribution,
      })),
    });
  } catch (error) {
    console.error("Google reviews endpoint error:", error);
    return res.status(502).json({ error: "Unable to retrieve Google reviews." });
  }
}

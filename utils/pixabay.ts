// utils/pixabay.ts

/** Strongly‑typed response shapes from the Pixabay API */
interface PixabayHit {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  tags: string;
  user: string;
  likes: number;
  views: number;
  downloads: number;
  userImageURL: string;
  type: string;
  pageURL: string;
}

interface PixabayResponse {
  hits: PixabayHit[];
  total: number;
  totalHits: number;
}

/** Our app’s Image model */
export interface Image {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  tags: string;
  user: string;
  likes: number;
  views: number;
  downloads: number;
  userImageURL: string;
  type?: string;
  pageURL?: string;
}

/**
 * Fetches a page of images from Pixabay.
 *
 * @param query     - search term (will be URL‑encoded automatically)
 * @param category  - one of Pixabay’s allowed categories, or 'all'
 * @param page      - page number to fetch (1‑based)
 * @param perPage   - results per page (max 200)
 * @returns         - an array of Image
 */
export async function fetchImages(
  query?: string,
  category?: string,
  page: number = 1,
  perPage: number = 20
): Promise<Image[]> {
  // Ensure our API key is present
  const key = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
  if (!key) {
    throw new Error('Missing NEXT_PUBLIC_PIXABAY_API_KEY in environment');
  }

  const params = new URLSearchParams({
    key,
    per_page: perPage.toString(),
    safesearch: 'true',
    page: page.toString(),
    ...(query && { q: query }),                     // no manual encodeURIComponent
    ...(category && category !== 'all' && { category }),
  });

  const res = await fetch(`https://pixabay.com/api/?${params}`, {
    next: { revalidate: 3600 },                     // cache for 1 hour
  });
  if (!res.ok) {
    throw new Error(`Pixabay API error: ${res.status} ${res.statusText}`);
  }

  const data: PixabayResponse = await res.json();

  return data.hits.map((hit) => ({
    id: hit.id,
    webformatURL: hit.webformatURL,
    largeImageURL: hit.largeImageURL,
    imageWidth: hit.imageWidth,
    imageHeight: hit.imageHeight,
    tags: hit.tags,
    user: hit.user,
    likes: hit.likes,
    views: hit.views,
    downloads: hit.downloads,
    userImageURL: hit.userImageURL,
    type: hit.type,                                // include optional fields
    pageURL: hit.pageURL,
  }));
}

/**
 * Fetches a single image by its Pixabay ID, with an optimized‑URL fallback.
 *
 * @param id  - numeric ID of the image
 * @returns   - the Image, or null if not found or on error
 */
export async function fetchImageById(id: string): Promise<Image | null> {
  const key = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
  if (!key) {
    throw new Error('Missing NEXT_PUBLIC_PIXABAY_API_KEY in environment');
  }

  const params = new URLSearchParams({
    key,
    id: id.toString(),
    image_type: 'photo',
    pretty: 'false',
    per_page: '1',
  });

  const res = await fetch(`https://pixabay.com/api/?${params}`, {
    headers: {
      'Referrer-Policy': 'no-referrer-when-downgrade',
      Accept: 'application/json',
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    console.error(`Pixabay API Error: ${res.status} ${res.statusText}`);
    return null;
  }

  const data: PixabayResponse = await res.json();
  if (!data.hits.length) {
    console.warn('No image found for ID:', id);
    return null;
  }

  const hit = data.hits[0];

  // Only rewrite if the host matches Pixabay’s domains
  const getOptimizedUrl = (url: string): string => {
    try {
      const u = new URL(url);
      if (u.hostname === 'pixabay.com' || u.hostname === 'cdn.pixabay.com') {
        u.hostname = 'i.pinimg.com';
        u.pathname = `/originals${u.pathname}`;
        return u.toString();
      }
    } catch {
      // If URL parsing fails, return the original URL
    }
    return url;
  };

  return {
    id: hit.id,
    webformatURL: getOptimizedUrl(hit.webformatURL) || hit.webformatURL,
    largeImageURL: getOptimizedUrl(hit.largeImageURL) || hit.largeImageURL,
    imageWidth: hit.imageWidth,
    imageHeight: hit.imageHeight,
    tags: hit.tags,
    user: hit.user,
    likes: hit.likes,
    views: hit.views,
    downloads: hit.downloads,
    userImageURL: getOptimizedUrl(hit.userImageURL) || hit.userImageURL,
    type: hit.type,
    pageURL: hit.pageURL,
  };
}

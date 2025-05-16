export interface Image {
  id: number
  webformatURL: string
  largeImageURL: string
  imageWidth: number
  imageHeight: number
  tags: string
  user: string
  likes: number
  views: number
  downloads: number
  userImageURL: string
  type?: string
  pageURL?: string
}
export async function fetchImages(
  query?: string,
  category?: string,
  page: number = 1,
  perPage: number = 20
): Promise<Image[]> {
  try {
    const params = new URLSearchParams({
      key: process.env.NEXT_PUBLIC_PIXABAY_API_KEY!,
      per_page: perPage.toString(),
      safesearch: 'true',
      page: page.toString(),
      ...(query && { q: encodeURIComponent(query) }),
      ...(category && category !== 'all' && { category })
    })

    const res = await fetch(`https://pixabay.com/api/?${params}`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    
    const data = await res.json()
    return data.hits.map((hit: any) => ({
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
      userImageURL: hit.userImageURL
    }))
  } catch (error) {
    console.error('Error fetching images:', error)
    return []
  }
}


export async function fetchImageById(id: string): Promise<Image | null> {
  try {
    const params = new URLSearchParams({
      key: process.env.NEXT_PUBLIC_PIXABAY_API_KEY!,
      id: id.toString(),
    })

    const res = await fetch(`https://pixabay.com/api/?${params}`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    
    const data = await res.json()
    if (data.hits.length === 0) return null
    
    const hit = data.hits[0]
    return {
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
      type: hit.type,
      pageURL: hit.pageURL,
    }
  } catch (error) {
    console.error('Error fetching image by ID:', error)
    return null
  }
}
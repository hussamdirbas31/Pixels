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
  }
  
  export async function fetchImages(
    query?: string,
    category?: string,
    page: number = 1
  ): Promise<Image[]> {
    try {
      const params = new URLSearchParams({
        key: process.env.NEXT_PUBLIC_PIXABAY_API_KEY!,
        per_page: '200',
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
  
  export async function fetchImageById(id: string): Promise<Image> {
    const res = await fetch(
      `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&id=${id}`
    )
    const data = await res.json()
    return data.hits[0]
  }
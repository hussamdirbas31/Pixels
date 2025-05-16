export function middleware(request) {
    const response = NextResponse.next()
    
    response.headers.set(
      'Content-Security-Policy',
      "img-src 'self' data: https://*.pixabay.com https://*.staticflickr.com https://*.pinimg.com;"
    )
  
    return response
  }
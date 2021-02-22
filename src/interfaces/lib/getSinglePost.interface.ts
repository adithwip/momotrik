export interface GetSinglePostResponse {
  post: Post
}

export interface Post {
  title: string
  slug: string
  date: string
  featuredImage: any
  content: string
}
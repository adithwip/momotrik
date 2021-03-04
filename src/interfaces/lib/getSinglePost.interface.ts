export interface GetSinglePostResponse {
  post: Post
}

interface Post {
  title: string
  excerpt: string
  slug: string
  date: string
  featuredImage: FeaturedImage
  author: Author
  content: string
}

interface FeaturedImage {
  node: FeaturedImageNode
}

interface FeaturedImageNode {
  mediaItemUrl: string
}

interface Author {
  node: AuthorNode
}

interface AuthorNode {
  name: string
  avatar: Avatar
}

interface Avatar {
  url: string
}

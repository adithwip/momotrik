export interface GetPostsBySearchResponse {
  posts: Posts
}

interface Posts {
  edges: Edge[]
}

export interface Edge {
  node: PostsBySearchNode
}

export interface PostsBySearchNode {
  id: string
  title: string
  excerpt: string
  slug: string
  date: string
  featuredImage: FeaturedImage
  author: Author
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
}

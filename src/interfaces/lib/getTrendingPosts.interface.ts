export interface GetTrendingPostsResponse {
  posts: Posts
}

interface Posts {
  edges: TrendingPostsEdge[]
}

export interface TrendingPostsEdge {
  node: Node
}

interface Node {
  id: string
  date: string
  slug: string
  title: string
  featuredImage: FeaturedImage
  author: Author
}

interface FeaturedImage {
  node: FeaturedImageNode
}

interface FeaturedImageNode {
  mediaItemUrl: string
  sizes: string
}

export interface Author {
  node: AuthorNode
}

export interface AuthorNode {
  name: string
}

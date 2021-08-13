export interface GetRecentPostsResponse {
  posts: Posts
}

interface Posts {
  edges: RecentPostsEdge[]
}

export interface RecentPostsEdge {
  node: AllPostsNode
}

export interface AllPostsNode {
  id: string
  date: string
  title: string
  slug: string
  isSticky?: boolean
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

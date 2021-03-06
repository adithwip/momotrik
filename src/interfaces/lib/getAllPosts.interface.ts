export interface GetAllPostsResponse {
  posts: Posts
}

interface Posts {
  edges: Edge[]
}

export interface Edge {
  node: AllPostsNode
}

export interface AllPostsNode {
  id: string
  date: string
  title: string
  slug: string
  excerpt: string
  featuredImage?: FeaturedImage
  author: Author
}

interface FeaturedImage {
  node: FeaturedImageNode
}

interface FeaturedImageNode {
  mediaItemUrl: string
}

export interface Author {
  node: AuthorNode
}

export interface AuthorNode {
  name: string
}
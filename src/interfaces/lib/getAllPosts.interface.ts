export interface GetAllPostsResponse {
  posts: Posts
}

interface Posts {
  edges: AllPostsEdge[]
}

export interface AllPostsEdge {
  node: AllPostsNode
}

export interface AllPostsNode {
  id: string
  date: string
  title: string
  slug: string
  excerpt: string
  isSticky?:boolean
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
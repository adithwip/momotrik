export interface GetPostsByCategoryNameResponse {
  posts: Posts
}

interface Posts {
  edges: Edge[]
}

export interface Edge {
  node: PostsByCategoryNode
}

export interface PostsByCategoryNode {
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

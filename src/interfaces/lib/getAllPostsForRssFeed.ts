export interface GetAllPostsForRssResponse {
  posts: Posts
}

interface Posts {
  edges: AllPostsForRssEdge[]
}

export interface AllPostsForRssEdge {
  node: AllPostsForRssNode
}

export interface AllPostsForRssNode {
  id: string
  date: string
  title: string
  slug: string
  excerpt: string
  categories: Categories
  featuredImage: FeaturedImage
  author: Author
}

interface Categories {
  edges: CategoriesEdge[]
}

interface CategoriesEdge {
  node: CategoriesNode
}

interface CategoriesNode {
  name: string
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
  email: string
}

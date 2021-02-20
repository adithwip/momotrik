export interface GetAllPostsResponse {
  posts: Posts
}

interface Posts {
  edges: Edge[]
}

interface Edge {
  node: Node
}

interface Node {
  id: string
  date: string
  title: string
  slug: string
  excerpt: string
  extraPostInfo: ExtraPostInfo
}

interface ExtraPostInfo {
  authorExcerpt: any
  thumbImage: any
}

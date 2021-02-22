export interface GetAllPostSlugsResponse {
  posts: Posts
}

interface Posts {
  edges: Edge[]
}

interface Edge {
  node: Node
}

interface Node {
  slug: string
}

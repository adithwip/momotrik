export interface GetInstagramMediasResponse {
  data: Data
  status: string
}

interface Data {
  user: User
}

interface User {
  edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia
}

interface EdgeOwnerToTimelineMedia {
  count: number
  page_info: PageInfo
  edges: Edge[]
}

interface PageInfo {
  has_next_page: boolean
  end_cursor: string
}

export interface Edge {
  node: Node
}

interface Node {
  __typename: string
  id: string
  dimensions: Dimensions
  display_url: string
  display_resources: DisplayResource[]
  is_video: boolean
  should_log_client_event: boolean
  tracking_token: string
  edge_media_to_tagged_user: EdgeMediaToTaggedUser
  accessibility_caption?: any
  edge_media_to_caption: EdgeMediaToCaption
  shortcode: string
  edge_media_to_comment: EdgeMediaToComment
  edge_media_to_sponsor_user: EdgeMediaToSponsorUser
  comments_disabled: boolean
  taken_at_timestamp: number
  edge_media_preview_like: EdgeMediaPreviewLike
  gating_info: any
  media_preview?: string | null | undefined
  owner: Owner2
  location: any
  viewer_has_liked: boolean
  viewer_has_saved: boolean
  viewer_has_saved_to_collection: boolean
  viewer_in_photo_of_you: boolean
  viewer_can_reshare: boolean
  thumbnail_src: string
  thumbnail_resources: ThumbnailResource[]
  edge_sidecar_to_children?: EdgeSidecarToChildren
  dash_info?: DashInfo
  video_url?: string
  video_view_count?: number
}

interface Dimensions {
  height: number
  width: number
}

interface DisplayResource {
  src: string
  config_width: number
  config_height: number
}

interface EdgeMediaToTaggedUser {
  edges: any[]
}

interface EdgeMediaToCaption {
  edges: Edge2[]
}

interface Edge2 {
  node: Node2
}

interface Node2 {
  text: string
}

interface EdgeMediaToComment {
  count: number
  page_info: PageInfo2
  edges: Edge3[]
}

interface PageInfo2 {
  has_next_page: boolean
  end_cursor: any
}

interface Edge3 {
  node: Node3
}

interface Node3 {
  id: string
  text: string
  created_at: number
  did_report_as_spam: boolean
  owner: Owner
  viewer_has_liked: boolean
}

interface Owner {
  id: string
  is_verified: boolean
  profile_pic_url: string
  username: string
}

interface EdgeMediaToSponsorUser {
  edges: any[]
}

interface EdgeMediaPreviewLike {
  count: number
  edges: any[]
}

interface Owner2 {
  id: string
  username: string
}

interface ThumbnailResource {
  src: string
  config_width: number
  config_height: number
}

interface EdgeSidecarToChildren {
  edges: Edge4[]
}

interface Edge4 {
  node: Node4
}

interface Node4 {
  __typename: string
  id: string
  dimensions: Dimensions2
  display_url: string
  display_resources: DisplayResource2[]
  is_video: boolean
  should_log_client_event: boolean
  tracking_token: string
  edge_media_to_tagged_user: EdgeMediaToTaggedUser2
  accessibility_caption?: any
}

interface Dimensions2 {
  height: number
  width: number
}

interface DisplayResource2 {
  src: string
  config_width: number
  config_height: number
}

interface EdgeMediaToTaggedUser2 {
  edges: any[]
}

interface DashInfo {
  is_dash_eligible: boolean
  video_dash_manifest: string
  number_of_qualities: number
}

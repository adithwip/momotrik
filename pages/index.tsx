import type { NextPage, GetStaticProps } from 'next'
import type { Edge } from 'interfaces/lib/getInstagramMedias'

import * as React from 'react'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import dynamic from 'next/dynamic'

// import { getInstagramMedias } from 'lib/getInstagramMedias'
import { generateRssFeed } from 'utils/generateRssFeed'

const HighlightedArticle = dynamic(
  () => import('domain/home/HighlightedArticle')
)
const ArticlesAndAside = dynamic(() => import('domain/home/ArticlesAndAside'))
const PopularPosts = dynamic(() => import('domain/home/PopularPosts'))
const TrendingArticlesMobile = dynamic(
  () => import('domain/home/TrendingArticlesMobile')
)
const Layout = dynamic(() => import('components/Layout'))
const InstagramPosts = dynamic(() => import('domain/home/InstagramPosts'))

import { getAllPostsFetcher } from 'lib/useGetAllPosts'
import {
  getAllStickyPostsFetcher,
  useGetAllStickyPosts,
} from 'lib/useGetAllStickyPosts'
import { getTrendingPostsFetcher } from 'lib/useGetTrendingPosts'
import { getPopularPostsFetcher } from 'lib/useGetPopularPosts'
import { getRecentPostsFetcher } from 'lib/useGetRecentPosts'

type Props = {
  instagramMedias: Edge[]
}

const IndexPage: NextPage<Props> = ({ instagramMedias }) => {
  const { getAllStickyPostsData } = useGetAllStickyPosts()
  const MemoizedHighlightedArticle = React.memo(HighlightedArticle)

  // console.log('instagramMedias::::', instagramMedias)

  return (
    <Layout
      title="Momotrik | Motor, Mobil, Listrik"
      description="Momotrik adalah media informasi yang membahas segala seluk beluk tentang mobil listrik, motor listrik, dan skuter listrik. Serta beragam hal tentang gaya hidup kendaraan listrik terbaru"
    >
      {getAllStickyPostsData.data ? (
        <MemoizedHighlightedArticle data={getAllStickyPostsData.data} />
      ) : null}
      <div className="flex flex-col">
        <TrendingArticlesMobile />
        <ArticlesAndAside />
        <PopularPosts />
        <InstagramPosts instagramMedias={instagramMedias} />
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeed()
  // let instagramMedias: Edge[]

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', () => getAllPostsFetcher())
  await queryClient.prefetchQuery('stickyPosts', () =>
    getAllStickyPostsFetcher()
  )
  await queryClient.prefetchQuery('trending', () => getTrendingPostsFetcher())
  await queryClient.prefetchQuery('popular', () => getPopularPostsFetcher())
  await queryClient.prefetchQuery('recent', () => getRecentPostsFetcher())

  /**
   * Get instagram medias only at build time
   * No React Query needed
   */
  // try {
  //   const res = await getInstagramMedias()

  //   instagramMedias = res.data.data.user.edge_owner_to_timeline_media.edges
  // } catch (error) {
  //   throw new Error(
  //     `Error: GET Instragram medias at [getStaticProps]: ${error}`
  //   )
  // }

  // console.log('instagramMedias::::', instagramMedias)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      instagramMedias: [
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2749252104195816865',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9UqJcslT4sQJ1PRcwbL3Ct6wQBS8ZnwScVC-nGHBG3rw&oe=61E76843&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8G3ytlvaUldUGAzdbnLXORzh2gyw61hXqQDc8rHig3VA&oe=61E76843&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-nydZZUR5cvrX9XzTCjn7R0LIK_ojQVUZH3nUmM9aAnw&oe=61E76843&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9UqJcslT4sQJ1PRcwbL3Ct6wQBS8ZnwScVC-nGHBG3rw&oe=61E76843&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ5MjUyMTA0MTk1ODE2ODY1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyMXwyNzQ5MjUyMTA0MTk1ODE2ODY1fDUxMjAzNjAxODM0fDk0NDAwMjViMjE3OTRjY2I4OTQ0ZjkyYjFiZGU3NjM1YjNhMzQwNWUzNTZmMTcxM2JmMTY3N2RlY2NjNDczMmUifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Cadillac mungkin bukanlah produsen mobil yang paling agresif untuk memasarkan konsep mobil listrik, namun mereka terhitung cukup konsisten memperkenalkan konsep terbarunya pada gelaran CES 2022 ini.\n\nAwal 2022 ini menjadi momentum bagi Cadillac untuk memperkenalkan konsep mobil listrik terbarunya yang bernama InnerSpace. Mobil ini disebut merupakan “kendaraan listrik  dan mewah dua penumpang otonomus yang dramatis”.\n\nPada dasarnya, Innerspace merupakan sebuah coupe futuristis yang mengambi inspirasi dari mobil-mobil Cadillac jaman dahulu yang lebih berfokus pada kendaraan personal untuk dua orang.\n\nKata ‘dramatis’ sebenarnya memang cocok menggambarkan mobil konsep Cadillac yang satu ini. Karena ia sangat panjang dan lebar, serta sangat menarik perhatian dengan bodi bongsornya tersebut.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #spklu #SPBKLU #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #cadillac #innerspace',
                  },
                },
              ],
            },
            shortcode: 'CYnTjj8lj2h',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641956411,
            edge_media_preview_like: {
              count: 8,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8G3ytlvaUldUGAzdbnLXORzh2gyw61hXqQDc8rHig3VA&oe=61E76843&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-9NB42TbbPTuTm8hdFZKBqJU5hVzuTU4fPYJsqxdsO_Q&oe=61E76843&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-6MtGXmZeHWR2EzwIatABjctkkRLungaa_qr29A97NSA&oe=61E76843&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8KDYZCqZxyneYYmKthVyMvW5Q9MD6KE_1MPgdTmJ75Xw&oe=61E76843&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9ISPDXOglux5Kf1JzSK1wXyDAMdNv5Owc3nlP4Sb4wjA&oe=61E76843&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8G3ytlvaUldUGAzdbnLXORzh2gyw61hXqQDc8rHig3VA&oe=61E76843&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2749252094691565560',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9UqJcslT4sQJ1PRcwbL3Ct6wQBS8ZnwScVC-nGHBG3rw&oe=61E76843&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8G3ytlvaUldUGAzdbnLXORzh2gyw61hXqQDc8rHig3VA&oe=61E76843&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-nydZZUR5cvrX9XzTCjn7R0LIK_ojQVUZH3nUmM9aAnw&oe=61E76843&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271578655_963691637903799_4460239330747541664_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=_CSrUQuswasAX-2LZBR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9UqJcslT4sQJ1PRcwbL3Ct6wQBS8ZnwScVC-nGHBG3rw&oe=61E76843&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ5MjUyMDk0NjkxNTY1NTYwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ5MjUyMDk0NjkxNTY1NTYwfDUxMjAzNjAxODM0fDQwMzZmMTBmNDhhNTg5ZDc3ODJlNzVlMjIzOWMzYmJlZWMyNTY1ZjFjZDgzZDg3NWYwOGZmYjkxMjE1YzQ3ZGEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2749252094574010149',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271836229_701019067938323_6910502344332417543_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=A5--g3RS_jIAX_R4LlC&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9gIYm33AXBA6yf8ovPQJuJzu4wmR2itwsVRvdy4BKlQQ&oe=61E59260&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271836229_701019067938323_6910502344332417543_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=A5--g3RS_jIAX_R4LlC&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_haLOHJSeZdIkta4WdKKS8zGrcztUXsjlk_VxdEfK5VQ&oe=61E59260&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271836229_701019067938323_6910502344332417543_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=A5--g3RS_jIAX_R4LlC&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8Uddfl1Ag-PQhXIeURv_0PMSRlXYB1JHerAyMoQGouKQ&oe=61E59260&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271836229_701019067938323_6910502344332417543_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=A5--g3RS_jIAX_R4LlC&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9gIYm33AXBA6yf8ovPQJuJzu4wmR2itwsVRvdy4BKlQQ&oe=61E59260&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ5MjUyMDk0NTc0MDEwMTQ5Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ5MjUyMDk0NTc0MDEwMTQ5fDUxMjAzNjAxODM0fGMwYTRkYmI3YzFlODk0ZjFiOGJlYmVlOWRmNjQ0ZjYxMWRhYTFmMzE3MjZhYTYyNzAzMmZmMjNhMmE4NjE2MDgifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2749252094590879269',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271607180_621291648992620_1200453747919421140_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=AFeJEWkAgSgAX8cNSBv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT98Y5xkgwmIkvLKP2xnwskW6JXLXHJyqXipvRtEv5EJoA&oe=61E6784C&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271607180_621291648992620_1200453747919421140_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=AFeJEWkAgSgAX8cNSBv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9c8QzIj7D1ejN-NRAZ2gZ7ZAWgqVduI5FUxWSvRFt8sA&oe=61E6784C&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271607180_621291648992620_1200453747919421140_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=AFeJEWkAgSgAX8cNSBv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_oDZkcDlMjC5OdoauWePjGQyxO5xNUgkZkJA5diU5_fQ&oe=61E6784C&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271607180_621291648992620_1200453747919421140_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=AFeJEWkAgSgAX8cNSBv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT98Y5xkgwmIkvLKP2xnwskW6JXLXHJyqXipvRtEv5EJoA&oe=61E6784C&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ5MjUyMDk0NTkwODc5MjY5Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ5MjUyMDk0NTkwODc5MjY5fDUxMjAzNjAxODM0fDQwNTRlMDFjNDNmMmExYzA2YjBhZDE5OTY3YzE5NWZlMWI4NTQ5MTcxMzdkNzYxNDQwYjE4Y2U4ZGNhYjVmN2MifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2749252094582541218',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271665620_1364931810607227_2804034675751987304_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=M8VzleYGe0IAX9x0_X9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_QJegBSB5jAVDxkmeGNBGd2i01zgG2eiQlOmhvLwDFoA&oe=61E6F06F&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271665620_1364931810607227_2804034675751987304_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=M8VzleYGe0IAX9x0_X9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8EAXyb8IL3EEa39wAOfZK4pAjusFtIaDdqebJCE3TdCA&oe=61E6F06F&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271665620_1364931810607227_2804034675751987304_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=M8VzleYGe0IAX9x0_X9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8WHLSXFQZBfi3DdyMOrDyKIFENyB51Qgvxl5XOTzZ5qw&oe=61E6F06F&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271665620_1364931810607227_2804034675751987304_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=M8VzleYGe0IAX9x0_X9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_QJegBSB5jAVDxkmeGNBGd2i01zgG2eiQlOmhvLwDFoA&oe=61E6F06F&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ5MjUyMDk0NTgyNTQxMjE4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ5MjUyMDk0NTgyNTQxMjE4fDUxMjAzNjAxODM0fDg5NDA4NDI3ODhkMzM5MDIzYzE0ZWVmZGFjYWQ1MzYzYWNiYWQ3ODdiYjViZTNkYTAyMjZiNjE3OTNhZTFjZjEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2749252094615908318',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271613857_315023423885371_6973998093298694031_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=yWof_XHy0IoAX9-HRZd&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9nuAqqejYJPiPXk_iCUM7uL0LJPVv5LDjw3DONgJUU_A&oe=61E61798&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271613857_315023423885371_6973998093298694031_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=yWof_XHy0IoAX9-HRZd&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9dsgzh6537DaA5Gc27hx8Y5jEK7D3KARnmMuSgttz-vA&oe=61E61798&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271613857_315023423885371_6973998093298694031_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=yWof_XHy0IoAX9-HRZd&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8MPcSfUBSVfLT8jr4AiJ4Ndw6vdlOJL2UAl3o4UQnvOA&oe=61E61798&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271613857_315023423885371_6973998093298694031_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=yWof_XHy0IoAX9-HRZd&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9nuAqqejYJPiPXk_iCUM7uL0LJPVv5LDjw3DONgJUU_A&oe=61E61798&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ5MjUyMDk0NjE1OTA4MzE4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ5MjUyMDk0NjE1OTA4MzE4fDUxMjAzNjAxODM0fDY2OWEzYmU1YjI1MDQ2YTU4YzAyY2EwMDhmNmI5N2Y1YzdkMzM0ZjU2YmM4NzAwYjdhNDUzZTNiOTY5OTczZTEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2749252094632659601',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271607775_735049724066059_4324246384963145220_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=rVRsFXJjsxwAX-G1MeL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT928xtfWjNdxTFjCYfp-mszMLpWQC86wTDM_v0pnsPL0g&oe=61E6DF1F&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271607775_735049724066059_4324246384963145220_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=rVRsFXJjsxwAX-G1MeL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_WXYUKpMYh9SHHxcgwB8XolFkyupMdiRM4MMCWrOgZBg&oe=61E6DF1F&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271607775_735049724066059_4324246384963145220_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=rVRsFXJjsxwAX-G1MeL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-iGYEsprMmuTIpLulDXAeyMFjMnepESs1SU0PzyPH-pw&oe=61E6DF1F&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271607775_735049724066059_4324246384963145220_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=rVRsFXJjsxwAX-G1MeL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT928xtfWjNdxTFjCYfp-mszMLpWQC86wTDM_v0pnsPL0g&oe=61E6DF1F&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ5MjUyMDk0NjMyNjU5NjAxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ5MjUyMDk0NjMyNjU5NjAxfDUxMjAzNjAxODM0fDE3MzMxZmZmNjcxZjg0OGFlZjIwMWZmMmNiY2VmNzcyMWQ4YWE1MTIzNGYzYjVmMDBmNTQzNGMyZTU5NjEyYmQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2749252094624374515',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271629303_389328756283585_5831069327643116908_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=8clU9zTgd90AX8-gzJb&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9TxyGEyY2_VilZr6Fs1alMUhdCj6keqHM5j9tJWsuCSw&oe=61E66F6D&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271629303_389328756283585_5831069327643116908_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=8clU9zTgd90AX8-gzJb&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9WuQTzdEVfE4op8-oxjUeZXa1wqAptbIbdwvZD2NYLTw&oe=61E66F6D&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271629303_389328756283585_5831069327643116908_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=8clU9zTgd90AX8-gzJb&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-bm4Bk0fvCUiibksU6jsaaFgIUCKq8dyf1AwRkKaPj2Q&oe=61E66F6D&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271629303_389328756283585_5831069327643116908_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=8clU9zTgd90AX8-gzJb&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9TxyGEyY2_VilZr6Fs1alMUhdCj6keqHM5j9tJWsuCSw&oe=61E66F6D&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ5MjUyMDk0NjI0Mzc0NTE1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ5MjUyMDk0NjI0Mzc0NTE1fDUxMjAzNjAxODM0fDgyMTYyZjJkNjQzMTdkNDIzZTRkODZjMzg2OGFjZGJhODdmNDA5NzA3NWEzMjM1YTkyOWU3Mzk0ODlkZjgxNDYifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2749252094641057762',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271807381_667870034587200_9177142331924056704_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=cCRUvmUCQGsAX8tYGFQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT__A9n9JHvKEqxn36UaLlMg2RMojQbBA8f2u1zEAyGP4A&oe=61E71A79&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271807381_667870034587200_9177142331924056704_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=cCRUvmUCQGsAX8tYGFQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-qszkpafJNVEDvuwKTy_eLUD3oKXDcOADpv9JhwqTE3w&oe=61E71A79&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271807381_667870034587200_9177142331924056704_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=cCRUvmUCQGsAX8tYGFQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9wTfVj7t9hDW000zPd_k43sBM3FTQZL13k6q2z0dKG5w&oe=61E71A79&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271807381_667870034587200_9177142331924056704_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=cCRUvmUCQGsAX8tYGFQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT__A9n9JHvKEqxn36UaLlMg2RMojQbBA8f2u1zEAyGP4A&oe=61E71A79&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ5MjUyMDk0NjQxMDU3NzYyIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ5MjUyMDk0NjQxMDU3NzYyfDUxMjAzNjAxODM0fDAzMmI5OWU5M2I0MDYxMjAyNmFjYzcyMzQwMTZhMjI0OTVjMjQ1MWFkMmI3NjM0YWFlOTRkNzhkYjI1ODU4MTMifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2748527300698266761',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8u6tpDhbG1jtzo7ltLjF9VfzG-B6n2jJo7431rHYnI4A&oe=61E76457&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8oShayFFNFejqDuIbrvni9PSoDPZ5PMNuKC5xLCYjwuA&oe=61E76457&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-V-idzU_zngmPF3MHJdyBjp13oGxU-v9IbM8FLltvNhA&oe=61E76457&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8u6tpDhbG1jtzo7ltLjF9VfzG-B6n2jJo7431rHYnI4A&oe=61E76457&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ4NTI3MzAwNjk4MjY2NzYxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyM3wyNzQ4NTI3MzAwNjk4MjY2NzYxfDUxMjAzNjAxODM0fDMzNzlkMDFiZjkxZmUyMmExNTNkZWQ1ZDQ4MjljZWVmYmMzNTVhYjBkYjJiOTc0YTE3MTFmNWM0ZjAyMmMwYmEifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Selain produk-produk elektronik, gelaran CES 2022 ternyata juga menjadi ajang untuk memperkenalkan mobil listrik baru bagi banyak pabrikan. Dan salah satu kejutannya adalah kehadiran VinFast asal Vietnam.\n\nMobil listrik nasional Vietnam ini memang sudah menunjukkan keseriusannya untuk menggarap pasar mobil listrik internasional. Dan di awal tahun ini mereka langsung tancap gas dengan memperkenalkan lima model mobil listrik ke global.\n\nKelima mobil listrik tersebut adalah VF5, VF6, VF7, VF8 (sebelumnya VF e35), dan VF9 (sebelumnya VF e36). Uniknya semua mobil listrik baru Vinfast tersebut merupakan SUV namun untuk kelas yang berbeda-beda.\n\nSelain memperkenalkan mobil-mobilnya, VinFast menjadikan pameran di CES tersebut sebagai momen bagi Global CEO, Le Thi Thu Thuy mengumumkan untuk membangun gigafactory di Amerika Serikat. Hingga pengumuman pembangunan pabrik sel baterai di Vietnam.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #spklu #SPBKLU #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif  #vinfast #mobnas',
                  },
                },
              ],
            },
            shortcode: 'CYkuwSFlVyJ',
            edge_media_to_comment: {
              count: 2,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [
                {
                  node: {
                    id: '17896399844414868',
                    text: 'SEND PIC👉 @WORLD_OF_MOTORIZED',
                    created_at: 1641877752,
                    did_report_as_spam: false,
                    owner: {
                      id: '48616036242',
                      is_verified: false,
                      profile_pic_url:
                        'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-19/234048571_896177317644836_5978852223651185329_n.jpg?stp=dst-jpg_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=_NSppusOPFkAX8KFlp4&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-YwLs9tIALI7FJXqqWEJ8f0t84OF_2ieJETBdfdFvEiw&oe=61E669B3&_nc_sid=86f79a',
                      username: 'luv.lianaa009',
                    },
                    viewer_has_liked: false,
                  },
                },
                {
                  node: {
                    id: '18042083428314295',
                    text: '👏👏👏',
                    created_at: 1641899375,
                    did_report_as_spam: false,
                    owner: {
                      id: '8419874059',
                      is_verified: false,
                      profile_pic_url:
                        'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=1&_nc_ohc=wXe0UPuQ03kAX9M3YK_&edm=AD35FJ8BAAAA&ccb=7-4&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-4&oh=00_AT8Fj-0FpMlHqRpFCHYNtRiNDpBJjQEI2fN9PhtfHUA40Q&oe=61E579CF&_nc_sid=74408c',
                      username: 'iamphatlee',
                    },
                    viewer_has_liked: false,
                  },
                },
              ],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641870008,
            edge_media_preview_like: {
              count: 15,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8oShayFFNFejqDuIbrvni9PSoDPZ5PMNuKC5xLCYjwuA&oe=61E76457&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-uZDxe7qAIVUI4XfuNbzGpctxoYPAUQIIlSAZMKfjdIg&oe=61E76457&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_X2bSY71SkBv9I1WLbnHwGtpnZ-ZJ-71UQGjrdiL5kzA&oe=61E76457&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_juPLJAFEo3Yzn05tYgPLa1OVbaqILjS9GKfz8CCzvsg&oe=61E76457&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT80Ay3UdFU3n5pRCB8R8HyfksrGtpsiAX3I7mGBm51aZQ&oe=61E76457&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8oShayFFNFejqDuIbrvni9PSoDPZ5PMNuKC5xLCYjwuA&oe=61E76457&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2748527290170659807',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8u6tpDhbG1jtzo7ltLjF9VfzG-B6n2jJo7431rHYnI4A&oe=61E76457&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8oShayFFNFejqDuIbrvni9PSoDPZ5PMNuKC5xLCYjwuA&oe=61E76457&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-V-idzU_zngmPF3MHJdyBjp13oGxU-v9IbM8FLltvNhA&oe=61E76457&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271610109_133664125788985_4864043932781652298_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=g_Nrc6L7Zi8AX_M7rs8&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8u6tpDhbG1jtzo7ltLjF9VfzG-B6n2jJo7431rHYnI4A&oe=61E76457&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ4NTI3MjkwMTcwNjU5ODA3Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ4NTI3MjkwMTcwNjU5ODA3fDUxMjAzNjAxODM0fDJmZDZmYjRlMDc4NjViOWU0YWRmMjY0YjE3OGZlMDhmMTVmOGM5ODc5MzAyMGQzZWM2MjBiMTNlMjNjYmY3NzcifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2748527290095201612',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271693909_456054969469985_6650779353192017140_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=CGjDLd5ECTcAX_Cpd-9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8VIS7JFAqA41A-xPTGHb-rvlE66jQaNGOfI7C4pTY9qw&oe=61E7068C&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271693909_456054969469985_6650779353192017140_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=CGjDLd5ECTcAX_Cpd-9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9MFFYv42IWwXb5ptmlA0IZERxTr-eo5Vs868rxJPfCng&oe=61E7068C&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271693909_456054969469985_6650779353192017140_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=CGjDLd5ECTcAX_Cpd-9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8AhzbQtlK8eYUiUaH1_89O6uaeWLxhR9CvzIulMSbRJg&oe=61E7068C&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271693909_456054969469985_6650779353192017140_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=CGjDLd5ECTcAX_Cpd-9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8VIS7JFAqA41A-xPTGHb-rvlE66jQaNGOfI7C4pTY9qw&oe=61E7068C&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ4NTI3MjkwMDk1MjAxNjEyIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ4NTI3MjkwMDk1MjAxNjEyfDUxMjAzNjAxODM0fGEyMzZjYmYxYjE2YjY1NDEyNjQ4ZTgyMjAyNzc0MzAyNjczN2M1MDVmNTQyNGJiNjFkOTM3MmJhODkwNjNkNmQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2748527290145458661',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271527717_1113568196043386_7523641136293288914_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=5FKNUQwFDdUAX-R8Vqx&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-CqhQKM5iuX0xAEqPDnznKBbmoXWJIaDA9-IfR3gHw_w&oe=61E5B2FD&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271527717_1113568196043386_7523641136293288914_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=5FKNUQwFDdUAX-R8Vqx&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_PJQOfcSkN-uE5k3tnhGTnTs9IVdHST0lEshrAHhybRg&oe=61E5B2FD&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271527717_1113568196043386_7523641136293288914_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=5FKNUQwFDdUAX-R8Vqx&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_CTcLB9dD2J2Ud0LKp9iTTSBUwDiSy9HrfBR3a8-4MPw&oe=61E5B2FD&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271527717_1113568196043386_7523641136293288914_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=5FKNUQwFDdUAX-R8Vqx&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-CqhQKM5iuX0xAEqPDnznKBbmoXWJIaDA9-IfR3gHw_w&oe=61E5B2FD&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ4NTI3MjkwMTQ1NDU4NjYxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ4NTI3MjkwMTQ1NDU4NjYxfDUxMjAzNjAxODM0fDQ2Yzk2YWM5NjM0N2UxZmZiMjI1NTZkYmI4ODIxOTdkNzJkM2JlNWQ0NjE4N2FmZjhhN2ZkYTQ1ODljODJjM2IifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2748527290069990701',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271643294_4208047672630203_4869802214874888066_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=g1nyzStozSkAX_chT6a&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-UcO2TqHOpVJvSuJkHF_LosvouteYMVmY0JOWF0eU6zQ&oe=61E65DF6&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271643294_4208047672630203_4869802214874888066_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=g1nyzStozSkAX_chT6a&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9qlhgSEqKfoF_ihHRBdLT3T6u71Bk_s4l9XPNpFonoWg&oe=61E65DF6&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271643294_4208047672630203_4869802214874888066_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=g1nyzStozSkAX_chT6a&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9cIy5E67vbBBU3em7_COgdOMOBiyplxhiEgBzfmUVq0A&oe=61E65DF6&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271643294_4208047672630203_4869802214874888066_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=g1nyzStozSkAX_chT6a&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-UcO2TqHOpVJvSuJkHF_LosvouteYMVmY0JOWF0eU6zQ&oe=61E65DF6&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ4NTI3MjkwMDY5OTkwNzAxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ4NTI3MjkwMDY5OTkwNzAxfDUxMjAzNjAxODM0fGJlNDU0OTVkOGM4ZDdhODQzNmU1ZWIyNGQzNmQ1YmU3YjJhNjI4Y2I2NDhiNDRhMjNhYzZkMWVhNjZiNmEzMTIifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2748527290111799539',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271588140_137961368643973_6915327248358365153_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=nFjpja78HyMAX9k65lu&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-iZ2i_1Mj6BBuT5ZofhSOR0hxWJuHYaKjs9doCCDcioQ&oe=61E611C0&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271588140_137961368643973_6915327248358365153_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=nFjpja78HyMAX9k65lu&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8p0I-BwIADAWA_fk9BMxflj8XLynBuitOsOvYG2AH8Jg&oe=61E611C0&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271588140_137961368643973_6915327248358365153_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=nFjpja78HyMAX9k65lu&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8jGHCdXrCag_jR1qtPWwlEsH0GByGF6pI2-VNC6aQkDQ&oe=61E611C0&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271588140_137961368643973_6915327248358365153_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=nFjpja78HyMAX9k65lu&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-iZ2i_1Mj6BBuT5ZofhSOR0hxWJuHYaKjs9doCCDcioQ&oe=61E611C0&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ4NTI3MjkwMTExNzk5NTM5Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ4NTI3MjkwMTExNzk5NTM5fDUxMjAzNjAxODM0fGQyZTIyYjEwNjQyNDAwNDFiOGZlYmZhYzBjMmY4N2MxZThmNDgzYWE4ZjNkMzFkY2UxOTc3YzY5MTFiYTg0MTQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2748527290204215527',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271616716_602568477490452_4171833072276077628_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=c3TTrgOUvmIAX8IUjWe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_7ztYEqqfSZi4SjqvOrDQyrWoGTAADFeGZ4oIgVr8nVg&oe=61E5C219&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271616716_602568477490452_4171833072276077628_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=c3TTrgOUvmIAX8IUjWe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-CHU98VyCPnOIe_kJXbCkUFAtNp86BkwIP9Y9HoyU0Iw&oe=61E5C219&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271616716_602568477490452_4171833072276077628_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=c3TTrgOUvmIAX8IUjWe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_fhVl0EFEeP_BnsBifw5h7PVPguzq_LC8NZCnQb8CSKA&oe=61E5C219&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271616716_602568477490452_4171833072276077628_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=c3TTrgOUvmIAX8IUjWe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_7ztYEqqfSZi4SjqvOrDQyrWoGTAADFeGZ4oIgVr8nVg&oe=61E5C219&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ4NTI3MjkwMjA0MjE1NTI3Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ4NTI3MjkwMjA0MjE1NTI3fDUxMjAzNjAxODM0fDM4NWE5OTQ5MzRlZTI3NzlmZGZhMGE2NDI4ZGU4NTZhMWE2OTBlZjQyNDczN2U2ZjEwMzE4MGU0Yzk2OWJhMTUifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2747802551988398186',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8EnmqTdg5thzpTi_n7-LCtJwcJ5eG53GY4vU6oiZgrXw&oe=61E5C573&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_vj9k77g2FIuzHYuC4Pwefowxqr8j5yCfsJeyIdQVDrA&oe=61E5C573&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-oGInYsvwZlLgd2dbZ13nhBXVDfh9aVXXQEu5RFihzWQ&oe=61E5C573&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8EnmqTdg5thzpTi_n7-LCtJwcJ5eG53GY4vU6oiZgrXw&oe=61E5C573&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTUxOTg4Mzk4MTg2Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyM3wyNzQ3ODAyNTUxOTg4Mzk4MTg2fDUxMjAzNjAxODM0fDljODc2ZTYzNTYzMmFiMWQyZjFlZDM2ZTQ3Njc2NTY5MTVjMmM0MDI5YzRhNWE4Y2E4MDUzOWQ5NjViNjMwOGYifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Proses pengembangan skuter listrik maxi milik Yamaha kelihatannya terus berjalan mulus. Karena dari beberapa foto terakhir terlihat bahwa pabrikan garpu tala tersebut tengah menguji coba skuter listrik bernama Yamaha E01 tersebut.\n\nYamaha E01 sebenarnya telah diperkenalkan sejak Tokyo Motor Show 2019 lalu. Saat itu Yamaha memperkenalkan dua buah motor listrik, yaitu Yamaha E01 dan E05. Yamaha E01 sendiri lebih banyak ditunggu oleh para fans karena posisinya yang setara dengan skuter maxi Yamaha di kelas 125/155 cc.\n\nDan dari foto-foto baru yang diunggah oleh Response.jp diketahui bahwa versi produksi dari Yamaha E01 sudah mulai melakukan test ride di negaranya, Jepang. Bahkan beberapa awak media di sana sudah dapat mulai mencobanya.\n\nDalam koleksi foto tersebut, terlihat bahwa versi prototipe Yamaha E01 ini dibalut dalam stiker kamuflase. Namun masih bisa dilihat bahwa skuter listrik ini membawa mayoritas desain dari konsepnya pada saat diperkenalkan.\n\nJangan lupa follow kita di @momotrik.id untuk mendapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #motorlistrik #beritamobillistrik #teknologi #otomotif #duniaotomotif #beritaotomotif #beritamotor #infomomotor #infootomotif #tipsotomotif #motorlistrik #skuterlistrik #yamaha #semakindidepan #yamahae01 #yamahanmax #nmax',
                  },
                },
              ],
            },
            shortcode: 'CYiJ9zQLihq',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641783611,
            edge_media_preview_like: {
              count: 9,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_vj9k77g2FIuzHYuC4Pwefowxqr8j5yCfsJeyIdQVDrA&oe=61E5C573&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT88FLmW9A2VfVa3qO1yg00GR5bC-ft3hbnN42ywbeGoMA&oe=61E5C573&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT967jtqpv2nKo-u4lJPVV6YcxiVn0dhu_KaG4ptaaB6dA&oe=61E5C573&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9bBl8H8EPgacBm-9LFo36i2ZyEzA6t_Vb63JRmDroPiQ&oe=61E5C573&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8XWmGWzlur-wvjgNj4JJo824yL_VmEEkkWelnPVNMA2w&oe=61E5C573&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_vj9k77g2FIuzHYuC4Pwefowxqr8j5yCfsJeyIdQVDrA&oe=61E5C573&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747802546242201902',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8EnmqTdg5thzpTi_n7-LCtJwcJ5eG53GY4vU6oiZgrXw&oe=61E5C573&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_vj9k77g2FIuzHYuC4Pwefowxqr8j5yCfsJeyIdQVDrA&oe=61E5C573&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-oGInYsvwZlLgd2dbZ13nhBXVDfh9aVXXQEu5RFihzWQ&oe=61E5C573&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271495744_1060744228103434_4830877098296618596_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=AItouA-4Ga0AX_DjpkE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8EnmqTdg5thzpTi_n7-LCtJwcJ5eG53GY4vU6oiZgrXw&oe=61E5C573&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTQ2MjQyMjAxOTAyIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ3ODAyNTQ2MjQyMjAxOTAyfDUxMjAzNjAxODM0fGQxY2U1ZWYyNzk1NTUwNjFhOTczYjdjYjJhNzBiNGFlZGY1YmNmNWE5MzhmMDI0OTRmY2NiZjEzMGQ1OWY0ZjcifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747802546133107752',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271549543_1117450532345204_334920199340557354_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=2mcPJufAMvoAX-Qr8zt&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_riY_1-Zspc28PDhQ8adVGVaKsVD65YWAaY2oO8VfVOw&oe=61E60E6B&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271549543_1117450532345204_334920199340557354_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=2mcPJufAMvoAX-Qr8zt&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8q5ZzDsyvUm5UuFpXhmkDjAaVvpUAQcREr2dq_VGUjCw&oe=61E60E6B&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271549543_1117450532345204_334920199340557354_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=2mcPJufAMvoAX-Qr8zt&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_ws3IwC49pv3A1VaVtZuN3terzgREdioxtngAZAkTovw&oe=61E60E6B&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271549543_1117450532345204_334920199340557354_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=2mcPJufAMvoAX-Qr8zt&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_riY_1-Zspc28PDhQ8adVGVaKsVD65YWAaY2oO8VfVOw&oe=61E60E6B&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTQ2MTMzMTA3NzUyIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxMnwyNzQ3ODAyNTQ2MTMzMTA3NzUyfDUxMjAzNjAxODM0fDBkODdkOWM2ZWJmNzAzNTViOWIyNDM4ZTJmMmJmODJjZWI4YTgyNjZmMjlmMDBkZDE5ZmU5ZTEzMjJkZjNjMTAifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747802546443505013',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271550527_425393932661034_1932594194039789755_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=BZ5Jjm59DlcAX9VwPRx&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8FWFIPDkeSvDo-U5j5UGYvku1f3sohn54zs-MRB-0qFQ&oe=61E577AC&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271550527_425393932661034_1932594194039789755_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=BZ5Jjm59DlcAX9VwPRx&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8sttV9LKmvvsdiMFaQNrvTuC64BCmoh3ulINCrwwaZsA&oe=61E577AC&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271550527_425393932661034_1932594194039789755_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=BZ5Jjm59DlcAX9VwPRx&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-ki_9r8IoFCLPyXVjo-JaZXEUaG-V1HLMTxgUa7k5n2A&oe=61E577AC&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271550527_425393932661034_1932594194039789755_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=BZ5Jjm59DlcAX9VwPRx&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8FWFIPDkeSvDo-U5j5UGYvku1f3sohn54zs-MRB-0qFQ&oe=61E577AC&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTQ2NDQzNTA1MDEzIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3ODAyNTQ2NDQzNTA1MDEzfDUxMjAzNjAxODM0fDRkNTM5ZGYxMzE4MWE1ZmU0Nzk3MjUzYjQxNmNiMmQxYmUzOGQwNjM2Y2QxMDhkMmMzMTkyMmU4ODYwNzRkYjUifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747802546217083237',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271670965_3221933131371201_575973370110841806_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Ur3w1LACjC8AX-W6hAE&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8XHsDfCbGPjTHxaYa5nFaxdfj_ZaxESrC3aOjFbXCdcw&oe=61E63B3B&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271670965_3221933131371201_575973370110841806_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Ur3w1LACjC8AX-W6hAE&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9AdJYjNYcJQEILTdZiPC1BG9e2VoiEKOl89JZs9_eRUg&oe=61E63B3B&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271670965_3221933131371201_575973370110841806_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Ur3w1LACjC8AX-W6hAE&edm=APU89FABAAAA&ccb=7-4&oh=00_AT--4PDHGOD6De3867ysslD65swbX-O-9EB0urzE9Rc-Tg&oe=61E63B3B&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271670965_3221933131371201_575973370110841806_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=Ur3w1LACjC8AX-W6hAE&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8XHsDfCbGPjTHxaYa5nFaxdfj_ZaxESrC3aOjFbXCdcw&oe=61E63B3B&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTQ2MjE3MDgzMjM3Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3ODAyNTQ2MjE3MDgzMjM3fDUxMjAzNjAxODM0fDdjMDY4YTM0YTc3ZjY1MTVjMzRmYmUxMzNkN2I1YzUxZTMyN2NlYTM4ZjAxM2VlZmJmMDczNmNhM2NhZTU5YjYifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747802546233695208',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271516187_2062590210586024_8105226964362106900_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=QFuau6u2vD8AX9G09wo&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9AflXl9Q1DmRbz7TPd1YJnDq_En0WgSItQxrn1YRUmNA&oe=61E71ABC&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271516187_2062590210586024_8105226964362106900_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=QFuau6u2vD8AX9G09wo&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9sk9NL__s56DAk5r3cyFI6KMZFW_143p_axAf8b-kSOw&oe=61E71ABC&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271516187_2062590210586024_8105226964362106900_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=QFuau6u2vD8AX9G09wo&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-0HQrBNipTqn2UQAnjU62JeyD71Bt1HkiGDTvKF-cR_w&oe=61E71ABC&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271516187_2062590210586024_8105226964362106900_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=QFuau6u2vD8AX9G09wo&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9AflXl9Q1DmRbz7TPd1YJnDq_En0WgSItQxrn1YRUmNA&oe=61E71ABC&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTQ2MjMzNjk1MjA4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3ODAyNTQ2MjMzNjk1MjA4fDUxMjAzNjAxODM0fGYwNGQ3NTFjNWExNmIxMDI2MmI1Yzk5NmJlYmNmYjRiMzYxZDYyZWEwZDllOTdjYWYyYjc1ZjNiNDZkYjg2ZTQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747802546158424761',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271539802_154407626921878_1504027728030041600_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=e-t43Ry_YPUAX9mlvnE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8520tOS2THt8yMxVy77u0LsaM4m-eku481DKFYXz3TrQ&oe=61E6AF08&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271539802_154407626921878_1504027728030041600_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=e-t43Ry_YPUAX9mlvnE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT84XU0OcnMpn3rEvvy7KI-nvwYjGXQnb0ZVfCakXQ-nwg&oe=61E6AF08&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271539802_154407626921878_1504027728030041600_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=e-t43Ry_YPUAX9mlvnE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-5gd4vKkUDOBZaYoJ44GuBoxY2Gb3XiCbvss804bNlaw&oe=61E6AF08&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271539802_154407626921878_1504027728030041600_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=e-t43Ry_YPUAX9mlvnE&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8520tOS2THt8yMxVy77u0LsaM4m-eku481DKFYXz3TrQ&oe=61E6AF08&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTQ2MTU4NDI0NzYxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3ODAyNTQ2MTU4NDI0NzYxfDUxMjAzNjAxODM0fGFhNjViM2FiMDVhNWM3YzQwM2QzNjc1MGQ0NDEyNzEzMTYxODEyOGZjMmQ2YzE3NTQyMGQ1YzIyYzAzNmU5NTcifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747802546443515848',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271472935_623410808914056_2680117383241289599_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=TXlp0xxkSSMAX-0jo9V&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9bsWZ16RRo8Z3RG8BV1OhOtOBtyk1PjNkjATk0p4wEhw&oe=61E6DBBA&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271472935_623410808914056_2680117383241289599_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=TXlp0xxkSSMAX-0jo9V&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8d4-e02pKnYQIQlaCoS5OYT1GYi-hfhpXY1INLCMmYfA&oe=61E6DBBA&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271472935_623410808914056_2680117383241289599_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=TXlp0xxkSSMAX-0jo9V&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-Cw3lnZYQ27XfCuS1FAMyPJ4G51Wqi5suG-SznYGvPAQ&oe=61E6DBBA&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271472935_623410808914056_2680117383241289599_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=TXlp0xxkSSMAX-0jo9V&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9bsWZ16RRo8Z3RG8BV1OhOtOBtyk1PjNkjATk0p4wEhw&oe=61E6DBBA&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTQ2NDQzNTE1ODQ4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3ODAyNTQ2NDQzNTE1ODQ4fDUxMjAzNjAxODM0fGQ5NzFiYjNiMzZmYTQxOTA4MmZiY2U4ZmRkNjZhNzE4NzMwNTg1Y2UxYjAwYjgyNmM0M2ViYTViMjZiOTdkYTkifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747802546485401409',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271609646_292267312888224_8188205108538201405_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=R3AXYkAinlgAX9OGVBN&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8D56Vzw4cRAaYGqnDW-ll36B4OZm4HXBB9Dajc04y2lg&oe=61E5F4FF&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271609646_292267312888224_8188205108538201405_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=R3AXYkAinlgAX9OGVBN&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8eamMI4j_uPtGj6lKxImZXf4GZHWF2qz8fvBUxjQNNkg&oe=61E5F4FF&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271609646_292267312888224_8188205108538201405_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=R3AXYkAinlgAX9OGVBN&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8QpuWbWjz2fB-I80BDFbksIS3B78Y0_ocUdWHmJiiGJA&oe=61E5F4FF&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271609646_292267312888224_8188205108538201405_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=R3AXYkAinlgAX9OGVBN&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8D56Vzw4cRAaYGqnDW-ll36B4OZm4HXBB9Dajc04y2lg&oe=61E5F4FF&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTQ2NDg1NDAxNDA5Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3ODAyNTQ2NDg1NDAxNDA5fDUxMjAzNjAxODM0fGVjOTA0ODFiMGRjOThhNmFhN2I2NDM4YmFkMmU3MWU4NWMzYWRmNThhN2NhYmQyZjY4MjA5ZmVlYmM0YTVlYzEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747802546208552859',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271764224_1242238039641277_1537468666905773154_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=dAt9oNqn69sAX9tAbHt&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9Z_xPh3xPMWCxRvq4GGFUH3a_oiBl1b3BjW1ecPe1KuQ&oe=61E73285&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271764224_1242238039641277_1537468666905773154_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=dAt9oNqn69sAX9tAbHt&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-ybkCF1IoqcoWb2ZCeRDvJUNQCCvdFODX4QqRnYQHiYg&oe=61E73285&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271764224_1242238039641277_1537468666905773154_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=dAt9oNqn69sAX9tAbHt&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-_WF-miF4djtCBOIWar4835lG6VhIlmiZIMXzGm4Q9sQ&oe=61E73285&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271764224_1242238039641277_1537468666905773154_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=dAt9oNqn69sAX9tAbHt&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9Z_xPh3xPMWCxRvq4GGFUH3a_oiBl1b3BjW1ecPe1KuQ&oe=61E73285&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTQ2MjA4NTUyODU5Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3ODAyNTQ2MjA4NTUyODU5fDUxMjAzNjAxODM0fDRlZTFjMjI1MmVmOWRhOGRlM2I0OTEwNDhhZDcwZGM5ZTBlNGQ3Y2ZmMGVlZmE2NDJjZjc3NjBjNmU5MmJiMDMifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747802546225513734',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271607278_665539777910528_8338091439714700407_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=5KpCJgU7busAX8JM5Gb&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9T76V87Tsj67k8k5s7HJbCrKylx9QY6os-uqnRY5rRNQ&oe=61E60BD1&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271607278_665539777910528_8338091439714700407_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=5KpCJgU7busAX8JM5Gb&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-q2kBr1Le8IH0Xhm8KjZdGwLDaEzmCy_SqCr9eKuqYoA&oe=61E60BD1&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271607278_665539777910528_8338091439714700407_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=5KpCJgU7busAX8JM5Gb&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9k1qkIERwToFMedXA3nElW8jiLI1ldjLGWJW51eZBpdA&oe=61E60BD1&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271607278_665539777910528_8338091439714700407_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=5KpCJgU7busAX8JM5Gb&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9T76V87Tsj67k8k5s7HJbCrKylx9QY6os-uqnRY5rRNQ&oe=61E60BD1&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3ODAyNTQ2MjI1NTEzNzM0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3ODAyNTQ2MjI1NTEzNzM0fDUxMjAzNjAxODM0fGUyY2YxOTk5ZmM4MzliNzc1ZTg4ZDY1ODFkYWI2ZjRkNDE5YjUxNjY2OTU3ZTczNzkxZThiYjg2YWExOTExYTQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2747077757148450015',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_ql39T7hPMP-RX6ARy0iEymS4s1oWDsTVnhYn5ETa7gA&oe=61E6E48A&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_qrF945boLZ69mwy8vq-oJ7Vb3NFGUd7K-y0MM9mImYg&oe=61E6E48A&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_BQud3uwygWMqVGvWQT-6yY0r6XZd3BtMVlImA8r6gaA&oe=61E6E48A&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_ql39T7hPMP-RX6ARy0iEymS4s1oWDsTVnhYn5ETa7gA&oe=61E6E48A&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3MDc3NzU3MTQ4NDUwMDE1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyM3wyNzQ3MDc3NzU3MTQ4NDUwMDE1fDUxMjAzNjAxODM0fDdmZTVjZTdmNDk4ZDAyNGJiMDAzYjEwYjM3M2U2N2UxZTM5NGRkYWQ3MTJjNDUxNDY1NmUyMzlkNjdiOTcxMDUifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Pasar truk pikap memang menjadi salah satu pasar yang paling diminati di Amerika Serikat. Maka tidak mengejutkan ketika pasar ini mulai mencoba beralih ke elektrik, banyak perusahaan otomotif yang mengikuti transisi tersebut.\n\nBila sebelumnya publik telah dikejutkan oleh kehadiran Ford F-150 Lighting, kini Chevrolet ikut menyerang dengan membawa nama besar truk pikapnya, Silverado.\n\nMobil yang bernama lengkap Chevrolet Silverado EV 2024 ini dibangun dari nol oleh Chevrolet untuk menjadi truk pikap elektrik yang menembus batas kombinasi antara kapabilitas, performa, dan serbaguna.\n\nAkan ada dua trim dari Silverado EV ini, yaitu WT yang digunakan sebagai kendaraan niaga dengan pelek kaleng, bumper plastik hitam, dan absennya beragam fitur. Sedagkan versi mewah dan fitur lengkapnya disebut  RST First Edition.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #spklu #SPBKLU #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #chevrolet #chevy #silverado #silveradoev #chevroletindonesia #chevyindonesia',
                  },
                },
              ],
            },
            shortcode: 'CYflKpdNczf',
            edge_media_to_comment: {
              count: 1,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [
                {
                  node: {
                    id: '17887281005582149',
                    text: 'Dm it on @alphavehicle',
                    created_at: 1641699143,
                    did_report_as_spam: false,
                    owner: {
                      id: '51034524856',
                      is_verified: false,
                      profile_pic_url:
                        'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/271420870_478262553992127_7034297523619443192_n.jpg?stp=dst-jpg_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=tblH_aqwIawAX9sEkqO&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9TNSRdL3wRNCKyFODt3asMk6-mNjNfpjDsg16JxfAqTQ&oe=61E5AD69&_nc_sid=86f79a',
                      username: 'rundibaaz6',
                    },
                    viewer_has_liked: false,
                  },
                },
              ],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641697209,
            edge_media_preview_like: {
              count: 15,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_qrF945boLZ69mwy8vq-oJ7Vb3NFGUd7K-y0MM9mImYg&oe=61E6E48A&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9-nx0QXJ_4vVlQz7FWPRB3BDHH_YJVOyKNACdrLgA-Ww&oe=61E6E48A&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8Wye3aC9ANBNEemUxGbxMFoKIayGFdi4MscDi8evJ3EQ&oe=61E6E48A&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9hzi0rONWOhWghaOG4njiWpFO-w23-jG_FLu452hJ1Zg&oe=61E6E48A&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-xNz-4ti6M-0YVZfbFFz_7TvN5RUENfYM67f23pIvzMg&oe=61E6E48A&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_qrF945boLZ69mwy8vq-oJ7Vb3NFGUd7K-y0MM9mImYg&oe=61E6E48A&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747077741981892347',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_ql39T7hPMP-RX6ARy0iEymS4s1oWDsTVnhYn5ETa7gA&oe=61E6E48A&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_qrF945boLZ69mwy8vq-oJ7Vb3NFGUd7K-y0MM9mImYg&oe=61E6E48A&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_BQud3uwygWMqVGvWQT-6yY0r6XZd3BtMVlImA8r6gaA&oe=61E6E48A&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418972_1227750791081232_1345345708790810769_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=QImqOHfHp8YAX_soWtI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_ql39T7hPMP-RX6ARy0iEymS4s1oWDsTVnhYn5ETa7gA&oe=61E6E48A&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3MDc3NzQxOTgxODkyMzQ3Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3MDc3NzQxOTgxODkyMzQ3fDUxMjAzNjAxODM0fGRjN2ZjZDdiNjEwN2NmMzQyNzgwNDdiOWRjMzMzOWVmZjgzODU0YjYyNGM3MmM5N2QyNzJiZTY3Zjg0ZjMwZDMifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747077742007091023',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271609329_3221837064702940_3132294175240246019_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=pyHOK466YxMAX8ny-Dt&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT91AWxZO7PYnQHJnGEZZ90xTGt92qL1sZKL5HJLebYCRQ&oe=61E67494&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271609329_3221837064702940_3132294175240246019_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=pyHOK466YxMAX8ny-Dt&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9HGL-ulzfiyvgt2H0Jxw6o_86UTn1770-J8znaZ1iWJQ&oe=61E67494&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271609329_3221837064702940_3132294175240246019_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=pyHOK466YxMAX8ny-Dt&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-TZGbySfFBevsSTIZn72U-jnUO4C24osgDVf_5Vplzvg&oe=61E67494&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271609329_3221837064702940_3132294175240246019_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=pyHOK466YxMAX8ny-Dt&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT91AWxZO7PYnQHJnGEZZ90xTGt92qL1sZKL5HJLebYCRQ&oe=61E67494&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3MDc3NzQyMDA3MDkxMDIzIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3MDc3NzQyMDA3MDkxMDIzfDUxMjAzNjAxODM0fDNmOTVmMzBmNWE3Yzg4MDYyZWU3ZWE4NTNhM2VhZWU3ZThiOGYxYzEzMTZhMjk1MDJiYTM2NzBiZjRmNDM0MDkifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747077742149603536',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271506922_257259079880511_126731465771077315_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=NHsQUHLLLvMAX8CUT_z&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_E07oyUTV22UbylNUOx_DXtm1TLnkZCiFV-AuXZMzcUw&oe=61E5B07F&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271506922_257259079880511_126731465771077315_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=NHsQUHLLLvMAX8CUT_z&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-4StZEMdzq1HGCCbR_aEXAa-4tUuq4IH_ZkSCPE0pMNQ&oe=61E5B07F&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271506922_257259079880511_126731465771077315_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=NHsQUHLLLvMAX8CUT_z&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9WH-SuglR5v6UnBh8BetcaGadckZADEbEoYszhU2NgbQ&oe=61E5B07F&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271506922_257259079880511_126731465771077315_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=NHsQUHLLLvMAX8CUT_z&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_E07oyUTV22UbylNUOx_DXtm1TLnkZCiFV-AuXZMzcUw&oe=61E5B07F&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3MDc3NzQyMTQ5NjAzNTM2Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3MDc3NzQyMTQ5NjAzNTM2fDUxMjAzNjAxODM0fGNiYWFlYjM4NmE5OTk1NzUyYmZlZDUxZjE5NDAzZjA3ZmU3NmNmMWE0YzhkNzZhOWJhMjFiYmMyN2MwZWNiMTcifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747077742023750171',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271550858_466104828407012_2793336387870714890_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=4e96NSTm5VYAX9UH2H2&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-qEcDXyKuZjy7mOpYDaS2FpEXke4M7ICJaq2p-iZNRsg&oe=61E63F02&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271550858_466104828407012_2793336387870714890_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=4e96NSTm5VYAX9UH2H2&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8otACIvu2n83-6Xt1PGf8HjbagWalI818tvxFhtAAWTA&oe=61E63F02&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271550858_466104828407012_2793336387870714890_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=4e96NSTm5VYAX9UH2H2&edm=APU89FABAAAA&ccb=7-4&oh=00_AT98U2Nf_Z1ntqYTRcs54CCtN3SsOiSS6g4rikRkkE2Ohw&oe=61E63F02&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271550858_466104828407012_2793336387870714890_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=4e96NSTm5VYAX9UH2H2&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-qEcDXyKuZjy7mOpYDaS2FpEXke4M7ICJaq2p-iZNRsg&oe=61E63F02&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3MDc3NzQyMDIzNzUwMTcxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3MDc3NzQyMDIzNzUwMTcxfDUxMjAzNjAxODM0fGM3OGVkYzA4YzVkMzk2NzA5NzA0NDljM2NkNTdlZjdlMmY0YjJhODA2YjBiZDY0NDIzZDUzM2IxZTBiZTA2MmIifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747077742040561243',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271452163_1631038490572817_7357113502011722654_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=vUalBuoLcsgAX_YJ1wk&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9eDptXzsDtm3cOCgeePxSqy7p3aQJKxKMx_Z71wiiHYA&oe=61E70129&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271452163_1631038490572817_7357113502011722654_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=vUalBuoLcsgAX_YJ1wk&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8ZKLdtpWt8khRudxgFggk4elCcVOLXMAMOI1MkkwzLEw&oe=61E70129&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271452163_1631038490572817_7357113502011722654_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=vUalBuoLcsgAX_YJ1wk&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8fhvE6lTEYuqzY0RuUQbCEjiwamoHNqPaA7026l3T57w&oe=61E70129&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271452163_1631038490572817_7357113502011722654_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=vUalBuoLcsgAX_YJ1wk&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9eDptXzsDtm3cOCgeePxSqy7p3aQJKxKMx_Z71wiiHYA&oe=61E70129&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3MDc3NzQyMDQwNTYxMjQzIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3MDc3NzQyMDQwNTYxMjQzfDUxMjAzNjAxODM0fDY2YmM5MWMzODZhMDIxNjhlZDc3MDdhYTVkMjNkN2M3ZjQ3NjFkNTlhMzM0OWIwNzZiNmM2MDQ2ZDQ2MWRhNjUifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747077742015451875',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271504378_310923167461963_1218446647376057275_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=4jufu-0ftBsAX8CSIJv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-go9UjkziQIBHXszCeWXugqohdr89yiQn42ev1nxXLsQ&oe=61E5DB10&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271504378_310923167461963_1218446647376057275_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=4jufu-0ftBsAX8CSIJv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT89Dax-mcUTld2RLxc6PqZ5KUy0FlcFWv3IshODARdQXQ&oe=61E5DB10&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271504378_310923167461963_1218446647376057275_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=4jufu-0ftBsAX8CSIJv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_eBlyc1sE5F0r-Uxf94I1aDHQjGQMl0wuoWo0YxdSY_g&oe=61E5DB10&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271504378_310923167461963_1218446647376057275_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=4jufu-0ftBsAX8CSIJv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-go9UjkziQIBHXszCeWXugqohdr89yiQn42ev1nxXLsQ&oe=61E5DB10&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3MDc3NzQyMDE1NDUxODc1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3MDc3NzQyMDE1NDUxODc1fDUxMjAzNjAxODM0fGY3Y2FiMWE0ZWI3NTc0ZTViNWU0NGRjNjViZmI0YWY0MjBmYzA1MjBiZjgyNWQ4YzMyMDAwYzJmYjJiNTA5MjEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2747077742032096078',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271451891_296558975771198_3919885155190438636_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=zwfZJjQMkLAAX_djPsJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-3dir3GT_cPuBnXAahF59vCcZaDp_9f5OMbXfOxYvYyA&oe=61E719B5&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271451891_296558975771198_3919885155190438636_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=zwfZJjQMkLAAX_djPsJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_dxVODUvVwhq91Xw3wuw6Mz4-4na1FZ3MWxzaDqLS5-A&oe=61E719B5&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271451891_296558975771198_3919885155190438636_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=zwfZJjQMkLAAX_djPsJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9Ar07hh_gDbmdNdgI9UiZTQ0l9NU7EJcFBDdbWKPmGBQ&oe=61E719B5&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271451891_296558975771198_3919885155190438636_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=zwfZJjQMkLAAX_djPsJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-3dir3GT_cPuBnXAahF59vCcZaDp_9f5OMbXfOxYvYyA&oe=61E719B5&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ3MDc3NzQyMDMyMDk2MDc4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ3MDc3NzQyMDMyMDk2MDc4fDUxMjAzNjAxODM0fDMxMzQ5YWQxMzJjZGE3ZDE1ZmYwMjAyNzBjOTQzZTMwNmQ4NmQ2N2Y3ZWRmYTRiMjgxZDA2NWVkNmY5ZTM3NTEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2746352986743977544',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-lP18_GWJoBHSfMKAXcwno5Gly1H09OcAL0xblomSdDA&oe=61E6E0CE&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_P5JH-4-bkLKDdzPxHZCHY0f3Jp3fgrFBVWTPzpH9a5Q&oe=61E6E0CE&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8P1p2hhESuSn0AnKSBOMX16ZWLQYNIBy019LXdQGYYvA&oe=61E6E0CE&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-lP18_GWJoBHSfMKAXcwno5Gly1H09OcAL0xblomSdDA&oe=61E6E0CE&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ2MzUyOTg2NzQzOTc3NTQ0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyM3wyNzQ2MzUyOTg2NzQzOTc3NTQ0fDUxMjAzNjAxODM0fDExZjVhMmZiMDQ3MjcyYjQ3YzMyZTA5ZjVjMGFjZmQ3MGI4MGVhZTY0ZmI3NTkzNTM4NGQ0ODcxODU0YjFkMDcifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Setelah meluncurkan cukup banyak lineup elektrik pada gelaran Munich Motor Show 2021 lalu, kini Mercedes kembali meramaikan awal tahun 2022 dengan konsep baru mereka Mercedes-Benz Vision EQXX.\n\nTarget besar Mercedes untuk mobil ini adalah mampu membuat mobil listrik yang dapat melaju sejauh 1.000 km dalam sekali cas. Maka tidak mengherankan Mercedese membuat mobil ini seaerodinamis mungkin.\n\nBertepatan dengan pelaksanaan CES 2022, Mercedes akhirnya menampilkan konsep ini setelah teasernya pertama kali keluar 15 bulan yang lalu. Dan terlihat bahwa Mercedes cukup totalitas dalam menghadirkan mobil listrik jarak jauh ini.\n\nMercedes menjelaskan bahwa EQXX bukan hanya sekadar memasangkan baterai yang lebih besar untuk dapat meraih jarak 1.000 km tersebut. Karena Mercedes merasa baterai besar juga memberikan dampak buruk pada bobot mobil yang membengkak. Dan hal tersebut dirasa lebih berbahaya karena berdampak pada pengeremanan dan pengendalian.\n\nJangan lupa follow kita di @momotrik.id untuk mendapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif #mobilkonsep #mercedesamg #mercedesbenzindonesia #visioneqxx #eqxx #mercedeseqxx',
                  },
                },
              ],
            },
            shortcode: 'CYdAX2atTZI',
            edge_media_to_comment: {
              count: 1,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [
                {
                  node: {
                    id: '17989666150421338',
                    text: 'SEND PIC👉 @WORLD_OF_MOTORIZED',
                    created_at: 1641613774,
                    did_report_as_spam: false,
                    owner: {
                      id: '47694847485',
                      is_verified: false,
                      profile_pic_url:
                        'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-19/190303062_131141408987481_8472519194521782581_n.jpg?stp=dst-jpg_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=aLYGMF39D4EAX-CBam3&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_Nnd_ySfTy7RDryamt2kBBt8h_MzYYp54p924rk2i_BQ&oe=61E60D7E&_nc_sid=86f79a',
                      username: 'dixxu_005',
                    },
                    viewer_has_liked: false,
                  },
                },
              ],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641610810,
            edge_media_preview_like: {
              count: 18,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_P5JH-4-bkLKDdzPxHZCHY0f3Jp3fgrFBVWTPzpH9a5Q&oe=61E6E0CE&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_XsLGeTUn5JdZsnmH-BjnBwlE6CImKYlq3-a21JRBFIQ&oe=61E6E0CE&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8Nu89A4hcKzH_kmTFP4V0xz4rimtqdY1ocleTpr6smuA&oe=61E6E0CE&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9sXu6EAnw1U6MBOmsPdH6RIsEzhu4gBTE2f21SVpGBHQ&oe=61E6E0CE&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8pwdPFkTYqhV-b3tZu0wMoBIB5JIBl5LHOIUDeUf62wQ&oe=61E6E0CE&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_P5JH-4-bkLKDdzPxHZCHY0f3Jp3fgrFBVWTPzpH9a5Q&oe=61E6E0CE&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2746352978053508198',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-lP18_GWJoBHSfMKAXcwno5Gly1H09OcAL0xblomSdDA&oe=61E6E0CE&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_P5JH-4-bkLKDdzPxHZCHY0f3Jp3fgrFBVWTPzpH9a5Q&oe=61E6E0CE&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8P1p2hhESuSn0AnKSBOMX16ZWLQYNIBy019LXdQGYYvA&oe=61E6E0CE&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271529438_2068035803354730_6391320707094757300_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=eIE29-KOWfIAX-dp7i7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-lP18_GWJoBHSfMKAXcwno5Gly1H09OcAL0xblomSdDA&oe=61E6E0CE&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ2MzUyOTc4MDUzNTA4MTk4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ2MzUyOTc4MDUzNTA4MTk4fDUxMjAzNjAxODM0fGVjNDA5ZGVlMTM3NThlNzY3NzBlMTMzYWI1OTVmYmFjOWU1NDdiYjAwOWE2Zjk0NGQyNzI4ODE2OWZjZTc3OTkifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2746352977994680771',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271504358_471597127731595_8532999197656871891_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=O37_M0Ky_N8AX-1B6wz&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-wpnQ2Pt6uY9Fb6wxm_Vyor-BZDBafsNyVfRIhyIGKfQ&oe=61E68AC0&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271504358_471597127731595_8532999197656871891_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=O37_M0Ky_N8AX-1B6wz&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_EA1YfITHyRbZsSlRzSl4qXJbbKD3IjQuu-IQvZrl-RA&oe=61E68AC0&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271504358_471597127731595_8532999197656871891_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=O37_M0Ky_N8AX-1B6wz&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-R33Kjj6iZ3vg2gRG_VKSzLIVKPCv530L_yTFfDyTP_A&oe=61E68AC0&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271504358_471597127731595_8532999197656871891_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=O37_M0Ky_N8AX-1B6wz&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-wpnQ2Pt6uY9Fb6wxm_Vyor-BZDBafsNyVfRIhyIGKfQ&oe=61E68AC0&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ2MzUyOTc3OTk0NjgwNzcxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ2MzUyOTc3OTk0NjgwNzcxfDUxMjAzNjAxODM0fDhlZDY3ZGU5MTA3MzRiMjE3YTAwMTAwZjY1YTc5NDA5OWQ0NTRiZWIwYjM1ZjI4NzVmMDgxZWRkNWJlZDdhOTQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2746352978011526215',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271394596_328685262448261_5997010470900309434_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=6ZrwFwY5nMgAX8i0kOB&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9hjr2hoXJunytfcw2En4NMZFeSEUJdPWv23W2h6x4YtQ&oe=61E5E9FB&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271394596_328685262448261_5997010470900309434_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=6ZrwFwY5nMgAX8i0kOB&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8MCx095cP5bUTvyVgFwaWYBc9u7voLhVdRLHSI2-cI8g&oe=61E5E9FB&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271394596_328685262448261_5997010470900309434_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=6ZrwFwY5nMgAX8i0kOB&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-P7tnvu06iXLmzxj2nFHPSXXp1v-V79-k9iCzfkvDSoA&oe=61E5E9FB&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271394596_328685262448261_5997010470900309434_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=6ZrwFwY5nMgAX8i0kOB&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9hjr2hoXJunytfcw2En4NMZFeSEUJdPWv23W2h6x4YtQ&oe=61E5E9FB&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ2MzUyOTc4MDExNTI2MjE1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ2MzUyOTc4MDExNTI2MjE1fDUxMjAzNjAxODM0fDE1OTA1ZDQ2NmE5NjY1ZWUzMjNlODRjYTQ4ZTU1MzIyMzdkN2FkNWM0MmE1ZGU1YTQ3YzAxYTFjZDAxNjRmMzEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2746352978045043936',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271468258_766896664272082_7850529548875867845_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=yGgaKD2a8NwAX8E6rBI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9ia7Ulyja-cP0tFRYHm0Ft6_I-th9fddctc-BWwEmMyw&oe=61E6BC5A&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271468258_766896664272082_7850529548875867845_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=yGgaKD2a8NwAX8E6rBI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-SN6M93h8tf8qHyC2U_oewfoZZFZtQDwXrhaS8_Keskw&oe=61E6BC5A&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271468258_766896664272082_7850529548875867845_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=yGgaKD2a8NwAX8E6rBI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9xVaSdWsJwdk-ZcXnKz2p7127AIAyiDWCx9gKDoi-pCA&oe=61E6BC5A&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271468258_766896664272082_7850529548875867845_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=yGgaKD2a8NwAX8E6rBI&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9ia7Ulyja-cP0tFRYHm0Ft6_I-th9fddctc-BWwEmMyw&oe=61E6BC5A&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ2MzUyOTc4MDQ1MDQzOTM2Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ2MzUyOTc4MDQ1MDQzOTM2fDUxMjAzNjAxODM0fDczNTVlMDM3MzNjYjdlZGZiZTcxOTk0YTdhNWI3ZDY0MzJhODhhMGE1YTkyNzkxMWFmYTM5NTYxYTNiOGJhNGQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2746352978028292125',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418644_261943392707101_350202535234010135_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=YqrCSuQ9Av4AX962mC4&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_KUNzMlVXofd_zm9OH1vZwKxBGtgfSpI-xdDBjYFb8Kw&oe=61E593D2&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418644_261943392707101_350202535234010135_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=YqrCSuQ9Av4AX962mC4&edm=APU89FABAAAA&ccb=7-4&oh=00_AT86G13TuCf6X5QJw_gKExNq8I6eSKbs7YlUtYAZ19rgpg&oe=61E593D2&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418644_261943392707101_350202535234010135_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=YqrCSuQ9Av4AX962mC4&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_llasZCjkLcynAWatAnlZoM9sDHGyIS6l4U28TfraYzQ&oe=61E593D2&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271418644_261943392707101_350202535234010135_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=YqrCSuQ9Av4AX962mC4&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_KUNzMlVXofd_zm9OH1vZwKxBGtgfSpI-xdDBjYFb8Kw&oe=61E593D2&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ2MzUyOTc4MDI4MjkyMTI1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ2MzUyOTc4MDI4MjkyMTI1fDUxMjAzNjAxODM0fDVjMjgxYzNjYzFhODEwYzY2MzFmOGJlYzRmZTgxYTFjNGIyNWFkODZhMDA0YzgwZWMyNTQzZGQxOWEzMzEyZTIifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2746352978036649740',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271400517_4974339932617849_7768702645806163048_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=RChWoITz16gAX8igk2l&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_xjoL06tUUimY8XPPAVkJY7_K6tQw0Xdeho0UkNMQgXQ&oe=61E57908&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271400517_4974339932617849_7768702645806163048_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=RChWoITz16gAX8igk2l&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_aWeR0MmmmXAa31AesWP4At6IcsxO14KEz_P5At4yGJg&oe=61E57908&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271400517_4974339932617849_7768702645806163048_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=RChWoITz16gAX8igk2l&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8t0-C9oGSyDkK-jmzMHkOBRJhae3cU18Za8tL3WjtTxg&oe=61E57908&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271400517_4974339932617849_7768702645806163048_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=RChWoITz16gAX8igk2l&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_xjoL06tUUimY8XPPAVkJY7_K6tQw0Xdeho0UkNMQgXQ&oe=61E57908&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ2MzUyOTc4MDM2NjQ5NzQwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ2MzUyOTc4MDM2NjQ5NzQwfDUxMjAzNjAxODM0fDg1N2NjNzIxN2Y5MjU1MWY1NzBkYzdjMjg1NGU4ZjlhMTZiMzAyMWJmN2RjNzBlYTZjMWYzZmY3YjkwMGNkZDYifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2745628173087901695',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT82bjHGZWu3FbsGmhuc_d_H9ESF-eutVALl50xhH_fYwA&oe=61E68B03&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8aFaLS8GnUro4NLLgV-yGGy3CnwcG_VcoZihRsQnZEZg&oe=61E68B03&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8STEBteD85eQL_ahaJs0bEGS5qK5BSEjZMLtghYCEJSQ&oe=61E68B03&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT82bjHGZWu3FbsGmhuc_d_H9ESF-eutVALl50xhH_fYwA&oe=61E68B03&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ1NjI4MTczMDg3OTAxNjk1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNHwyNzQ1NjI4MTczMDg3OTAxNjk1fDUxMjAzNjAxODM0fGE1YTEyNjEwZDRlYjFjM2RlNzZjYTA2Mzg3ZDkwNWVlZGI5OTUyOWNmYjBmMGRiMTVlYmNiMGJjM2RmZWUwYjIifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'India kini secara tidak langsung telah menjadi salah satu pemain utama dalam industri motor listrik dunia. India menemani China sebagai salah satu pusat industri motor listrik yang telah menjadi partner bagi banyak pabrikan motor listrik dari negara lain.\n\nBajaj  yang merupakan salah satu pabrikan roda dua terbesar di India juga kini tengah disibukkan dengan produksi masal skuter listrik ringan terjangkau yang memang banyak diminati di sana.\n\nSelain memasok skuter listrik untuk pasar dalam negeri, Bajaj juga mempersiapkan skuter listriknya untuk dieksport ke berbagai negara lain di Asia dan bahkan di Eropa.\n\nDi samping itu, Bajaj juga tengah berkolaborasi dengan brand motor listrik asal Swedia, Husqvarna untuk memproduksi motor listriknya. Ada beberapa model yang akan diproduksi oleh Bajaj nantinya seperti skuter elektrik yang bernama Vektorr, dan juga motor sport elektrik mereka E-Pilen.\n\nJangan lupa follow kita di @momotrik.id untuk mendapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #motorlistrik #beritamobillistrik #teknologi #otomotif #duniaotomotif #beritaotomotif #beritamotor #infomomotor #infootomotif #tipsotomotif #motorlistrik #bajaj #freerider #chetak #husqvarna',
                  },
                },
              ],
            },
            shortcode: 'CYabkbGNYf_',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641524405,
            edge_media_preview_like: {
              count: 8,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8aFaLS8GnUro4NLLgV-yGGy3CnwcG_VcoZihRsQnZEZg&oe=61E68B03&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8XibTgfpCQUcL6K1fBXuBlvTmUSEuVJBFbRj6O8TcnOg&oe=61E68B03&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_7BSBx9oQpIJ6wJXseBROo22YVAGhiO7X4WkYvnk0FdA&oe=61E68B03&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_K81JaDjgM7YNAPR23arMAxD3uORyRqg8sPEXTAvP1Hw&oe=61E68B03&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_yPso5vw2cYZRv6fKa9SsIviCtKBAAoMr5P5nVneSK1Q&oe=61E68B03&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8aFaLS8GnUro4NLLgV-yGGy3CnwcG_VcoZihRsQnZEZg&oe=61E68B03&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2745628165152385435',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT82bjHGZWu3FbsGmhuc_d_H9ESF-eutVALl50xhH_fYwA&oe=61E68B03&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8aFaLS8GnUro4NLLgV-yGGy3CnwcG_VcoZihRsQnZEZg&oe=61E68B03&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8STEBteD85eQL_ahaJs0bEGS5qK5BSEjZMLtghYCEJSQ&oe=61E68B03&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271510498_462756115294644_1273995464488498973_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=P86Y-mGupeAAX8CPI9t&edm=APU89FABAAAA&ccb=7-4&oh=00_AT82bjHGZWu3FbsGmhuc_d_H9ESF-eutVALl50xhH_fYwA&oe=61E68B03&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ1NjI4MTY1MTUyMzg1NDM1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ1NjI4MTY1MTUyMzg1NDM1fDUxMjAzNjAxODM0fDZhN2Y4NWVlM2Y5NzhiZGI3YTc5ODI3MmY1MmY4YzBhOWQ4YWFkODkzMjQ4ZWJkZGEzMWQ0MDEyZDViZWVmZmYifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2745628165303320607',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271454870_696155814849083_8568027988002485568_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=eI-OL8wWMMoAX_baEmY&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-CiApSh1apWKJyO_o2_WJWHooDkLFPMbtX1mncFkNzfA&oe=61E737A0&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271454870_696155814849083_8568027988002485568_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=eI-OL8wWMMoAX_baEmY&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9aSa88yIyMg0AA5dqjEEKae5RcskOLiOVGOvgxZtV4gQ&oe=61E737A0&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271454870_696155814849083_8568027988002485568_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=eI-OL8wWMMoAX_baEmY&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9orIABz0PVW3a6EYMvvzUHC0gguoLDemrBCDQdudN0Xg&oe=61E737A0&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271454870_696155814849083_8568027988002485568_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=eI-OL8wWMMoAX_baEmY&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-CiApSh1apWKJyO_o2_WJWHooDkLFPMbtX1mncFkNzfA&oe=61E737A0&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ1NjI4MTY1MzAzMzIwNjA3Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ1NjI4MTY1MzAzMzIwNjA3fDUxMjAzNjAxODM0fDAwYmQ5MTA3MzZjY2QxZWY2ZGFiNDNlODI2ZmNlNGNkNTcyZWQ4NjkwNzM0ODk2OTMzNjVjMmM5OTYzM2QxMzMifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2745628165320139770',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271350702_630580388179040_5168306213711122624_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=kzt4YGvUYLkAX8VIMOQ&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT96CEanqhQHzSTPHghNpza80cClFN6trhf-OmXpg-RC1g&oe=61E6C4F4&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271350702_630580388179040_5168306213711122624_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=kzt4YGvUYLkAX8VIMOQ&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-QEm30vj0-RvaWNBC50epUZCuwiJkB7z1sfc6ll-jdSQ&oe=61E6C4F4&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271350702_630580388179040_5168306213711122624_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=kzt4YGvUYLkAX8VIMOQ&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9O6PGbHRVre_a__CoCms-FuTrP90LdXa6gJ7o09R4Z5Q&oe=61E6C4F4&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271350702_630580388179040_5168306213711122624_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=kzt4YGvUYLkAX8VIMOQ&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT96CEanqhQHzSTPHghNpza80cClFN6trhf-OmXpg-RC1g&oe=61E6C4F4&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ1NjI4MTY1MzIwMTM5NzcwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ1NjI4MTY1MzIwMTM5NzcwfDUxMjAzNjAxODM0fDRlMWYzMGUzMTY1MjRmYzJjMWMxNDliNjUxMWExOGYyNjQ3YzMwMDAyMmQ0ZDZhNDZkZGM0Njg2MTI3MWRmMWYifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2744873260517932295',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_7rbg5s-ro_-6_jmjTr02T1AWgTQNOf-nH_RZ1KS4cwg&oe=61E737D1&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8OcGstEHznUe2dBaHdVpwEkar8II-MOB7N9mEzHt-zgA&oe=61E737D1&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9cPfUr2gb75JsGLDYixmPKr1pUCBfAiGsQV6o8IDu88Q&oe=61E737D1&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_7rbg5s-ro_-6_jmjTr02T1AWgTQNOf-nH_RZ1KS4cwg&oe=61E737D1&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0ODczMjYwNTE3OTMyMjk1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNHwyNzQ0ODczMjYwNTE3OTMyMjk1fDUxMjAzNjAxODM0fDAyMTkwMTMzY2NiYzIzOWE2OWM1MTM4OTI2MGExYjllZTdjZDc0ZWZlYzFmZjY1Yjc2MzIxYTI5MDkyMGE4MGQifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: '2 tahun yang lalu, gelaran CES 2020 sempat heboh karena raksasa gadget Sony tiba-tiba memperkenalkan sedan elektrik pertama mereka yang disebut Vision-S sedan concept.\n\nSetelah melewati 2021 tanpa kabar kejelasan, banyak yang mengira bahwa Sony telah mengurungkan niatnya untuk mengembangkan mobil listrik. Namun ternyata Sony langsung menampik hal tersebut dengan memperkenalkan mobil konsep kedua mereka pada gelaran CES 2022.\n\nMobil baru ini dinamai Vision-S 02 dan berbeda dari sebelumnya, kini ia mengadopsi bentuk crossover atau SUV kompak. Mobil ini nantinya ditargetkan untuk menjadi rival dari Tesla Model X yang menjadi salah satu mobil listrik paling populer Tesla.\n\nSelain mobil konsep baru, Sony juga tiba dengan pengumuman besar yaitu mereka resmi membentuk Sony Mobility Inc. pada awal tahun ini. Perusahaan ini nantinya akan mengeksplorasi kemungkinan Sony untuk masuk ke pasar mobil listrik.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #spklu #SPBKLU #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif #sony #ces2022 #visions02 #sonyvisions02',
                  },
                },
              ],
            },
            shortcode: 'CYXv6_-o70H',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641434413,
            edge_media_preview_like: {
              count: 13,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8OcGstEHznUe2dBaHdVpwEkar8II-MOB7N9mEzHt-zgA&oe=61E737D1&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_R-CEdB6asHmoUN6v969UG3RDf9_NofjLQIJyNA3yGpA&oe=61E737D1&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-A9f5xWO0xwgM4PzREsDsHZKBHK6teqd0WEK8_YH7-YQ&oe=61E737D1&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9tt1tg6j2jdQZscs24hfWJ9yoYDJimhm4R7z_vMMGrfw&oe=61E737D1&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT87N0g9m5JBD5KGu6nCOmnr0EKXKdh4VquwX_dRwMp-gA&oe=61E737D1&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8OcGstEHznUe2dBaHdVpwEkar8II-MOB7N9mEzHt-zgA&oe=61E737D1&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744873247825761781',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_7rbg5s-ro_-6_jmjTr02T1AWgTQNOf-nH_RZ1KS4cwg&oe=61E737D1&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8OcGstEHznUe2dBaHdVpwEkar8II-MOB7N9mEzHt-zgA&oe=61E737D1&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9cPfUr2gb75JsGLDYixmPKr1pUCBfAiGsQV6o8IDu88Q&oe=61E737D1&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271393950_1081515892648874_2891517051367242356_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=WmL5jNl8hAAAX-y7wo9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_7rbg5s-ro_-6_jmjTr02T1AWgTQNOf-nH_RZ1KS4cwg&oe=61E737D1&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0ODczMjQ3ODI1NzYxNzgxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ0ODczMjQ3ODI1NzYxNzgxfDUxMjAzNjAxODM0fDk3MGJlY2U5ODczMjIxYjcyOTIwMzMzMDY5OGM4MDkyMWE0N2E2MmJiMGNmMzQ0Yjg1MDU4OTAwMDdmYTljYTkifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744873247842679470',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271342800_333779928594674_4872249040681016399_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=EgMrdb5ev5IAX-3O76a&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_0Xspw9tdUhBU5b1yYecXISKHdjkK5We4yadJQTZ0hxw&oe=61E5CC8A&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271342800_333779928594674_4872249040681016399_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=EgMrdb5ev5IAX-3O76a&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_eoEsmzq29XDh2CrzVcIPEPxAuyUoINQXeNWFJbNuk5w&oe=61E5CC8A&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271342800_333779928594674_4872249040681016399_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=EgMrdb5ev5IAX-3O76a&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-ml0zQ1oaugXoa1nDt_HXMGts6ubBl6c949B8Z1r80KQ&oe=61E5CC8A&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271342800_333779928594674_4872249040681016399_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=EgMrdb5ev5IAX-3O76a&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_0Xspw9tdUhBU5b1yYecXISKHdjkK5We4yadJQTZ0hxw&oe=61E5CC8A&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0ODczMjQ3ODQyNjc5NDcwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ0ODczMjQ3ODQyNjc5NDcwfDUxMjAzNjAxODM0fGE2NjI3MGEyYzNlOGYwNjA1MTkwNDg3NTA5OWZlZDcxYjgzMDUxY2RkOWZlNzA0ZGFhZWU5YmQzMjg3MTU0NTAifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744873247809193053',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271450974_675384933482597_8939290700860875206_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=zMC3xhRgNoAAX8rgaSR&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_TjPR-1oJANJZOmwB-AmGmdXRNC7HWwTjRjZadFGxArw&oe=61E5944D&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271450974_675384933482597_8939290700860875206_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=zMC3xhRgNoAAX8rgaSR&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_aFlKk6VStx4Wv1KzbEdoiVKrNkj-xw8NSNv_ul19xow&oe=61E5944D&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271450974_675384933482597_8939290700860875206_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=zMC3xhRgNoAAX8rgaSR&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_8kw-lTaHDtKBaFqXG0D3LH3-G6tuaF45WFVNYJSDdfg&oe=61E5944D&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271450974_675384933482597_8939290700860875206_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=zMC3xhRgNoAAX8rgaSR&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_TjPR-1oJANJZOmwB-AmGmdXRNC7HWwTjRjZadFGxArw&oe=61E5944D&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0ODczMjQ3ODA5MTkzMDUzIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ0ODczMjQ3ODA5MTkzMDUzfDUxMjAzNjAxODM0fGVmMTZjYzU2NWFjNWUwNGFlNTQ1NzZjYmVkYjE5ZGNlODFmMjg0ZmU3NTk3OWYyOWQ1OTVjOTIyOWI5NTZmZDYifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744873247783918021',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271312834_3801885080036147_2374860933302429737_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=DzYeyYYZB_8AX8Z3Sq7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-HrqMD-kprQ0bbW_H8uKk38Xk6BecwoC2P0BybNPhymg&oe=61E62793&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271312834_3801885080036147_2374860933302429737_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=DzYeyYYZB_8AX8Z3Sq7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_JMoLYwVl7cLsbPgWRZMEXY8WOvf6f6MRiFeYQe-vOGg&oe=61E62793&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271312834_3801885080036147_2374860933302429737_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=DzYeyYYZB_8AX8Z3Sq7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_9guORenA4obkdxDvwZ2yFyLSUCQAtSIjNojUZdA1UsQ&oe=61E62793&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271312834_3801885080036147_2374860933302429737_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=DzYeyYYZB_8AX8Z3Sq7&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-HrqMD-kprQ0bbW_H8uKk38Xk6BecwoC2P0BybNPhymg&oe=61E62793&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0ODczMjQ3NzgzOTE4MDIxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ0ODczMjQ3NzgzOTE4MDIxfDUxMjAzNjAxODM0fGY5MThiNDhkM2EwY2U3NTU1MmZkZjg5MjUyM2FkOTdhNjk3MGYzZDU3N2I1YjMwNjFmM2IxMzRhZjNkMjE0MGIifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744873247817536226',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271238515_1143057459834850_3972455396815670947_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Y6azWpGI1WwAX_xiADw&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9znPga5up-6-cjN_tfb2hSNzofYZgadKCA0oJ0XdzxlA&oe=61E6E439&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271238515_1143057459834850_3972455396815670947_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Y6azWpGI1WwAX_xiADw&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9itEWGjTxFxFiVFnAukqgzmvJSj_zIe6WUUSzpaBoOww&oe=61E6E439&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271238515_1143057459834850_3972455396815670947_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Y6azWpGI1WwAX_xiADw&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-bgcvOqhgFRGiEyTHv3ShHeZNycHH-uxr7I2JoN38row&oe=61E6E439&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271238515_1143057459834850_3972455396815670947_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Y6azWpGI1WwAX_xiADw&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9znPga5up-6-cjN_tfb2hSNzofYZgadKCA0oJ0XdzxlA&oe=61E6E439&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0ODczMjQ3ODE3NTM2MjI2Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ0ODczMjQ3ODE3NTM2MjI2fDUxMjAzNjAxODM0fGM1ZGFkYTI0YTAyMDYwZTNjNTczYzg3NTJhNzZlNmE4MmI4YWE5NTAwY2YzMWMyZWFhNWQ2YTJkMmU1ZGJiYWQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744873247834141140',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271357079_648461633160920_8667905126294652259_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=GuItgwbiqr4AX9UxTo6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-4dEp1gKbhC0Fq69psgsJy6KHp6Ip-HmYx2FumjRYmAg&oe=61E5D60E&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271357079_648461633160920_8667905126294652259_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=GuItgwbiqr4AX9UxTo6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-pawsXAePjBWFhCprhg_SUpgyTWY_aNDZr46I4r9GfNw&oe=61E5D60E&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271357079_648461633160920_8667905126294652259_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=GuItgwbiqr4AX9UxTo6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_hYdQ_jj8HAErij6BzV5AO4LO6KhduLThPr7mIFubEOg&oe=61E5D60E&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271357079_648461633160920_8667905126294652259_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=GuItgwbiqr4AX9UxTo6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-4dEp1gKbhC0Fq69psgsJy6KHp6Ip-HmYx2FumjRYmAg&oe=61E5D60E&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0ODczMjQ3ODM0MTQxMTQwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ0ODczMjQ3ODM0MTQxMTQwfDUxMjAzNjAxODM0fDk3ZGQyNzJiYWE4ZTc0MjQwNjA1MmM2ZTg1YmQwZjBkZDY1ZjQ3NzhhZmY2NDczZGVlYjFjZjI2Njc5N2E4ZmIifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744873247800569815',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271256480_4763664250420387_8307878355535001413_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=Ivp6v7mZ_VIAX_LQhxA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8JbKiAEqPwUq5YZpdgHVj9h_a8QtBh_dX39Xq22S51sA&oe=61E71C3E&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271256480_4763664250420387_8307878355535001413_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=Ivp6v7mZ_VIAX_LQhxA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9PFcYfS82IHdUK8rh4Ftd0ooRikV8OFnWqr7jvRc7dUg&oe=61E71C3E&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271256480_4763664250420387_8307878355535001413_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=Ivp6v7mZ_VIAX_LQhxA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT82QXEysbf4bj0md-US0BBRbWE2FzntXUpWEcF5PNtcoQ&oe=61E71C3E&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271256480_4763664250420387_8307878355535001413_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=Ivp6v7mZ_VIAX_LQhxA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8JbKiAEqPwUq5YZpdgHVj9h_a8QtBh_dX39Xq22S51sA&oe=61E71C3E&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0ODczMjQ3ODAwNTY5ODE1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxM3wyNzQ0ODczMjQ3ODAwNTY5ODE1fDUxMjAzNjAxODM0fDA4ZGJjZWQ5MzYyZTAzMzZiNTFkY2MwNGM4ZDMxM2M0MjNhMGFhNzY3ZmZjMmNmMzhhNzEyNDFmZWI4YWU5ZDkifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2744178637134972491',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_8A5DKDAN31gxkjj3HWhSRPObtyozr_mDcyqr9zlTpfg&oe=61E66EE4&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT89Mjn2BPenqO-7L7-rQa32V7kne2NaRBRdWjrI85Ioqg&oe=61E66EE4&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8vOXxv9SKEyWwAnnWu03G5xq1eG-3gm5sQCwYJcbB8xg&oe=61E66EE4&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_8A5DKDAN31gxkjj3HWhSRPObtyozr_mDcyqr9zlTpfg&oe=61E66EE4&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0MTc4NjM3MTM0OTcyNDkxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNHwyNzQ0MTc4NjM3MTM0OTcyNDkxfDUxMjAzNjAxODM0fDhjOWI1ZjIwYWVmNjU4YzUzOGIxZjg4N2RhMTA0YmMwMmNlMzc4MDUxODcwNWJhYjMyMzA1NDRjOTA1OGIzN2EifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Dengan persaingan yang semakin ketat di pasar mobil listrik, Tesla dengan Model 3-nya ternyata malah mampu naik menjadi mobil listrik yang paling laris untuk 2021 ini, menurut laporan dari Carscoops.\n\nLaporan tersebut mengambil data dari JATO Dynamics, sebuah badan analisa otomotif yang berada di London. Dalam laporan tersebut disebut ada total 113.397 unit Model 3 yang berhasil terjual di Eropa mulai Januari hingga Novermber lalu.\n\nAngka tersebut mewakili kenaikan sebesar 84% dari tahun lalu yang akhirnya membuat Model 3 berhasil menumbangkan Renault Zoe yang tahun sebelumnya menjadi mobil listrik paling laris dengan penjualan 99.261 unit.\n\nTesla Model 3 sendiri mulai mendominasi pasar Eropa sejak bulan September lalu dimana ia telah menjadi mobil listrik dengan penjualan terbaik bersama Model Y. Model Y sendiri menjadi favorit baru bagi masyarakat Eropa setelah diimpor dari China pada semester kedua 2021.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #spklu #SPBKLU #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif #tesla',
                  },
                },
              ],
            },
            shortcode: 'CYVR-5ipUZL',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641351607,
            edge_media_preview_like: {
              count: 8,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT89Mjn2BPenqO-7L7-rQa32V7kne2NaRBRdWjrI85Ioqg&oe=61E66EE4&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9Ge9rRyuHu85vymtMoO3Odr_a3NSHvUTAzZqyeYVmIyw&oe=61E66EE4&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_Sy1d5hrd-XfC8NqeM428W3tCwJuOJ_U9rdHpB6IWAWA&oe=61E66EE4&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_SRcNkQSwXh2gslVh77PTVg94GdImtsOpJZAlaThMbiA&oe=61E66EE4&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_e89YxMGuIUuJFNEP8A2G3yMsuOfyEds6Sj35YoxwTnQ&oe=61E66EE4&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT89Mjn2BPenqO-7L7-rQa32V7kne2NaRBRdWjrI85Ioqg&oe=61E66EE4&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744178625768356757',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_8A5DKDAN31gxkjj3HWhSRPObtyozr_mDcyqr9zlTpfg&oe=61E66EE4&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT89Mjn2BPenqO-7L7-rQa32V7kne2NaRBRdWjrI85Ioqg&oe=61E66EE4&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8vOXxv9SKEyWwAnnWu03G5xq1eG-3gm5sQCwYJcbB8xg&oe=61E66EE4&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271225717_1402347170271431_893041626914063061_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=rs-85L2s9IAAX-uMGiJ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_8A5DKDAN31gxkjj3HWhSRPObtyozr_mDcyqr9zlTpfg&oe=61E66EE4&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0MTc4NjI1NzY4MzU2NzU3Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQ0MTc4NjI1NzY4MzU2NzU3fDUxMjAzNjAxODM0fGZkOThlOTIwZWUyNWU5ZTkxZTA4NzI1ZWExZWM0YzdjODJiZDFiY2Y4OTJiZWEzZmRkZjQxMzIxOGNiMGViMDEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744178625734919621',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271300459_975227866420914_6441842907157489593_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=glaw7QrxRp4AX_ognCe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT83VC-utYZJRrJ1aELavgmZa0DTH8Y9Kp3_ElzU9UOrUA&oe=61E70006&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271300459_975227866420914_6441842907157489593_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=glaw7QrxRp4AX_ognCe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_WA7zEwBhA7HqVsgsNnyi0OA5-e5DuEgaNaoGXVWH3DQ&oe=61E70006&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271300459_975227866420914_6441842907157489593_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=glaw7QrxRp4AX_ognCe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT82W28HMjlUj6mCAvdtmAIpeVRf-38hj44_bjKKMKaOtA&oe=61E70006&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271300459_975227866420914_6441842907157489593_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=glaw7QrxRp4AX_ognCe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT83VC-utYZJRrJ1aELavgmZa0DTH8Y9Kp3_ElzU9UOrUA&oe=61E70006&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0MTc4NjI1NzM0OTE5NjIxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQ0MTc4NjI1NzM0OTE5NjIxfDUxMjAzNjAxODM0fGJlZDlmOTNiZTc2YTM1MzgwNjhjNDU4ZWEwNzViMDVjYTY5Zjk4ZjRhYzI1YzRmMzJmNDc0MWM1ODc2MzYyNDIifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744178625759937025',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271393680_319474373397391_3728760569696305787_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=hhuJus0F5O0AX-SXssr&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-ekhgzAozE_bAkmZJaiZoCM5VW6BSH0T6pgOzPkdtgRQ&oe=61E5D13A&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271393680_319474373397391_3728760569696305787_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=hhuJus0F5O0AX-SXssr&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-yWPX5kcJx0oZcxiWnCwDZPQy_ZKHOYLwGz4E66RoB3A&oe=61E5D13A&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271393680_319474373397391_3728760569696305787_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=hhuJus0F5O0AX-SXssr&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-Pfe-QisrRLJD5GIbhbZO3lwn2FPeNaoFarLkrYYDieQ&oe=61E5D13A&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271393680_319474373397391_3728760569696305787_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=hhuJus0F5O0AX-SXssr&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-ekhgzAozE_bAkmZJaiZoCM5VW6BSH0T6pgOzPkdtgRQ&oe=61E5D13A&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0MTc4NjI1NzU5OTM3MDI1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQ0MTc4NjI1NzU5OTM3MDI1fDUxMjAzNjAxODM0fDc1ODhjZTNmZGRhY2E5M2JkYTIyN2IxOTM5ZjFkMzY1ZjhkYTA1MmI4YmEwM2FiODUyNjBjNThlZGRkYzM0ZGYifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744178625743237329',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271386370_1260524024433594_1548062893677877263_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=JchofCoMH80AX8KF9eM&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-onqj2JHHeXH-osLjV_cfwFXlP9N1VkqNxOYyidYUI3w&oe=61E75340&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271386370_1260524024433594_1548062893677877263_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=JchofCoMH80AX8KF9eM&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_2wqo7zSO24Vhzc5x6BCjv4AyC3XoLzePVyxSnEoYaPg&oe=61E75340&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271386370_1260524024433594_1548062893677877263_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=JchofCoMH80AX8KF9eM&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8_k5afmJ079Cr6O10ck_a6ZoKQC6LVSMJ7N9uPMYu1VA&oe=61E75340&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271386370_1260524024433594_1548062893677877263_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=JchofCoMH80AX8KF9eM&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-onqj2JHHeXH-osLjV_cfwFXlP9N1VkqNxOYyidYUI3w&oe=61E75340&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0MTc4NjI1NzQzMjM3MzI5Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQ0MTc4NjI1NzQzMjM3MzI5fDUxMjAzNjAxODM0fGVmN2JjMzk2M2NlZGNlYTFjODEwNTgxNjBkYTJjOTI2Y2IxYzQ1YzZiN2M2ZTllNWMyMDM5MTM1ZmU0MmViOWEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2744178625751695448',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271221264_622346749047033_5438186504733088309_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=sme15N3siCkAX8kuwXG&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9R5u5_q5DMo8slc_iXBRYABMpfSbTa8N1QbOHVav3S-Q&oe=61E5E1DD&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271221264_622346749047033_5438186504733088309_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=sme15N3siCkAX8kuwXG&edm=APU89FABAAAA&ccb=7-4&oh=00_AT82qjy4I7n2nd2wORdXwSIfU3B--CWOj_00_AlbQXB3yA&oe=61E5E1DD&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271221264_622346749047033_5438186504733088309_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=sme15N3siCkAX8kuwXG&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_y5SkfzGTJfpz1Bm-UUK456zwjfsUTpcwMq5nkw45DsQ&oe=61E5E1DD&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271221264_622346749047033_5438186504733088309_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=sme15N3siCkAX8kuwXG&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9R5u5_q5DMo8slc_iXBRYABMpfSbTa8N1QbOHVav3S-Q&oe=61E5E1DD&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQ0MTc4NjI1NzUxNjk1NDQ4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQ0MTc4NjI1NzUxNjk1NDQ4fDUxMjAzNjAxODM0fDVlNTgzZDU3ZThkMTJmZWVlMjA0YzQ0NjgxYTI4MGIyNzI0ODViZWI1NjhmNDI1MmQxOGQ4N2Y4N2FlYWEyZjcifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2743453861169868323',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_wHq5T8jx4qs4uGj8lFPeHZ4E3q9-ROGXIBBvWFiJ4bQ&oe=61E6FA20&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8IyasMSVzBgmvpq56gjKg3iC6SU1MQs3jB3JLAzekjHA&oe=61E6FA20&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8IkYamuxpSnpZdpjinBFLTtehvq_KDR0896646X5ec2w&oe=61E6FA20&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_wHq5T8jx4qs4uGj8lFPeHZ4E3q9-ROGXIBBvWFiJ4bQ&oe=61E6FA20&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQzNDUzODYxMTY5ODY4MzIzIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNHwyNzQzNDUzODYxMTY5ODY4MzIzfDUxMjAzNjAxODM0fDFiNTgyNmIxOGZkZTM3YTc4NThkOTQ3ZDkyZDBjZGQ4MzAzNzUyNjUzZmU1MWM0Zjc0NmJmZDY0M2Y1ZDFmYzIifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Kemunculan Wuling HongGuang Mini EV memang cukup sensasional terutama di negara asalnya, China. Bagaimana tidak, setelah dirilis mobil ini berhasil langsung melesat menjadi mobil listrik paling laris di China.\n\nKesuksesan itulah yang kelihatannya menginspirasi pabrikan mobil asal China lainnya yaitu Dongfeng membuat mobil sejenis. Namun bukan hanya membuat mobil dengan jenis yang sama dengan Wuling Mini EV yaitu microcar, Dongfeng bahkan membuat mobil yang mirip dengan milik Wuling.\n\nTidak berhenti sampai di sana, Dongfeng bahkan membuat nama yang sama-sama panjangnya untuk microcar elektriknya tersebut. Dongfeng memberikan nama FengGuang Mini EV, yang tentu memiliki pola yang sangat mirip dengan HongGuang Mini EV milik Wuling.\n\nTerlepas dari beberapa kesamaan yang terjadi mulai dari penamaan hingga siluet dari bodi mobilnya, Dongfeng tidak memiliki afiliasi dengan Wuling dalam bentuk apapun. Bahkan keduanya merupakan rival utama dalam pasar mobil listrik China.\n\nJangan lupa follow kita di @momotrik.id untuk mendapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif #mobilkonsep #wuling #wulinghonghhuang #miniev #hongguangminiev',
                  },
                },
              ],
            },
            shortcode: 'CYStMBUtC4j',
            edge_media_to_comment: {
              count: 1,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [
                {
                  node: {
                    id: '17878507211538714',
                    text: 'yg bikin bis transjakarta juga',
                    created_at: 1641272403,
                    did_report_as_spam: false,
                    owner: {
                      id: '217393506',
                      is_verified: false,
                      profile_pic_url:
                        'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/11810007_1009070305778991_106295118_a.jpg?cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=nWFxTlFS9hkAX92vz3S&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-DpAV0WDm9Iv5AH2Sow67ueaEYniUpO6bGrwV0_CZQWg&oe=61E7638B&_nc_sid=86f79a',
                      username: 'de.fonda',
                    },
                    viewer_has_liked: false,
                  },
                },
              ],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641265207,
            edge_media_preview_like: {
              count: 7,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8IyasMSVzBgmvpq56gjKg3iC6SU1MQs3jB3JLAzekjHA&oe=61E6FA20&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_pBVLs3NN8-bCbCCTDVVJCIA7yogNUVUgS4BPo8aI8Ig&oe=61E6FA20&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_5aDacvazEiqek52VfEq8D9DZXineEFdxPZ1MRApOs2w&oe=61E6FA20&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-p0V-a_zUoyIevhP-Wqu_cMEDAF5dKxVMNPDgplgDTsA&oe=61E6FA20&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8Thd7p0qC9qus_H16_ol2cPhyGiPwQQyTEeny71smwTg&oe=61E6FA20&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8IyasMSVzBgmvpq56gjKg3iC6SU1MQs3jB3JLAzekjHA&oe=61E6FA20&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2743453853360234659',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_wHq5T8jx4qs4uGj8lFPeHZ4E3q9-ROGXIBBvWFiJ4bQ&oe=61E6FA20&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8IyasMSVzBgmvpq56gjKg3iC6SU1MQs3jB3JLAzekjHA&oe=61E6FA20&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8IkYamuxpSnpZdpjinBFLTtehvq_KDR0896646X5ec2w&oe=61E6FA20&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271170545_643348660195434_957649175727241911_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=qwHXzC7tNpMAX9m3BcU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_wHq5T8jx4qs4uGj8lFPeHZ4E3q9-ROGXIBBvWFiJ4bQ&oe=61E6FA20&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQzNDUzODUzMzYwMjM0NjU5Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQzNDUzODUzMzYwMjM0NjU5fDUxMjAzNjAxODM0fDNkZWU4OWNlMGVkNzZkM2YwNGZkZWJlNDkwMWViZDg0ZmE2ZTg2NGExNzQ0NzU2ZGJlZDBjNzI1NGYyYTQ0MWYifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2743453853376861213',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271299901_758988785504093_6369667366432335994_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=UiGGI15TfC4AX9c6Epr&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-ECw1gMwx0_Fb87yyidUQReJEj99bMpLN-31U5ZLdW0w&oe=61E64D52&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271299901_758988785504093_6369667366432335994_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=UiGGI15TfC4AX9c6Epr&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_498kGNiEBtDqRF3Ex3kJuS3-oNdh2Fv4kEHmZ_8BuJw&oe=61E64D52&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271299901_758988785504093_6369667366432335994_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=UiGGI15TfC4AX9c6Epr&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-hGmyEfz9DDZYIc3dBjagWRINV39zCqaFhZFHnMQbo7w&oe=61E64D52&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271299901_758988785504093_6369667366432335994_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=UiGGI15TfC4AX9c6Epr&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-ECw1gMwx0_Fb87yyidUQReJEj99bMpLN-31U5ZLdW0w&oe=61E64D52&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQzNDUzODUzMzc2ODYxMjEzIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQzNDUzODUzMzc2ODYxMjEzfDUxMjAzNjAxODM0fDc0NzE3NDUwNzcyYjQyYWVhMDY2MDdiMTVkM2NlNmMzYzM3ZmNlMjE1ZGIzY2NhOWY3MmRhMWFlNWIyMjJiYWUifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2743453853385316531',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271270564_679257799900657_1280501206869530603_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=hLbmuIsQ4H8AX9wCciV&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_CbBCx5UODRLbo8t-PKhT93ljdE_1WPLSE-ezOm4SmOg&oe=61E74F95&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271270564_679257799900657_1280501206869530603_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=hLbmuIsQ4H8AX9wCciV&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-BpJd7a1q_f28DhPQush72FKcVFHzrNFlNsB3W430W4Q&oe=61E74F95&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271270564_679257799900657_1280501206869530603_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=hLbmuIsQ4H8AX9wCciV&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-Yv7I3NLBF_CO_NNcYVMMPrbSJpFVL8BTHTH0kXn3peA&oe=61E74F95&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271270564_679257799900657_1280501206869530603_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=hLbmuIsQ4H8AX9wCciV&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_CbBCx5UODRLbo8t-PKhT93ljdE_1WPLSE-ezOm4SmOg&oe=61E74F95&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQzNDUzODUzMzg1MzE2NTMxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQzNDUzODUzMzg1MzE2NTMxfDUxMjAzNjAxODM0fDcxMDFiNTEzYjU3N2MzNDEyOWQxY2ZhMTE1OTY4ZmRkODc2NjU0MGZhMmJmMzlmYmZkZDRkYjIxYTdjYWQxZGMifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2743453853393796387',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271285092_615277709699533_2864277577803472065_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=C_MrqSu-zgAAX9udqbz&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-rPzhl-Xptgo-Gag-uEO_TgViW3YuOXCRjWadyZrNofw&oe=61E5D39F&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271285092_615277709699533_2864277577803472065_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=C_MrqSu-zgAAX9udqbz&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_vN6BNcgW-Q7l8QAB8sfT4AG-H_SYDOR2yo_e_Oqc1FQ&oe=61E5D39F&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271285092_615277709699533_2864277577803472065_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=C_MrqSu-zgAAX9udqbz&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-Jy3sFnW-7BKWcGNEkGo0lqLneQLIppQ54Kc5cCEwiyg&oe=61E5D39F&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271285092_615277709699533_2864277577803472065_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=C_MrqSu-zgAAX9udqbz&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-rPzhl-Xptgo-Gag-uEO_TgViW3YuOXCRjWadyZrNofw&oe=61E5D39F&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQzNDUzODUzMzkzNzk2Mzg3Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQzNDUzODUzMzkzNzk2Mzg3fDUxMjAzNjAxODM0fDZkZjFjYjcxMjE2OWZiMDI4NTY4YmVhODM3ODdkYTk1YjYwNGNhMGY4Yjk4NmE3Y2RiNWM1MjZkOWI3OGQ1ZTgifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphImage',
            id: '2742729064307351529',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271059902_510231883558279_872159768977346978_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=RoYNss_JMOAAX8GFECP&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT93gQapdbUXJasLB7xUDO6K5lx37i9lHijEBughpP0gmg&oe=61E65404&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271059902_510231883558279_872159768977346978_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=RoYNss_JMOAAX8GFECP&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_uYe9zq05MrC-eQ9lUflrybwoE6Pdgvw6Hp1zya_1vRQ&oe=61E65404&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271059902_510231883558279_872159768977346978_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=RoYNss_JMOAAX8GFECP&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9xZN7NX8eKootGo2Aa2qgYB4Kb6xBLOZFjQZIj9zRE-A&oe=61E65404&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271059902_510231883558279_872159768977346978_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=RoYNss_JMOAAX8GFECP&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT93gQapdbUXJasLB7xUDO6K5lx37i9lHijEBughpP0gmg&oe=61E65404&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQyNzI5MDY0MzA3MzUxNTI5Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNXwyNzQyNzI5MDY0MzA3MzUxNTI5fDUxMjAzNjAxODM0fDFiZTgwNDI4NDU3YjBkZThlMjNiYjI2MzNhYzNlM2I0ZWQ3MmY4Yjk2OTg5MDZmZGUxODdiYTFhYmY5NjBkYTMifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Hyundai kini memang menjadi salah satu pemain utama dalam pasar mobil listrik. Maka tidak mengherankan bila pabrikan asal Korea Selatan ini berani habis-habisan untuk dapat menjadi pemimpin di pasar mobil listrik.\n\nSalah satu langkah besar yang diambil Hyundai adalah menutup pusat pengembangan mesin bensin-nya yang berada di markas R&D Hyundai yang berada di Namyang, Korea Selatan pada 17 Desember 2021 lalu.\n\nFasilitas yang memiliki kurang lebih 12.000 personel ini akhirnya kini mengalami reorganisasi. Hal tersebut dilakukan untuk menyambut langkah selanjutnya dari era elektrik yang akan diambil Hyundai.\n\nPenutupan pengembangan mesin bensin Hyundai ini juga secara tidak langsung menjadi penanda usainya era mobil bensin bagi Hyundai. Dan lompatan Hyundai dalam mempercepat transisi perusahannya untuk menjadi produsen mobil listrik penuh.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #spklu #SPBKLU #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif #hyundai #hyundaiindonesia',
                  },
                },
              ],
            },
            shortcode: 'CYQIY1pLd_p',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641178804,
            edge_media_preview_like: {
              count: 5,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271059902_510231883558279_872159768977346978_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=RoYNss_JMOAAX8GFECP&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_uYe9zq05MrC-eQ9lUflrybwoE6Pdgvw6Hp1zya_1vRQ&oe=61E65404&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271059902_510231883558279_872159768977346978_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=RoYNss_JMOAAX8GFECP&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9GDen4a-Ibx9aQ-W9sG-hbgOU9E8RxFqxEDZohLIfq_Q&oe=61E65404&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271059902_510231883558279_872159768977346978_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=RoYNss_JMOAAX8GFECP&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8WBMY6EfmWS5dJAPPseR7XBoZCqixICewB76OhxOKO3A&oe=61E65404&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271059902_510231883558279_872159768977346978_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=RoYNss_JMOAAX8GFECP&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_FbAIWowS3toG9yQonhtnPgrXhiOm1Sa2SKCGz7UjRzw&oe=61E65404&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271059902_510231883558279_872159768977346978_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=RoYNss_JMOAAX8GFECP&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9EyPLwtqvD8abt8uTUzUw-vkjM_m7uWwXlLjh360EEnQ&oe=61E65404&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271059902_510231883558279_872159768977346978_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=RoYNss_JMOAAX8GFECP&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_uYe9zq05MrC-eQ9lUflrybwoE6Pdgvw6Hp1zya_1vRQ&oe=61E65404&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2742004318196961159',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8Fh50VAqyccn7x1Vik6gDIKPvDUafhrICMceMxTAFF7A&oe=61E5FF00&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-9H4O4HDTe8vb9We4x1DN9JA9lBpWleThXtB6m3Z58ag&oe=61E5FF00&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9eE0J3kfv-AZu4dPOAVtdebu3oh1t89-fBGyGPv-m4Ew&oe=61E5FF00&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8Fh50VAqyccn7x1Vik6gDIKPvDUafhrICMceMxTAFF7A&oe=61E5FF00&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQyMDA0MzE4MTk2OTYxMTU5Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNXwyNzQyMDA0MzE4MTk2OTYxMTU5fDUxMjAzNjAxODM0fGZmZDkxZDEzYTIxYzM3MmNiZGMxMjA0YWM4ODE5NTk0YTk4M2IzYjQ3YWJhOGFlNjI5N2Y2YjY0YzdkZWU0YzMifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Institut Teknologi Sepuluh Nopember (ITS) sebelumnya telah dikabarkan mematenkan 2 prototipe sepeda motor listrik, kini kampus teknologi asal Surabaya tersebut kembali mematenkan setidaknya enam prototipe motor listrik ke Direktorat Jenderal Kekayaan Intelektual Kementerian Hukum & HAM RI.\n\nPaten ini menambah variasi motor listrik yang didaftarkan oleh ITS. Bila sebelumnya yang didaftarkan merupakan model skuter maxi dan scrambler, maka kini variasi meluas mulai dari motor niaga roda tiga, motor trail, hingga skuter listrik dengan berbagai macam gaya.\n\nSayangnya, sama seperti sebelumnya ITS tidak mencantumkan data spesifikasi teknis untuk semua prototipe yang didaftarkan. Sehingga yang bisa dipelajari dari paten ini hanya ada pada bentuk fisiknya saja yang mencakup bentuk, garis, dan konfigurasi.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik !!\n•\n•\n•\n#infomomotrik #momotrik #motorlistrik #beritamotorlistrik #electricmotor #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamotor #infomotor #its #itssurabaya',
                  },
                },
              ],
            },
            shortcode: 'CYNjmZOt4-H',
            edge_media_to_comment: {
              count: 1,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [
                {
                  node: {
                    id: '18022526401340791',
                    text: '❤️🔥😍',
                    created_at: 1641096228,
                    did_report_as_spam: false,
                    owner: {
                      id: '42114702185',
                      is_verified: false,
                      profile_pic_url:
                        'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-19/165495082_453133752688262_6272607262950175502_n.jpg?stp=dst-jpg_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=bfvOIsfvu4gAX-0d_8V&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-CavyI7LWbGq8ZRD5roTDO33jy9uByVg6y_a9R0kYXYA&oe=61E5E77E&_nc_sid=86f79a',
                      username: 'widodocsaputro',
                    },
                    viewer_has_liked: false,
                  },
                },
              ],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641092408,
            edge_media_preview_like: {
              count: 20,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-9H4O4HDTe8vb9We4x1DN9JA9lBpWleThXtB6m3Z58ag&oe=61E5FF00&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_RHn__jyV0e9BUXrCnD7JZgfF7ZSdI5RXp0Sbr-jBqWg&oe=61E5FF00&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9GmcavK5FuYrQdTsWslvoGPxUvn_2OH1otjHCS7xZjlQ&oe=61E5FF00&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9r06FGCO9Nnix0KXD7TO23pcpskr15Oli1iSpSdK77pA&oe=61E5FF00&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_cEaxg24DNF9jrg0x048sf-K5kBpxs9r29_-s1zX5PWg&oe=61E5FF00&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-9H4O4HDTe8vb9We4x1DN9JA9lBpWleThXtB6m3Z58ag&oe=61E5FF00&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2742004310630342404',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8Fh50VAqyccn7x1Vik6gDIKPvDUafhrICMceMxTAFF7A&oe=61E5FF00&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-9H4O4HDTe8vb9We4x1DN9JA9lBpWleThXtB6m3Z58ag&oe=61E5FF00&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9eE0J3kfv-AZu4dPOAVtdebu3oh1t89-fBGyGPv-m4Ew&oe=61E5FF00&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271178795_598710471200052_1886893716225309049_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=qUe8GfqsrLwAX9FGcgm&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8Fh50VAqyccn7x1Vik6gDIKPvDUafhrICMceMxTAFF7A&oe=61E5FF00&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQyMDA0MzEwNjMwMzQyNDA0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQyMDA0MzEwNjMwMzQyNDA0fDUxMjAzNjAxODM0fGM4YWQwODg0NDQ2YWJmZTUwMThmNTNhNWRmYzEwMzgyODNlZTUxNWFkZTg4OTVjY2YwODEzMTNmODFlNjczNmUifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2742004310630217814',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271150308_5021987607812380_2986067322522516054_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=euH2w9eLZ-wAX80zkYL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9p0hOhpkZcj58TVo9HTOQuOrmqMUAsPefLkAGCEtl2Ig&oe=61E765AA&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271150308_5021987607812380_2986067322522516054_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=euH2w9eLZ-wAX80zkYL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9Oqv60zoUlBNh6Fl6etFSKOly5LY3z70d5vEf4Slq2RA&oe=61E765AA&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271150308_5021987607812380_2986067322522516054_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=euH2w9eLZ-wAX80zkYL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_rC4A-Ib0qctnpYOgakWpBoi0dkKbkUowK-ME15onmFA&oe=61E765AA&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271150308_5021987607812380_2986067322522516054_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=euH2w9eLZ-wAX80zkYL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9p0hOhpkZcj58TVo9HTOQuOrmqMUAsPefLkAGCEtl2Ig&oe=61E765AA&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQyMDA0MzEwNjMwMjE3ODE0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQyMDA0MzEwNjMwMjE3ODE0fDUxMjAzNjAxODM0fDI5MTcwMjI2ZjVhZThkMjJiNzc0MGIwMGFlZDc0OTFjOTI5YWIxOTJmOTdmZTkyNzU0ZjM1OTc1M2JlNzQxN2UifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2742004310621907340',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271109638_287926490032098_3343306674479110167_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=5hS4O6eGsMUAX95UxJS&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_-daaDHLls_wWvUa37Y-wPfvvHslXJtY74z1tCkiDuxw&oe=61E6A91A&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271109638_287926490032098_3343306674479110167_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=5hS4O6eGsMUAX95UxJS&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8LMRWdI9lpLMWKcaN1vGw9rbxJMJvLvv6bB04beWB3Zw&oe=61E6A91A&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271109638_287926490032098_3343306674479110167_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=5hS4O6eGsMUAX95UxJS&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-EhnKwJZJgbhY44RIAZRtT1vDmM2mdsl9aezH4Vp5hmw&oe=61E6A91A&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271109638_287926490032098_3343306674479110167_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=5hS4O6eGsMUAX95UxJS&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_-daaDHLls_wWvUa37Y-wPfvvHslXJtY74z1tCkiDuxw&oe=61E6A91A&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQyMDA0MzEwNjIxOTA3MzQwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQyMDA0MzEwNjIxOTA3MzQwfDUxMjAzNjAxODM0fDU5NzhiMjdjNGEzY2ZiZTQyMmU0YmU2ZTYzNjc5MDdjYmQ2MWVmNDk4OGUyZjY4ZmQzMjdhYTU3YzA5MGEwODkifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2742004310764456982',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271053397_5364713203556705_1057049113024036162_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=euvYnePPw6kAX_J_xlZ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_aBQY7EKCtCPL9-dPO3YU7raL0CFlDGLEnBVOjvWB73A&oe=61E76908&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271053397_5364713203556705_1057049113024036162_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=euvYnePPw6kAX_J_xlZ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_yMDxNl-8JDoILp9n54oZUBSrIO7rJww16nocFVFOBPg&oe=61E76908&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271053397_5364713203556705_1057049113024036162_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=euvYnePPw6kAX_J_xlZ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9IpRdMSxfc0Np9o3oFvUT3oxSQJy7Dn31m2HxdPKNocQ&oe=61E76908&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271053397_5364713203556705_1057049113024036162_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=euvYnePPw6kAX_J_xlZ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_aBQY7EKCtCPL9-dPO3YU7raL0CFlDGLEnBVOjvWB73A&oe=61E76908&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQyMDA0MzEwNzY0NDU2OTgyIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQyMDA0MzEwNzY0NDU2OTgyfDUxMjAzNjAxODM0fGMyYzhmMDI2NDNhMjM2YzRkOGM2NmFmYTllODdlMjQ3Zjg0MDg4NzI5MWZjYmNjN2VhNDlhOWYwYzM1NDUxNzEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2742004310605048455',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271145523_107862655032129_9033673468912844339_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=ppXI9s1JrP0AX_hSzex&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-Fku3ankfQR8Pe7OwxnDqRwfR9H6M2j1fYtpFOlu_x8Q&oe=61E755A8&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271145523_107862655032129_9033673468912844339_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=ppXI9s1JrP0AX_hSzex&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-gtRn34MAtJSUmh5d32izAoP9-GKIOGLvASM-H2IUtEg&oe=61E755A8&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271145523_107862655032129_9033673468912844339_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=ppXI9s1JrP0AX_hSzex&edm=APU89FABAAAA&ccb=7-4&oh=00_AT94-sy8m0pw1gW__ItOLTStb4f0VSwUvlE5hDawyluH0A&oe=61E755A8&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271145523_107862655032129_9033673468912844339_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=ppXI9s1JrP0AX_hSzex&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-Fku3ankfQR8Pe7OwxnDqRwfR9H6M2j1fYtpFOlu_x8Q&oe=61E755A8&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQyMDA0MzEwNjA1MDQ4NDU1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQyMDA0MzEwNjA1MDQ4NDU1fDUxMjAzNjAxODM0fDdiMWEyOWRhN2UzM2QwZDI2Mjc5YTc0YzAyZjFjZDk1YjU1N2Y2YWFjYjNjMzc1YWIxYTg0ZTc0MTA4NzRhMzgifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2742004310647115474',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271043225_579579366828044_812932128392892808_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=leRN8eHC_QcAX8-4ggA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_Lvz9mBQ98RHcc1ZQ0k8konqD0-V3MK1ehfdiDd3DVFA&oe=61E6F1CC&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271043225_579579366828044_812932128392892808_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=leRN8eHC_QcAX8-4ggA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8r-1vcwT0MX-LCdJjoeniM3_5VqNL8C1IuBIEp0AZb7Q&oe=61E6F1CC&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271043225_579579366828044_812932128392892808_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=leRN8eHC_QcAX8-4ggA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-oReKGG551yGpOZ7EiudfkTnBHyBLGUOZWYS8t4jzMlQ&oe=61E6F1CC&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271043225_579579366828044_812932128392892808_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=leRN8eHC_QcAX8-4ggA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_Lvz9mBQ98RHcc1ZQ0k8konqD0-V3MK1ehfdiDd3DVFA&oe=61E6F1CC&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQyMDA0MzEwNjQ3MTE1NDc0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQyMDA0MzEwNjQ3MTE1NDc0fDUxMjAzNjAxODM0fDRiYzU0YWMyMmQ1NjY4MTFjZmFiM2RiOGI4MjU4YTg4Yjk0NjQyYjg3MmUxZjBjZmUzNjFkNTM5NzAyNzkxOWIifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2742004310638721614',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271141878_875553293062250_2878041674436063562_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=ORrItxojD5AAX85HTs_&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8diBXYdAGf0aLNuBGW1EbhF7a_vSs3FKThVWaHClTIPA&oe=61E60736&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271141878_875553293062250_2878041674436063562_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=ORrItxojD5AAX85HTs_&edm=APU89FABAAAA&ccb=7-4&oh=00_AT85ssmMsugy4IenuYY6zk9_J3d1532ILSdwuWyv0GpLkg&oe=61E60736&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271141878_875553293062250_2878041674436063562_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=ORrItxojD5AAX85HTs_&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_l9cs3vyHXMSqP27hJwJb4lgHdg-XMMK4KDNZX5igHcQ&oe=61E60736&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271141878_875553293062250_2878041674436063562_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=ORrItxojD5AAX85HTs_&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8diBXYdAGf0aLNuBGW1EbhF7a_vSs3FKThVWaHClTIPA&oe=61E60736&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQyMDA0MzEwNjM4NzIxNjE0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQyMDA0MzEwNjM4NzIxNjE0fDUxMjAzNjAxODM0fDRiYzE5NTFiYWNhMjJmM2RlY2IxM2JlMjE1MzE0MGZhMmFkMjUyMWJiN2M3M2QzM2VjYWVjZDE2NmY2MjBmMzAifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2741279538623637925',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-7Ayr1Jrp-Y4m3kWrKxMi7gKycfOzaK6Nhnjc1dBjN2A&oe=61E5F458&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8RyL0ZV29nkwXdUOOwji0xem9_3H_n7jOCdHkaodcnxg&oe=61E5F458&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-SnIotN8FeBzlUuV_5u3KIWFO6XdGQFVOrA6__yl5rNA&oe=61E5F458&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-7Ayr1Jrp-Y4m3kWrKxMi7gKycfOzaK6Nhnjc1dBjN2A&oe=61E5F458&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQxMjc5NTM4NjIzNjM3OTI1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNXwyNzQxMjc5NTM4NjIzNjM3OTI1fDUxMjAzNjAxODM0fGUzYjY1OTA4NzUxNDg0ZmMyMTg5ODNkNGM3YzU2OWE0ZWNhNWQwZWExMzUzMTgyNGQyYjNkNmJkNzhjZjFhZjcifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Waymo merupakan anak perusahaan dari Google (sekarang Alphabet) yang berfokus pada pengembangan teknologi mobil otonomus. Waymo juga sudah mulai beroperasi menggunakan Chryler Pacifica yang diubah menjadi mobil otonomus.\n\nNamun kini, Waymo kelihatannya tetap ingin membuat mobil taksi otonomus mereka sendiri. Yang akhirnya membawa mereka bekerja sama dengan raksasa otomotif China, Geely. Keduanya akan berkolaborasi di bawah brand Zeekr milik Geely.\n\nDan dalam desain perdananya, terlihat bahwa taksi otonomus kini memiliki desain MPV (multi-purpose vehicle) atau van dengan desain yang minimalis. Mobil ini tampil futuristis dengan box besar berwarna hitam di atas mobil yang kelihatannya akan menampung radar, kamera, dan peralatan penunjang teknologi otonomusnya.\n\nBagian paling unik dari mobil ini adalah ia tidak memiliki stir kemudi fisik karena mobilnya memang ditujukan untuk menjadi mobil otonomus penuh. Meskipun banyak yang meyakini bahwa stir tersebut akan tetap ada pada versi produksi untuk masalah keamanan.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #spklu #SPBKLU #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif #waymo #google #geely #zeekr #robotaxy #autonomous',
                  },
                },
              ],
            },
            shortcode: 'CYK-zdptWml',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1641006007,
            edge_media_preview_like: {
              count: 13,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8RyL0ZV29nkwXdUOOwji0xem9_3H_n7jOCdHkaodcnxg&oe=61E5F458&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_TpNvsM4AE94ey5Ugk5-S54V-vJD2UN1_6cUnQ8h1Pqg&oe=61E5F458&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9p3K0WlzGIKk_0zmY9z0DQragTiT2Yb2lliv-KWFr8YQ&oe=61E5F458&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8yRV29L3f03AsyKAZaJEW29o7VgmZoz33J8AxPeZNZjg&oe=61E5F458&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-TU_ssQS_K-qqoL3ycuTIQ1paMavDG0gSlRKP8T0OQ0Q&oe=61E5F458&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8RyL0ZV29nkwXdUOOwji0xem9_3H_n7jOCdHkaodcnxg&oe=61E5F458&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2741279530688080484',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-7Ayr1Jrp-Y4m3kWrKxMi7gKycfOzaK6Nhnjc1dBjN2A&oe=61E5F458&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8RyL0ZV29nkwXdUOOwji0xem9_3H_n7jOCdHkaodcnxg&oe=61E5F458&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-SnIotN8FeBzlUuV_5u3KIWFO6XdGQFVOrA6__yl5rNA&oe=61E5F458&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270768053_3167350073590340_6099038772503412528_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=Dh0Vlv-TjWIAX-lmKwu&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-7Ayr1Jrp-Y4m3kWrKxMi7gKycfOzaK6Nhnjc1dBjN2A&oe=61E5F458&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQxMjc5NTMwNjg4MDgwNDg0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQxMjc5NTMwNjg4MDgwNDg0fDUxMjAzNjAxODM0fGRmMzFkOWRhNDc2M2RiZmRlMWYyNDYxMWY0MDc0M2QxZTE2ZGNiNWNhY2RmZjhmZDM4OTJkMWNmYWRiNGNjMjkifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2741279530637724373',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271060517_307206587983842_7519077571152974858_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=3WhPanmK5-gAX-jK6X3&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8W0v4kUThr4hlmbkXcvVw6X_I2NtEtpcVGBpmbiwESGA&oe=61E60E8C&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271060517_307206587983842_7519077571152974858_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=3WhPanmK5-gAX-jK6X3&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9KhqD87IO3OwWdoXf_qvnmN7SPvYKONi6eyHPm-ItqQA&oe=61E60E8C&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271060517_307206587983842_7519077571152974858_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=3WhPanmK5-gAX-jK6X3&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8MxRZH0jceGBuZcmgV6Xd2TIrgIoXDSrDjQlcR1m2fbg&oe=61E60E8C&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271060517_307206587983842_7519077571152974858_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=3WhPanmK5-gAX-jK6X3&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8W0v4kUThr4hlmbkXcvVw6X_I2NtEtpcVGBpmbiwESGA&oe=61E60E8C&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQxMjc5NTMwNjM3NzI0MzczIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQxMjc5NTMwNjM3NzI0MzczfDUxMjAzNjAxODM0fDA3NWQ5Y2YxMDg0ZjVkNzMwYWVjODYxNWE5YjcyOWNiZGMzOWIyNTcwYjAzYmE5NzRkMzBlODE5NGI2ZDQ0ZDAifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2741279530646096771',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270785792_322905249698492_4418408614339029072_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=qnqnv1G2icgAX8gt0Bu&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-Pg40XOUPP2Vd5d-sZgv4xzqP3ufiws5wis-KdMCVJ-A&oe=61E64B0E&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270785792_322905249698492_4418408614339029072_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=qnqnv1G2icgAX8gt0Bu&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8XoVlqXID5szXJNLCwmYHn2vZGj-PCLlUtDZAjwA3hRQ&oe=61E64B0E&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270785792_322905249698492_4418408614339029072_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=qnqnv1G2icgAX8gt0Bu&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9u-NEnhWWogNuNu0dYZvccp-DOHtWzpqGdRxIQ6jgbbQ&oe=61E64B0E&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270785792_322905249698492_4418408614339029072_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=qnqnv1G2icgAX8gt0Bu&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-Pg40XOUPP2Vd5d-sZgv4xzqP3ufiws5wis-KdMCVJ-A&oe=61E64B0E&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQxMjc5NTMwNjQ2MDk2NzcxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQxMjc5NTMwNjQ2MDk2NzcxfDUxMjAzNjAxODM0fGM3ZGUxMzBhMWYzMWI1N2MyZWZjMjcwNDVlMTM3YzI5NWI5NGYzODA5ZGQyZTY0OTBmODU0YTRkZGJkZmUwMjYifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2741279530671342728',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270995252_206465648362680_6728585116109752421_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=uou2V474JuoAX8m0BXL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_5bHYts0VIfGKc_EbRhme5GZ1d7Rs8vPwGImmOphddoA&oe=61E586A4&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270995252_206465648362680_6728585116109752421_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=uou2V474JuoAX8m0BXL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9l7WPbZrA4k4UjxlJw9EF0V-oa3YuXiRAsMepBxAbxFg&oe=61E586A4&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270995252_206465648362680_6728585116109752421_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=uou2V474JuoAX8m0BXL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_V3EfL26LCs52xCUU2KyCX-oMkgmAC0DOWPSoD4Y-hrQ&oe=61E586A4&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270995252_206465648362680_6728585116109752421_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=uou2V474JuoAX8m0BXL&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_5bHYts0VIfGKc_EbRhme5GZ1d7Rs8vPwGImmOphddoA&oe=61E586A4&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQxMjc5NTMwNjcxMzQyNzI4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQxMjc5NTMwNjcxMzQyNzI4fDUxMjAzNjAxODM0fDBjZmE3MjljMTZlMDM2NGE4MDYyZWU5ZmRlODIwZjU5ZTQxNDBkZWZjZjYwZDdhOGRkNmVjYzFiMTFkZTZkZWYifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2741279530679690370',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270540373_462495865476247_1953791022981288983_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=d6jZgiqzOSMAX9LEl0U&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-Zhc2TygahLE8y1ehiTZnHDHaCa3JlK3DNk391QOw86A&oe=61E75CA1&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270540373_462495865476247_1953791022981288983_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=d6jZgiqzOSMAX9LEl0U&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_dSdyxhBzPrncELeNoGTuLERUoMKt_Y95FN25zB1BlPw&oe=61E75CA1&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270540373_462495865476247_1953791022981288983_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=d6jZgiqzOSMAX9LEl0U&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8S5zJYRKY6HtyKdusiwo00-pgoHxV8kQgqYRn_2E1alw&oe=61E75CA1&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270540373_462495865476247_1953791022981288983_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=d6jZgiqzOSMAX9LEl0U&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-Zhc2TygahLE8y1ehiTZnHDHaCa3JlK3DNk391QOw86A&oe=61E75CA1&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQxMjc5NTMwNjc5NjkwMzcwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQxMjc5NTMwNjc5NjkwMzcwfDUxMjAzNjAxODM0fGZkODNjZDk5M2UzOGJlMzQzODM5NWMwOWNhNjFhOGU5NzU0NmVlNmZmMzNlOTY4ZGRlN2ZlNzZkMzYxMzgyMDQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2741279530788616120',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271193499_918439845474356_2614017469949642682_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=wHlnLCcTFosAX-aelEU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_IZjAVy86G0H2VjkNWei8NjKDmyzIv16ORF619fDOkZw&oe=61E640F4&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271193499_918439845474356_2614017469949642682_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=wHlnLCcTFosAX-aelEU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9fyheR2KmSOTDnnFzm-pU9hhAABfWKC4jFKHt6bsR9Xg&oe=61E640F4&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271193499_918439845474356_2614017469949642682_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=wHlnLCcTFosAX-aelEU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_Bz-S5d9DvaLoXwXe4saz5T3Yum4ey6Ha_RlKHYmH_uw&oe=61E640F4&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/271193499_918439845474356_2614017469949642682_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=wHlnLCcTFosAX-aelEU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_IZjAVy86G0H2VjkNWei8NjKDmyzIv16ORF619fDOkZw&oe=61E640F4&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQxMjc5NTMwNzg4NjE2MTIwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQxMjc5NTMwNzg4NjE2MTIwfDUxMjAzNjAxODM0fGI5MzY1MmNkNzUwYzFlMDA2ZjE5NDM3NDI0YmY0YzY2Y2I2ZTg4NTJmMjk3YzAzMjQ5YjI3NjI3ZTdhMjBhZTMifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2741279530696517025',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271177998_288763943310195_2359987537370758782_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=vbZ6b8R4d1gAX8XYu05&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9oY3xz21EdiLziPGoCmU8AZvySBG6ACPhtS5edwxOa1g&oe=61E6F96C&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271177998_288763943310195_2359987537370758782_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=vbZ6b8R4d1gAX8XYu05&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-kRhpJzFBVjcIfCNk6YT-0-y_Wf-IBpv5fc1KxyHg5Dw&oe=61E6F96C&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271177998_288763943310195_2359987537370758782_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=vbZ6b8R4d1gAX8XYu05&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9Vw8556gUNSUnLIi5_vqfuGKoTZD4pNVzpgMzvuBpXdw&oe=61E6F96C&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/271177998_288763943310195_2359987537370758782_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=vbZ6b8R4d1gAX8XYu05&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9oY3xz21EdiLziPGoCmU8AZvySBG6ACPhtS5edwxOa1g&oe=61E6F96C&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQxMjc5NTMwNjk2NTE3MDI1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQxMjc5NTMwNjk2NTE3MDI1fDUxMjAzNjAxODM0fGU3MDU0MzZkZDYwNGI0NTI4MGNkNDgxNjRhMjEzMzA3NjBhZjkyNDBiZmIxMTUyMmQ0NDY2ZmRlZmFkYjNiNzEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2740554788702131468',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT94KdNDt2MtArjDQ1MDT4a458L97NlTGPVLXbxLMoMALw&oe=61E5F127&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8JYh1KtLj0I6oS-N6izPJatJCiLBCioIskBG103pLZhw&oe=61E5F127&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_brVdqvonU-ci3Te4_OJxIGiv2lHWQW446AYeARdkqFA&oe=61E5F127&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT94KdNDt2MtArjDQ1MDT4a458L97NlTGPVLXbxLMoMALw&oe=61E5F127&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQwNTU0Nzg4NzAyMTMxNDY4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNnwyNzQwNTU0Nzg4NzAyMTMxNDY4fDUxMjAzNjAxODM0fDQ0MTA3NmUzYjZhN2Y1ZGZiYzYxMjc4M2M2M2RmY2MxYjg3NzVmMTMzNDUxZTIxOTZkOTE1NmE1MzU2MTRiZTEifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Setelah mengumumkan bahwa mereka akan menjadi pemasok motor balap untuk MotoE, Ducati kelihatannya langsung masuk ke meja gambar untuk dapat segera menunjukkan motor listrik mereka.\n\nHasilnya, tidak sampai 3 bulan berlalu setelah pengumumannya, Ducati sudah bisa memamerkan prototipe dari motor balap elektrik pertamanya tersebut. Motor tersebut bahkan sudah digeber oleh Ducati di Sirkuit Misano World Circuit Marco Simoncelli, Italia.\n\nPrototipe perdana ini memiliki kode nama “V21L”, yang merupakan hasil kerja sama antara Ducati Corse team dan para insinyur R&D Ducati. Proyek ini dipimpin oleh Roberto Cane yang merupakan Direktur Ducati eMobility.\n\n“Kami mengalami momen yang benar-benar luar biasa. Saya merasa ini sulit dipercaya dan bukan lagi sekedar mimpi! Ducati elektrik pertama di trek balap merupakan sesuatu yang luar biasa,” ujar Roberto Canè.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik !!\n•\n•\n•\n#infomomotrik #momotrik #motorlistrik #beritamotorlistrik #electricmotor #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamotor #infomotor  #ducati #motoe #ducativ21l',
                  },
                },
              ],
            },
            shortcode: 'CYIaA9sFhUM',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1640919611,
            edge_media_preview_like: {
              count: 8,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8JYh1KtLj0I6oS-N6izPJatJCiLBCioIskBG103pLZhw&oe=61E5F127&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT96M2u6qGnL9MA2CzCIQGuy1tJISxM5REXGE5MTdZDv-w&oe=61E5F127&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-c70CVWUXA-RDetaTL2ERLLnMLIOOasjwASDuJ_SDRCQ&oe=61E5F127&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_nsVuezDZljhIs1vnn6gK-NN1wffvFt1VZj0V2WnGaQQ&oe=61E5F127&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-vIqn2nFLshIj5vEte1A6EVtmHFAvVfkhvDSbagBH44g&oe=61E5F127&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8JYh1KtLj0I6oS-N6izPJatJCiLBCioIskBG103pLZhw&oe=61E5F127&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2740554782687372264',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT94KdNDt2MtArjDQ1MDT4a458L97NlTGPVLXbxLMoMALw&oe=61E5F127&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8JYh1KtLj0I6oS-N6izPJatJCiLBCioIskBG103pLZhw&oe=61E5F127&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_brVdqvonU-ci3Te4_OJxIGiv2lHWQW446AYeARdkqFA&oe=61E5F127&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270023542_4644250628999285_4596082325818226390_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=-bIZzmHJAN8AX_87sSe&edm=APU89FABAAAA&ccb=7-4&oh=00_AT94KdNDt2MtArjDQ1MDT4a458L97NlTGPVLXbxLMoMALw&oe=61E5F127&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQwNTU0NzgyNjg3MzcyMjY0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQwNTU0NzgyNjg3MzcyMjY0fDUxMjAzNjAxODM0fGY0ZjllODY5YTYyMTQ1NmNjOGE3NzExYzFiZjA2ODVmM2E1ZDg3OTgxOWEyMzI3YTkzY2FhZTQ4ZDk1NTQ0NzQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2740554782704164105',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270219753_314611343898912_3382398788409485983_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=ZtJwnjoavoAAX90WdFU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT87MRgkYel0iUi8wdBfVJezzf3MpA6bJSdkt0zxrdoFrQ&oe=61E5F538&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270219753_314611343898912_3382398788409485983_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=ZtJwnjoavoAAX90WdFU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8ynmZdRluFxC9Y5MK-hfUUJ9i-Z4_y30X2LtD4GoCV5w&oe=61E5F538&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270219753_314611343898912_3382398788409485983_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=ZtJwnjoavoAAX90WdFU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8JD5q4HdCB_IPc5aQQiUdUgdhuHF-so9hwqWFSGhD-eg&oe=61E5F538&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270219753_314611343898912_3382398788409485983_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=100&_nc_ohc=ZtJwnjoavoAAX90WdFU&edm=APU89FABAAAA&ccb=7-4&oh=00_AT87MRgkYel0iUi8wdBfVJezzf3MpA6bJSdkt0zxrdoFrQ&oe=61E5F538&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQwNTU0NzgyNzA0MTY0MTA1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQwNTU0NzgyNzA0MTY0MTA1fDUxMjAzNjAxODM0fDkwMDFhOTA3ZGM5MDBjMDI0NDM1NWMyYzZhNGI0YTBiNzE1OTM0MmRhYjM0YjA1MmIzOWJiNGQ3YmFjMDYxNGMifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2740554782721157776',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270937059_312590714111178_6000738034108232732_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=floZlVKhypkAX-49jrY&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-b5lSsRB_XvGpvutNjuy-ftDZ5E7QMpQSUqRbt1HOWiA&oe=61E7675D&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270937059_312590714111178_6000738034108232732_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=floZlVKhypkAX-49jrY&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9f9VlJ7T7MFv4hqjnDb-BNJxbZAUoyCqoYK1iYmCrrhg&oe=61E7675D&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270937059_312590714111178_6000738034108232732_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=floZlVKhypkAX-49jrY&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8RFou6NJXxqgAKbHyYgKp3D4D5ky-qkdMXI1r_KLga9A&oe=61E7675D&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270937059_312590714111178_6000738034108232732_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=floZlVKhypkAX-49jrY&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-b5lSsRB_XvGpvutNjuy-ftDZ5E7QMpQSUqRbt1HOWiA&oe=61E7675D&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzQwNTU0NzgyNzIxMTU3Nzc2Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzQwNTU0NzgyNzIxMTU3Nzc2fDUxMjAzNjAxODM0fDU1NTlkOGYxN2FmMTZjNDEyZjRjYTMyYWYyMzQ3NWY5MjI4OTllZWUxYzJiM2E4ODc4ODA2MzU2MWU4OWNlMzAifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2739829990583947603',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8mODBNWoWJWVJP_qaKjyH1eeKKkG-Qi1iufP14d7-umA&oe=61E653C2&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT92UTe5A0wiQbmjXHuHLLkX_LSQXqrEmmcwGfN8i7rLKA&oe=61E653C2&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8ngX433mYejZUSCxvaZPmVCO2HdWA_OITESX3VFRRu4w&oe=61E653C2&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8mODBNWoWJWVJP_qaKjyH1eeKKkG-Qi1iufP14d7-umA&oe=61E653C2&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM5ODI5OTkwNTgzOTQ3NjAzIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNnwyNzM5ODI5OTkwNTgzOTQ3NjAzfDUxMjAzNjAxODM0fGYzNGUyZDg2NzQ5YTA3MzY3MzEwZGVhNjhiZTA3NjA4ZDU3MDJhZjZhZDZlMzFiNzAzZjg3OTgyNmI4M2YyNjkifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Akhir tahun kelihatannya selalu menjadi bulan untuk membeli mobil listrik baru, setidaknya untuk para pembeli di China. Penjualan mobil di China sendiri sebenarnya telah menunjukkan peningkatan yang sangat signifikan pada 2021 ini, namun volume penjualannya terus meningkat mendekati pergantian tahun.\n\nLewat infografik yang dirilis oleh InsideEV, penjualan mobil listrik di China bahkan telah menembus rekor baru yaitu 413.094 unit dalam bulan November 2021 saja. Hal ini berarti penjualan mobil listrik meningkat sebesar 106% dari tahun 2020 lalu.\n\nNamun, laporan tersebut juga menambahkan bahwa bukan hanya volume-nya saja yang bertambah, namun juga market share kendaraan yang naik sebesar 19%. Dengan pembagian 15% untuk mobil listrik penuh dan 4% untuk mobil plug-in hybrid.\n\nHingga bulan November lalu, total telah ada 2,7 juta mobil listrik yang terjual di China selama 2021. Merebut 14,3% dari total pasar kendaraan yang ada di sana. Bila trennya masih terus berlanjut maka penjualan mobil listrik di China bisa memecahkan kembali rekornya di bulan Desember ini bila berhasil terjual 500 ribu unit\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #spklu #SPBKLU #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif #wuling #tesla #mendingwuling #byd',
                  },
                },
              ],
            },
            shortcode: 'CYF1Nw1t9FT',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1640833208,
            edge_media_preview_like: {
              count: 6,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT92UTe5A0wiQbmjXHuHLLkX_LSQXqrEmmcwGfN8i7rLKA&oe=61E653C2&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_v9vMkEl8Qd6JRjxpRMpL5ubY4VVa_lVD9a21HPvkN-w&oe=61E653C2&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-NfalGfOIUsFQazCTw47Lyzk6mC7KtWIp_CMjVwhW8kQ&oe=61E653C2&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9-_Pd1fEzTSMfWcQT5g6Zw2HmLHUXxZoK8r35UKqi_lQ&oe=61E653C2&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9yvLws1w6shWwlofhNN0nU00tp3l_k76GT455C0zzZig&oe=61E653C2&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT92UTe5A0wiQbmjXHuHLLkX_LSQXqrEmmcwGfN8i7rLKA&oe=61E653C2&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2739829974762806090',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8mODBNWoWJWVJP_qaKjyH1eeKKkG-Qi1iufP14d7-umA&oe=61E653C2&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT92UTe5A0wiQbmjXHuHLLkX_LSQXqrEmmcwGfN8i7rLKA&oe=61E653C2&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8ngX433mYejZUSCxvaZPmVCO2HdWA_OITESX3VFRRu4w&oe=61E653C2&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270564956_446543283592454_3878075796937924319_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=IhAdE5LS39UAX9Y3m-6&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8mODBNWoWJWVJP_qaKjyH1eeKKkG-Qi1iufP14d7-umA&oe=61E653C2&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM5ODI5OTc0NzYyODA2MDkwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzM5ODI5OTc0NzYyODA2MDkwfDUxMjAzNjAxODM0fDk5ZTA2Yzc0Y2RlNDJmZWNjODZlOWFjYjkxN2YyOTUwYzU4Zjc0YTFhYTg2MzlhNGNkYTNlODUxY2VhODVjMTkifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2739829974595246718',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270244090_974406003456010_7510678685574182174_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=OBfxvab2U10AX_X_LUg&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_x9H-S_08boSyuu4p3Zy7odS12ijYJrqQmCarxXVu_aA&oe=61E652FE&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270244090_974406003456010_7510678685574182174_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=OBfxvab2U10AX_X_LUg&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-lrYdvypcy4h3JvC2hE10dFmLux4MufaHroVnvw0TweA&oe=61E652FE&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270244090_974406003456010_7510678685574182174_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=OBfxvab2U10AX_X_LUg&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8f5b9YdUfmXO8Izet451DWvKaLOOFQsvWI9MPR7csQEA&oe=61E652FE&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270244090_974406003456010_7510678685574182174_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=OBfxvab2U10AX_X_LUg&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_x9H-S_08boSyuu4p3Zy7odS12ijYJrqQmCarxXVu_aA&oe=61E652FE&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM5ODI5OTc0NTk1MjQ2NzE4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzM5ODI5OTc0NTk1MjQ2NzE4fDUxMjAzNjAxODM0fGVjNjcwMjE1YzZhMzAwMTdjN2RiZGNjM2Q2OGFjY2VhMjc3MWUyNzA5OWFiYWViZDcxYTBiZWRiNzkxNzc3ODcifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2739829974771424082',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270667816_280729040708525_4226545567940636045_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=UIy2nUeXyRcAX_3ovL4&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-OvAk1BX50fe-0gUM3npxz-OlIcufaRqTXxbfhDovKKQ&oe=61E59CF8&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270667816_280729040708525_4226545567940636045_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=UIy2nUeXyRcAX_3ovL4&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9u4vvl034KsWBcHZoIsH0XlKsIvAJWakIrrGBSQ0P0HQ&oe=61E59CF8&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270667816_280729040708525_4226545567940636045_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=UIy2nUeXyRcAX_3ovL4&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_YMQqlWQcjm9eiS2ZnGZbfQUimHFQDI_oLXp0yNiyU_A&oe=61E59CF8&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270667816_280729040708525_4226545567940636045_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=UIy2nUeXyRcAX_3ovL4&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-OvAk1BX50fe-0gUM3npxz-OlIcufaRqTXxbfhDovKKQ&oe=61E59CF8&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM5ODI5OTc0NzcxNDI0MDgyIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzM5ODI5OTc0NzcxNDI0MDgyfDUxMjAzNjAxODM0fGFlZGQzZTVjY2U0ZDY0NDQ4Mzg0NDA2MGNmOTE2MjcyZmNiMzdiZjAyOWNmMDI3MTFjZjk0N2YyNWJhOWU2MDcifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2739316592019252173',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9rXJlUwt-bSHhPzkNHJOVLTW8yxn0GvxzRtUkg57zAkg&oe=61E6A482&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_-PpcfY6uzR8uwdlD5cdwz1-T-tY3Pqc2UWegeVwAO6w&oe=61E6A482&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9hgEqhULA-EHttoxnvRejAqqggk_Ig3BvwSvdmdcAD2A&oe=61E6A482&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9rXJlUwt-bSHhPzkNHJOVLTW8yxn0GvxzRtUkg57zAkg&oe=61E6A482&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM5MzE2NTkyMDE5MjUyMTczIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNnwyNzM5MzE2NTkyMDE5MjUyMTczfDUxMjAzNjAxODM0fGYzZGIxMGMzY2U3YThmNDUwY2I1Yjg3YjA2NjgxNDZjNTUyZTZjODg1OGM3OGQxYWMzOGE0OTQzMDNiMzUyOTUifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Waktu pengisian daya yang lama memang masih menjadi masalah utama untuk kendaraan listrik. Dan untuk sekarang, sistem swap baterai merupakan solusi yang paling masuk akal. Terutama untuk kendaraan seperti motor dan skuter listrik.\n\nHal inilah yang membuat sistem ini digemari oleh para penggunanya di China, Hongkong, Taiwan dan sekitarnya. Gogoro merupakan salah satu pemain utama dalam pasar swap baterai ini yang bahkan telah sukses merajai negara asalnya, Taiwan.\n\nDengan pasar skuter listrik yang besar di negara-negara Asia, Gogoro berkembang secara pesat terutama di 2021 ini. Ia telah melakukan ekspansi ke banyak negara lain seperti India dan juga termasuk Indonesia nantinya.\n\nDikutip dari RideApart, Gogoro disebut berhasil menjual 63.000 unit skuter elektriknya di Taiwan selama 2021. Membuat Gogoro mendominasi pasar Taiwan dari para pesaingnya yang hanya terjual ribuan unit saja.\n\nJangan lupa follow kita di @momotrik.id untuk mendapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #motorlistrik #beritamobillistrik #teknologi #otomotif #duniaotomotif #beritaotomotif #beritamotor #infomomotor #infootomotif #gogoro',
                  },
                },
              ],
            },
            shortcode: 'CYEAe1KpCPN',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1640772006,
            edge_media_preview_like: {
              count: 7,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_-PpcfY6uzR8uwdlD5cdwz1-T-tY3Pqc2UWegeVwAO6w&oe=61E6A482&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT92nLfLFQRtjnZef3SRZntJZnFM1KJCOrI5i9EuWc_I6g&oe=61E6A482&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8EyzlhSgQYZHHrHs11eLgi97JRpBdoUNYDu_s5_EKh7Q&oe=61E6A482&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9hB56p6LLm4ZKDdh5FYPGmSnJA5fjC0hzMIdpgVOs87Q&oe=61E6A482&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8RyA8FvHKHg5d2pvN-wbpUYT7d0I8IKaFyTbZC-5gBag&oe=61E6A482&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_-PpcfY6uzR8uwdlD5cdwz1-T-tY3Pqc2UWegeVwAO6w&oe=61E6A482&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2739316583404270314',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9rXJlUwt-bSHhPzkNHJOVLTW8yxn0GvxzRtUkg57zAkg&oe=61E6A482&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_-PpcfY6uzR8uwdlD5cdwz1-T-tY3Pqc2UWegeVwAO6w&oe=61E6A482&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9hgEqhULA-EHttoxnvRejAqqggk_Ig3BvwSvdmdcAD2A&oe=61E6A482&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270400003_641976210266960_7164746925678890625_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=xVBr9hsmlG4AX-cF7CA&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9rXJlUwt-bSHhPzkNHJOVLTW8yxn0GvxzRtUkg57zAkg&oe=61E6A482&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM5MzE2NTgzNDA0MjcwMzE0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNHwyNzM5MzE2NTgzNDA0MjcwMzE0fDUxMjAzNjAxODM0fDZiMWU5MjQ5MTU5NzBiMzYyZWY0MzQ1ZWE2MWZiYjgxOTM5NDhiNTgxZDlkMzlmOGJmMjVjNjdiZjFhMjg4NDAifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2739316583387421659',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270639046_659622981703798_6203509040912417570_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=zk8HHQNt27UAX97WKNZ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_OISzig37O39mheQ51HZhuZYhA1-vpvKoqvyISzfJMTw&oe=61E67860&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270639046_659622981703798_6203509040912417570_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=zk8HHQNt27UAX97WKNZ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-knQd0SsN7VvygMpDtG11hyWyeMNU0Vs1qCcg5KNSk0A&oe=61E67860&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270639046_659622981703798_6203509040912417570_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=zk8HHQNt27UAX97WKNZ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-RQ8Kbq5tbLpQarXyJc_vEp1nTDFefTwZswCq3MfdcRQ&oe=61E67860&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270639046_659622981703798_6203509040912417570_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=zk8HHQNt27UAX97WKNZ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_OISzig37O39mheQ51HZhuZYhA1-vpvKoqvyISzfJMTw&oe=61E67860&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM5MzE2NTgzMzg3NDIxNjU5Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM5MzE2NTgzMzg3NDIxNjU5fDUxMjAzNjAxODM0fDM3MDFjODI4ZTA5NzdiMTdkYjgwZjRhZGJlNzg1ZTg1Nzk1MzEyOTM2M2RmZTMzOGQ5MTU5NDI1YzliMzk2NTcifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2739316583412628575',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270010015_659973521676644_6184422668038646604_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=a-KkHfRHk_cAX_Bzj10&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_kMZ90k6e_JyldWnTByWOmcUUci8DGwNCI3vp8Z31Jsw&oe=61E5A96D&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270010015_659973521676644_6184422668038646604_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=a-KkHfRHk_cAX_Bzj10&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_EvFpjMw6GqMp92NuiighwHpcnyHFjHbfJshxBmWo5gA&oe=61E5A96D&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270010015_659973521676644_6184422668038646604_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=a-KkHfRHk_cAX_Bzj10&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-i0ztUsoxdbXrxJ7N-vznx63wPw44P3O8Gjt0mzHxDOQ&oe=61E5A96D&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270010015_659973521676644_6184422668038646604_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=a-KkHfRHk_cAX_Bzj10&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_kMZ90k6e_JyldWnTByWOmcUUci8DGwNCI3vp8Z31Jsw&oe=61E5A96D&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM5MzE2NTgzNDEyNjI4NTc1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM5MzE2NTgzNDEyNjI4NTc1fDUxMjAzNjAxODM0fDcyNmM4ODQ1MWUyNDgwMTU2OTFhMjc5MGMwYzc4MDhjZTAzNjc1OTNlODVmMmRjMTgyZmQ2NWMwOTIyMTRiNGUifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2738380427553130291',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-e1FVopcWY7a_3P8g5wvDOAGMmDEKzahsvUgFj-tw2Ag&oe=61E6FB8F&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8qS_Nr9z7J0pvuq5AxnxQJ6gBWWyzCrx4CwanPwABeAQ&oe=61E6FB8F&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8qz8DMPCwf2U-hFslyGZ7J5KfJ8cBEQmm2f4aROPB7sQ&oe=61E6FB8F&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-e1FVopcWY7a_3P8g5wvDOAGMmDEKzahsvUgFj-tw2Ag&oe=61E6FB8F&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM4MzgwNDI3NTUzMTMwMjkxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNnwyNzM4MzgwNDI3NTUzMTMwMjkxfDUxMjAzNjAxODM0fDg2ZDhjYWY5MjViYWQ3ZmU5N2M4ZTllYmY3YjU4ZTY0MzM2Y2ViZTJhNzQ1Y2M0ZTI1MTI0MjcyOWE3NWEyMmUifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Salah satu fitur hiburan yang ada di mobil-mobil listrik Tesla adalah video game. Fitur ini bahkan ingin didorong oleh sang pemilik, Elon Musk agar Tesla dapat memainkan game-game setingkat PS5.\n\nSebelumnya, Tesla bahkan mengeluarkan fitur baru bernama “Passenger Play”. Fitur yang telah tersedia sejak Desember 2020 ini memungkinkan layar infotainment jumbo milik Tesla terbagi menjadi dua. Sehingga sang pengemudi masih dapat mengakses pengaturan bersamaan dengan penumpang yang ada di sebelahnya mengakses video game ketika mobil berjalan.\n\nFitur baru ini langsung menjadi kontroversi dan bahkan mendapat perhatian dari Badan Administrasi Keselamatan Lalu Lintas Jalan Raya Nasional (NHTSA). NHTSA menyoroti fakta bahwa fitur ini juga menimbulkan masalah baru karena dapat mengalihkan perhatian pengemudi.\n\nHasilnya, tidak lama setelah dirilis Tesla kembali memberikan pembaruan sistem untuk mengunci kembali fitur Passenger Play ini. NHTSA bahkan mengkonfirmasi hal tersebut sambil membuka penyelidikan dan evaluasi terhadap fitur tersebut.\n\nJangan lupa follow kita di @momotrik.id untuk mendapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #motorlistrik #beritamobillistrik #teknologi #otomotif #duniaotomotif #beritaotomotif #beritamotor #infomomotor #infootomotif #tesla #teslaindonesia #passengerplay',
                  },
                },
              ],
            },
            shortcode: 'CYArn2EL8cz',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1640660407,
            edge_media_preview_like: {
              count: 6,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8qS_Nr9z7J0pvuq5AxnxQJ6gBWWyzCrx4CwanPwABeAQ&oe=61E6FB8F&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_vk8Vs3_3NNlUfT2IW_kXdGmI4yoIovN1KuZMutOZwzg&oe=61E6FB8F&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8LHBe55Zimjn4OQ6kmPJ-2SvW1B3SLe5_Ss5Ubhq7ziA&oe=61E6FB8F&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-TYiWEemlvdOW88ppZlDvC5qFfd7fWf39DkOMX9oYijA&oe=61E6FB8F&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_53A6dQVmD41UEExwN6lBCK9_X-XOvUQ5uJVfFxcPc-Q&oe=61E6FB8F&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8qS_Nr9z7J0pvuq5AxnxQJ6gBWWyzCrx4CwanPwABeAQ&oe=61E6FB8F&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2738380419919348563',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-e1FVopcWY7a_3P8g5wvDOAGMmDEKzahsvUgFj-tw2Ag&oe=61E6FB8F&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8qS_Nr9z7J0pvuq5AxnxQJ6gBWWyzCrx4CwanPwABeAQ&oe=61E6FB8F&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8qz8DMPCwf2U-hFslyGZ7J5KfJ8cBEQmm2f4aROPB7sQ&oe=61E6FB8F&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270160859_444815783791447_2061021015452035921_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=HrznGUWrw0UAX_1xKq0&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-e1FVopcWY7a_3P8g5wvDOAGMmDEKzahsvUgFj-tw2Ag&oe=61E6FB8F&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM4MzgwNDE5OTE5MzQ4NTYzIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM4MzgwNDE5OTE5MzQ4NTYzfDUxMjAzNjAxODM0fDRkODYxMDliZmI0M2ZlMzQ2OGQ1Y2E3OWY0ZGJiMzE4YTE5MzIxODA2ZGQzOTZjODdkZGVjZWM2YjRjNGViODAifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2738380419944583777',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270205054_994000287855095_7239586213982032284_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=MBJUyr1gpdYAX8p_ELF&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8jNehaY4HWa9Rdd956XdpsPwx2YZMOG9LgDS9EoS3Gdg&oe=61E68DCA&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270205054_994000287855095_7239586213982032284_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=MBJUyr1gpdYAX8p_ELF&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8XCNmBUJVWAPQclBN_W8JWviYmoyrkkGdozRc51ZLqnA&oe=61E68DCA&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270205054_994000287855095_7239586213982032284_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=MBJUyr1gpdYAX8p_ELF&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-9Y91-HEigy7Zia5GWi64H19uOTp7-7qjF69ws48BTng&oe=61E68DCA&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270205054_994000287855095_7239586213982032284_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=MBJUyr1gpdYAX8p_ELF&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8jNehaY4HWa9Rdd956XdpsPwx2YZMOG9LgDS9EoS3Gdg&oe=61E68DCA&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM4MzgwNDE5OTQ0NTgzNzc3Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM4MzgwNDE5OTQ0NTgzNzc3fDUxMjAzNjAxODM0fDhjZjg3MzIzMzMwNTkwMjdlNWJjYTBmYWJlZWNiNzFiNTk4NzlhMjU2MGE5MmY5Y2E0YjUxZmM2M2U4NDUyOWMifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphImage',
            id: '2737655636211081670',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270066494_609963326786174_2982160513349596003_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SQuEdfqs_IsAX_iienV&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-tvdoG33CLc9MoFV9Ypg7I10h6PUhORLfpYYx_DTFBxQ&oe=61E5E616&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270066494_609963326786174_2982160513349596003_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SQuEdfqs_IsAX_iienV&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9G1sh-I5P3mbnVRk1zw3vCWx5ney5cryWvUbU1kUpenQ&oe=61E5E616&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270066494_609963326786174_2982160513349596003_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SQuEdfqs_IsAX_iienV&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8z5uhZYMUm7CklQT1WCKtv8PS4QKX2hmkngmmjMVDS_g&oe=61E5E616&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270066494_609963326786174_2982160513349596003_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SQuEdfqs_IsAX_iienV&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-tvdoG33CLc9MoFV9Ypg7I10h6PUhORLfpYYx_DTFBxQ&oe=61E5E616&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM3NjU1NjM2MjExMDgxNjcwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyNnwyNzM3NjU1NjM2MjExMDgxNjcwfDUxMjAzNjAxODM0fGUzZDViYTdkOTVlMjA5OTk1YTU3Mjc0ZjBjNGIzMzRmN2RhZDA5NzJhMmUxZDY4OWQ4NGFkOGFiMzQ3NTg5NmMifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Target Pemerintah Indonesia agar masyarakat mampu mengadopsi 400 ribu kendaraan beremisi karbon rendah (LCEV) pada 2025 memang terus dikejar. Lewat Kementrian Perindustrian, pemerintah akan mengeluarkan beberapa aturan untuk mempercepat proses peralihannya.\n\nSalah satu langkah yang diambil adalah memberikan insentif agar mobil listrik dapat bersaing dengan kendaraan konvensional. Insentif ini dibagi menjadi dua jenis yaitu insentif bagi konsumen dan juga insentif bagi perusahaan pemroduksi kendaraan listrik.\n\nNamun dengan semua insentif tersebut, pengembangan mobil listrik di Indonesia masih membutuhkan insentif pajak agar harga produknya dapat lebih terjangkau. Insentif tambahan tersebut antara lain adalah penghapusan bea masuk untuk impor kendaraan listrik dalam bentuk utuh (completely built up/CBU), serta penghapusan pajak pertambahan nilai (PPN) dan pajak penghasilan (PPh).\n\nBeberapa usulan insentif di atas  dianggap penting karena harga mobil listrik di Indonesia masih terlampau tinggi dari rentang daya beli masyarakatnya. Riset Universitas Indonesia (UI) menunjukkan bahwa harga ideal untuk mobil listrik berkisar pada harga Rp300 hingga Rp350 juta.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #spklu #SPBKLU #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif',
                  },
                },
              ],
            },
            shortcode: 'CX-G0vhtSHG',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1640574005,
            edge_media_preview_like: {
              count: 8,
              edges: [],
            },
            gating_info: null,
            media_preview:
              'ACoqs3tpI8hkTbjA6gHpx3qSGIwwlWOG+Y5Hb+lJFsJyPw+U/nnFWJQSjYG7g8evtULuauTa5Xsv0KIWQjPmN/47/KrEUXOWlYgdiQMmqkSMhz5WzqSQ3I/+t+NT212LjJjG7bjOR6/j7UydB4Ut/wAtf0FNMcf/AD3P/fQpsV2LgER8468cjP8AwKovKl/55xf5/CkP7v6+RdE1wvyiPgcD6fnUUyssu7kKCOx7Kc8/3epPvimxXMoQMTv7sc4wNgfpjpggf7x5pJJ2ZTk5C8kgHDbg2MdiuB16dO+a0Mycuu35yACOf6n8MjNc/G6hiF4z3HfH+c1qSphDCzfezhjlvugMcYHTAIx6jFZTWrRp5xYEAZGAe4Dfh1qbDubscEcKCRRyQCzD+LI/+vxVNtTQEjng/wB01IJGEaoPmOxSF9R8vA9SAcn6Gs+S4iRyuehI43Y4Pbmiw7laORyAWcjAIGCp+UqFIIyOwAx7etTNK5GC+QcDBEeO/bPB5PPXmsmjNMRps7Z/1hJyx52dWGG/i7j9fc0x18wBGckL0zs44C8fN6AVn5ozSCxpmRwQUf504U/IvbH3gckbeBnNZh4NFJTA/9k=',
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270066494_609963326786174_2982160513349596003_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SQuEdfqs_IsAX_iienV&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9G1sh-I5P3mbnVRk1zw3vCWx5ney5cryWvUbU1kUpenQ&oe=61E5E616&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270066494_609963326786174_2982160513349596003_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SQuEdfqs_IsAX_iienV&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8Qqvc1oaJFqlTb2SmVMaeuUdoKUhDQwXFy1hYv3EP7bg&oe=61E5E616&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270066494_609963326786174_2982160513349596003_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SQuEdfqs_IsAX_iienV&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8sqosw2yiUhJbcl_nLpLwvuRV3KKAGDcbpJ3XR6m4caA&oe=61E5E616&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270066494_609963326786174_2982160513349596003_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SQuEdfqs_IsAX_iienV&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-bwiC6coDmJK3-5CXpzphDltnJd168wYiTyF8570H0AQ&oe=61E5E616&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270066494_609963326786174_2982160513349596003_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SQuEdfqs_IsAX_iienV&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9LTkNLZAIgZKr61huSPeoqx7XcogDS7Q6_pw07aYla3A&oe=61E5E616&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270066494_609963326786174_2982160513349596003_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SQuEdfqs_IsAX_iienV&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9G1sh-I5P3mbnVRk1zw3vCWx5ney5cryWvUbU1kUpenQ&oe=61E5E616&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2736930870361634293',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-GdGtvABXa0Wb5NRCciww9ZjvgVSoSxBwdKWnEqZDfXA&oe=61E59F7E&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-hlHVS5lW8nKcaQuUNJHDuWXthDllaFvkrmNaI7b4t-A&oe=61E59F7E&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT80vdRquCzU_0T5D4s9Tm5jdMrpLZHubolKWRTouay14w&oe=61E59F7E&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-GdGtvABXa0Wb5NRCciww9ZjvgVSoSxBwdKWnEqZDfXA&oe=61E59F7E&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM2OTMwODcwMzYxNjM0MjkzIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyN3wyNzM2OTMwODcwMzYxNjM0MjkzfDUxMjAzNjAxODM0fDc1MGQzMDJhZTQ3YWY4NWFiNDhmMDQxMWYzYTFmNmNlNTkwNjJjYTg1NDFkYzcyMGUwZTYyMWNmMjdkNmJiNGQifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Badge AMG tentunya menjadi status bagi mobil-mobil Mercedes-Benz yang telah dimaksimalkan performnya ke tingkat tertinggi. Dan hal tersebut ternyata juga diterapkan pada mobil-mobil listrik mereka.\n\nSeperti yang telah ditunjukkan pada Munich Motor Show 2 bulan lalu, Mercedes akhirnya secara resmi merilis versi performa dari mobil listrik flagship-nya, yaitu AMG EQS 53. Seperti namanya, mobil ini mengambil basis sedan elektrik mewah milik Mercedes dan memperilahkan tim AMG mereka untuk membuatnya lebih gahar. \n\nMercedes membagi AMG elektrik ini menjadi 2 tipe yaitu Night Edition dan Touring Edition. Night Edition Lebih berfokus kepada tampilan yang lebih sporty dan performa yang lebih tinggi. Sedangkan Touring Edition lebih fokus ke kemewahan dan kenyamanan.\n\nUntuk harga, Mercedes-Benz membukanya mulai dari £154,995 atau sekitar Rp 2,94 miliar. Lebih mahal hampir 1,5 lipat dari harga EQS standar yang berada di harga £99,995 atau sekitar Rp1,9 miliar.\n\nJangan lupa follow kita di @momotrik.id untuk mendapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif #mobilkonsep #mercedesamg #amg #eqsamg #mercedesbenzindonesia',
                  },
                },
              ],
            },
            shortcode: 'CX7iCAutLX1',
            edge_media_to_comment: {
              count: 1,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [
                {
                  node: {
                    id: '17972621164471121',
                    text: 'Send pic DM 💯 @united.motorized',
                    created_at: 1640488063,
                    did_report_as_spam: false,
                    owner: {
                      id: '50333259935',
                      is_verified: false,
                      profile_pic_url:
                        'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-19/269785117_896822751005483_401058567047714521_n.jpg?stp=dst-jpg_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=vG8RUBuB3w8AX-A1ByN&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9EHhZR4SfopuwtR8N7chrAfMFPrlWNkcw8nGrtyeD85w&oe=61E6BC49&_nc_sid=86f79a',
                      username: 'jacky_kbc',
                    },
                    viewer_has_liked: false,
                  },
                },
              ],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1640487606,
            edge_media_preview_like: {
              count: 10,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-hlHVS5lW8nKcaQuUNJHDuWXthDllaFvkrmNaI7b4t-A&oe=61E59F7E&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8BnBO_XptKgBaY3SQAhQpWxkEkkWMT_bwMZNfMgl7fcw&oe=61E59F7E&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT81BvyKxaotkjrqy2rptL007y5xW3S6gYrxSNVL7BZioQ&oe=61E59F7E&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8K6pBs7A9Jl7wfsywmsNtMjlyZkOZ3bo9Gv2yQkL6SFw&oe=61E59F7E&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT84bzA4VpCDyuXwbK7aNMUqwI6PEIcCkoBtoyp0o79ChQ&oe=61E59F7E&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-hlHVS5lW8nKcaQuUNJHDuWXthDllaFvkrmNaI7b4t-A&oe=61E59F7E&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2736930862736560308',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-GdGtvABXa0Wb5NRCciww9ZjvgVSoSxBwdKWnEqZDfXA&oe=61E59F7E&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-hlHVS5lW8nKcaQuUNJHDuWXthDllaFvkrmNaI7b4t-A&oe=61E59F7E&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT80vdRquCzU_0T5D4s9Tm5jdMrpLZHubolKWRTouay14w&oe=61E59F7E&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269887005_235968958671037_5196582187679636746_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=1bDHd7XbxE0AX9IPTiQ&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-GdGtvABXa0Wb5NRCciww9ZjvgVSoSxBwdKWnEqZDfXA&oe=61E59F7E&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM2OTMwODYyNzM2NTYwMzA4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM2OTMwODYyNzM2NTYwMzA4fDUxMjAzNjAxODM0fDFmM2QxMzE1NDhlYzQwZmM2NmE0MGRlMWZiMTRiYzBkMDNlZDI0YzFkY2I1N2NhYzVjMDI0NDczNDJjOWRlYTEifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2736930862753182263',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270072689_119496540566793_3888929242395281756_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=v9j-Jflx8rwAX-FwZei&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9lu5IS-kk3PNdHFv6FhiXu6-wZPA-X0He7oF0dXzGkWg&oe=61E748A6&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270072689_119496540566793_3888929242395281756_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=v9j-Jflx8rwAX-FwZei&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-7OSQhJFw916kMnxN32xMcn7GtJp2YK-sZz6d48kC1cQ&oe=61E748A6&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270072689_119496540566793_3888929242395281756_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=v9j-Jflx8rwAX-FwZei&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9JURKBfQrLnKTFKhj4QD__YjjOgsHMBHzXBrHovndm-w&oe=61E748A6&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270072689_119496540566793_3888929242395281756_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=v9j-Jflx8rwAX-FwZei&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9lu5IS-kk3PNdHFv6FhiXu6-wZPA-X0He7oF0dXzGkWg&oe=61E748A6&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM2OTMwODYyNzUzMTgyMjYzIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM2OTMwODYyNzUzMTgyMjYzfDUxMjAzNjAxODM0fGUxMDZmMDhhY2Q4ZTEzNzg4ZGQ4ZTA4MDc5ODA5NjcxMjNhMmJiYjA1ZTFlZjVhNjVmOGM3MTU4ZTIxZDE4NjIifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2736930862761519515',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270001069_398986415343361_2730508252652978292_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=FY1Ej-KTCR4AX-pG9Qk&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8_tmgtd00hN_8Yh1M2Jzhh6assJPloEKS0xnRCaLQRRQ&oe=61E67546&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270001069_398986415343361_2730508252652978292_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=FY1Ej-KTCR4AX-pG9Qk&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8o8o_WjEJJKhX8olzSwhJx0btpR9yrhfdN1WPHBar1gA&oe=61E67546&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270001069_398986415343361_2730508252652978292_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=FY1Ej-KTCR4AX-pG9Qk&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9rDnumRr5oV2uBsAGFeCKmEeUe-SPmYZmL28xFubfC0Q&oe=61E67546&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/270001069_398986415343361_2730508252652978292_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=FY1Ej-KTCR4AX-pG9Qk&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8_tmgtd00hN_8Yh1M2Jzhh6assJPloEKS0xnRCaLQRRQ&oe=61E67546&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM2OTMwODYyNzYxNTE5NTE1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM2OTMwODYyNzYxNTE5NTE1fDUxMjAzNjAxODM0fDhlY2M1OWQzNGNkYWRjZjk3YjdlMmRiZDIyZjdiODc5OWE4Nzc2OTY1MmJhMDg2ZWFjNDJmNjMwMDdhMTAyMzIifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2736930862786704415',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269897398_4660618110701594_5847905182504709684_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=NIFrBpMK6YMAX9hzwJU&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_KagDMvsZrIJKJwYVz3IzweoAbFjn4gtv_H8dYErDK3w&oe=61E6EBF1&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269897398_4660618110701594_5847905182504709684_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=NIFrBpMK6YMAX9hzwJU&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_6aN1kk2bT8ZDlWVium-y1CCFglc33p7x-rVN7qgedow&oe=61E6EBF1&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269897398_4660618110701594_5847905182504709684_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=NIFrBpMK6YMAX9hzwJU&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-NpiFHqArRRCoyauJo-TuafIOKv4tDr0H5I7p27OFm9g&oe=61E6EBF1&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269897398_4660618110701594_5847905182504709684_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=NIFrBpMK6YMAX9hzwJU&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_KagDMvsZrIJKJwYVz3IzweoAbFjn4gtv_H8dYErDK3w&oe=61E6EBF1&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM2OTMwODYyNzg2NzA0NDE1Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM2OTMwODYyNzg2NzA0NDE1fDUxMjAzNjAxODM0fDVkZWY2YTlkM2Y5Y2Q4NDcxOTE3YWFiNGU4MTcxMGFlZTA3YWUyOGJlZjA0ZmM0MjJhNThjYTYyNmI3YWYwZWUifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2736930862770118470',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270097047_1082400539251546_6157553896600082766_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=T4GH-s5Ta64AX-bmPZS&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_kUaKu-puePJJZw7Gmv1dBusH8jcwOXRq4MtGdC96xCQ&oe=61E5B888&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270097047_1082400539251546_6157553896600082766_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=T4GH-s5Ta64AX-bmPZS&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_gh60V7rNYLt-QP8yWKrQuQigFCXxhlSvesK2Gnr-NWg&oe=61E5B888&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270097047_1082400539251546_6157553896600082766_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=T4GH-s5Ta64AX-bmPZS&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8EOKFkEHxsNkakM6feFUoVfC1wwaMRx8nTexLgsRrfGw&oe=61E5B888&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/270097047_1082400539251546_6157553896600082766_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=T4GH-s5Ta64AX-bmPZS&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_kUaKu-puePJJZw7Gmv1dBusH8jcwOXRq4MtGdC96xCQ&oe=61E5B888&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM2OTMwODYyNzcwMTE4NDcwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM2OTMwODYyNzcwMTE4NDcwfDUxMjAzNjAxODM0fDIyZjkzOTY1NjNkNDQxODg2OTI1ZWE3ZDQ5NzkwOTk0M2E1ZGMxMGM0MjVjMDMwNzYwMjFkZTNjZGVmZjIwZGMifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2736930862778479666',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269953647_207515671490009_944813741902913131_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=dpWTP6UFKNEAX8CFSwv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_VjS1hPCyFPM3FZ-TKwG4tGRmjSSBJk_NjDaRC55oF3w&oe=61E6E43F&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269953647_207515671490009_944813741902913131_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=dpWTP6UFKNEAX8CFSwv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT943lT46Cs3A-7uXuO06JiDs2BkAx7bnkbgmvWCMtjTPg&oe=61E6E43F&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269953647_207515671490009_944813741902913131_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=dpWTP6UFKNEAX8CFSwv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8nOjUKwW1T8oeSq3fYFmSMihELlqRyuSazdR56pq-zeg&oe=61E6E43F&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269953647_207515671490009_944813741902913131_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=dpWTP6UFKNEAX8CFSwv&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_VjS1hPCyFPM3FZ-TKwG4tGRmjSSBJk_NjDaRC55oF3w&oe=61E6E43F&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM2OTMwODYyNzc4NDc5NjY2Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM2OTMwODYyNzc4NDc5NjY2fDUxMjAzNjAxODM0fDYxZTdmOWNkNDM5YThkYTBkNWU1NjJhOTJkOWM3YTM5ZDBlYTkxZmYyYzdiNTM0NDFmZDg4MTYyN2EzNTVmNjUifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
        {
          node: {
            __typename: 'GraphVideo',
            id: '2736296662538328112',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269872500_422396329542575_5974619038498241790_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tM3qnETl9wQAX9J7IDR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-RfsbH0pevbwEFZoJdIwkPGX_Yc4pekj_1mJdov2cREw&oe=61E204B7&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269872500_422396329542575_5974619038498241790_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tM3qnETl9wQAX9J7IDR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_pkLs4hCkWGLJrGA6DMniWHaS8SIJI0rOyVX9DFMu6bA&oe=61E204B7&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269872500_422396329542575_5974619038498241790_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tM3qnETl9wQAX9J7IDR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8vFezR3L9SYwIUsHqw12tZsUuMbIYwo7J4-1lj9MY52g&oe=61E204B7&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269872500_422396329542575_5974619038498241790_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tM3qnETl9wQAX9J7IDR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-RfsbH0pevbwEFZoJdIwkPGX_Yc4pekj_1mJdov2cREw&oe=61E204B7&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: true,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM2Mjk2NjYyNTM4MzI4MTEyIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyN3wyNzM2Mjk2NjYyNTM4MzI4MTEyfDUxMjAzNjAxODM0fDI1ZWRjNGNiOWVjODA1OTA4YzM4YzNlNWNiOWZlNzg2ZDY4NjQzZDMwNDA4YmI4NWYzNzIzNjZjNWYyOGE4MWMifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            dash_info: {
              is_dash_eligible: true,
              video_dash_manifest:
                '<MPD xmlns="urn:mpeg:dash:schema:mpd:2011" minBufferTime="PT1.500S" type="static" mediaPresentationDuration="PT0H0M57.300S" maxSegmentDuration="PT0H0M5.000S" profiles="urn:mpeg:dash:profile:isoff-on-demand:2011,http://dashif.org/guidelines/dash264">\n <Period duration="PT0H0M57.300S">\n  <AdaptationSet segmentAlignment="true" maxWidth="426" maxHeight="426" maxFrameRate="30" par="1:1" lang="und" subsegmentAlignment="true" subsegmentStartsWithSAP="1">\n   <Representation id="17916303995306874vd" mimeType="video/mp4" codecs="avc1.4D401F" width="426" height="426" frameRate="30" sar="1:1" startWithSAP="1" bandwidth="434364" FBQualityClass="sd" FBQualityLabel="426w" FBPlaybackResolutionMos="0:100.00,360:93.58,426:88.30">\n    <BaseURL urlExpiration="1642192983">https://scontent-lax3-2.cdninstagram.com/v/t50.2886-16/269987418_657224341968205_4208353318994251903_n.mp4?cb=9ad74b5e-7e291d1f&amp;_nc_ht=scontent-lax3-2.cdninstagram.com&amp;_nc_cat=101&amp;_nc_ohc=ddWrJPOCaiEAX-URkQf&amp;tn=Y1H3VNz_0fA0ctK1&amp;edm=APU89FABAAAA&amp;ccb=7-4&amp;oh=00_AT8qwa5XcvaqFh7MTwybtTRkoaA2L6o-N6XuT9dOUagDMg&amp;oe=61E1E057&amp;_nc_sid=86f79a</BaseURL>\n    <SegmentBase indexRangeExact="true" indexRange="911-1098" FBFirstSegmentRange="1099-101291" FBSecondSegmentRange="101292-220801" FBPrefetchSegmentRange="1099-220801">\n      <Initialization range="0-910"/>\n    </SegmentBase>\n   </Representation>\n  <Representation id="17909759636164727v" mimeType="video/mp4" codecs="avc1.4D401F" width="426" height="426" frameRate="30" sar="1:1" startWithSAP="1" bandwidth="211778" FBQualityClass="sd" FBQualityLabel="426w" FBPlaybackResolutionMos="0:100.00,360:80.31,426:72.72">\n    <BaseURL urlExpiration="1642177566">https://scontent-lax3-1.cdninstagram.com/v/t50.2886-16/269973493_309277194434372_4803172471747452013_n.mp4?cb=9ad74b5e-7e291d1f&amp;_nc_ht=scontent-lax3-1.cdninstagram.com&amp;_nc_cat=108&amp;_nc_ohc=msMAiKMPMQcAX_6XsTw&amp;edm=APU89FABAAAA&amp;ccb=7-4&amp;oh=00_AT-ualhEIWD5m0kqgE-4a_-PjwP8IJzXB29hdDJBF-LxtQ&amp;oe=61E1A41E&amp;_nc_sid=86f79a</BaseURL>\n    <SegmentBase indexRangeExact="true" indexRange="911-1098" FBFirstSegmentRange="1099-46460" FBSecondSegmentRange="46461-108876" FBPrefetchSegmentRange="1099-108876">\n      <Initialization range="0-910"/>\n    </SegmentBase>\n   </Representation>\n  </AdaptationSet>\n <AdaptationSet segmentAlignment="true" lang="und" subsegmentAlignment="true" subsegmentStartsWithSAP="1">\n   <Representation id="17894515976406037ad" mimeType="audio/mp4" codecs="mp4a.40.5" audioSamplingRate="48000" startWithSAP="1" bandwidth="86012">\n    <AudioChannelConfiguration schemeIdUri="urn:mpeg:dash:23003:3:audio_channel_configuration:2011" value="2"/>\n    <BaseURL urlExpiration="1642201498">https://scontent-lax3-2.cdninstagram.com/v/t50.2886-16/270131317_647263042950075_2058352276853331309_n.mp4?cb=9ad74b5e-7e291d1f&amp;_nc_ht=scontent-lax3-2.cdninstagram.com&amp;_nc_cat=103&amp;_nc_ohc=zdD0Uwyh7MYAX9UpM9U&amp;edm=APU89FABAAAA&amp;ccb=7-4&amp;oh=00_AT9nigzz1PPcO_cEimlWxCWYsBvqo47j2jyHB_9LFjkfmw&amp;oe=61E2019A&amp;_nc_sid=86f79a</BaseURL>\n    <SegmentBase indexRangeExact="true" indexRange="868-1247" FBFirstSegmentRange="1248-21705" FBSecondSegmentRange="21706-44700" FBPrefetchSegmentRange="1248-44700">\n      <Initialization range="0-867"/>\n    </SegmentBase>\n   </Representation>\n  </AdaptationSet>\n </Period>\n</MPD>',
              number_of_qualities: 2,
            },
            video_url:
              'https://scontent-lax3-1.cdninstagram.com/v/t50.2886-16/269973493_309277194434372_4803172471747452013_n.mp4?cb=9ad74b5e-7e291d1f&efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjQyNi5mZWVkLmRlZmF1bHQiLCJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSJ9&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=108&_nc_ohc=msMAiKMPMQcAX_6XsTw&edm=APU89FABAAAA&vs=17909759636164727_2344720966&_nc_vs=HBksFQAYJEdQVjNGeEJFdDA4MVNSa0JBRzBjY1MzcVM2aENia1lMQUFBRhUAAsgBABUAGCRHSFhnR1JDN1U4Q3Jya3dDQUcyVmRYeDl2SkFjYmtZTEFBQUYVAgLIAQAoABgAGwGIB3VzZV9vaWwBMBUAACbM%2FbHl7drWPxUCKAJDMywXQEymZmZmZmYYEmRhc2hfYmFzZWxpbmVfMl92MREAdeoHAA%3D%3D&ccb=7-4&oe=61E1A41E&oh=00_AT-v2i2BLGw_uu1tCgMeLLKJxUrTJLg-cQ6Wb-EFxOZQ3A&_nc_sid=86f79a',
            video_view_count: 108,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Sepertinya bakal asik untuk diajak off-road ringan\n\nJangan lupa follow kita di @momotrik.id untuk mendapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif #mobilkonsep #citroen #citroenindonesia',
                  },
                },
              ],
            },
            shortcode: 'CX5R1Eqrxgw',
            edge_media_to_comment: {
              count: 1,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [
                {
                  node: {
                    id: '17904239699283352',
                    text: 'melihat berbagai macam kendaraan listrik di sini, ternyata mereka  sudah jauh di depan ya. Mungkin  10 tahun lalu ide dan pikiran nya berbarengan dengan @ricky_elson',
                    created_at: 1640515122,
                    did_report_as_spam: false,
                    owner: {
                      id: '5835682419',
                      is_verified: false,
                      profile_pic_url:
                        'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-19/158425576_130293679015138_2744182430563275982_n.jpg?stp=dst-jpg_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=ClYSZSWovBUAX9ERFHj&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9UduXX3BERRTW6GnAgynxPFhzcihwNlqHXPMzk63pG8A&oe=61E73AA2&_nc_sid=86f79a',
                      username: 'bagariusoutdoor',
                    },
                    viewer_has_liked: false,
                  },
                },
              ],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1640412015,
            edge_media_preview_like: {
              count: 7,
              edges: [],
            },
            gating_info: null,
            media_preview:
              'ACoqXzQQX4J7556d/wDEVEZQhJJwOcdfocfjVhrUoCeMDJJJ/wAf/rVRfEjkAFiAMe2c5PfPWk5Pls9kQoJPmW477QON5ZyemABx/n6Uwyp0UMT6Ecf5Penz2+xQwJOB6fj2qnuzwc/l/wDXpehZcMqDhlC/RQaQpCedx59qlhgjlG45J9D/APWqzshHGB+R/wAKLeYi3NIhQgelZsfmIm3Zktn6jPAz7nI4NUDOuAd/JxkY6ZxnnParJvFyDvXJILHae3zA9e5AyAB1NDipaMq4zypFIJBIfIPIx36nOBjGc9OPamiCWVzuBBOcdMkgdhn05yOKX7Qu3aXUrjGMcYOc9x1z7HIGMYORbsEAFgoGQMZ4GNowN3YAY6nnOeDVCJ9P3Kx3ggAfzwR/jWx5i1gPcKzFy4ycfdHXAAzjPH+T6VTN6wOB0pDGRTKi4Oc59P8A6/8ASpBcoOOfy7f99VQqVelMRfEiOPvAe5wD+ILVH9pTkHJznt/Xd3NVaKdhXLYuUIIyR152/wD2XbtWdRRSGf/Z',
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269872500_422396329542575_5974619038498241790_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tM3qnETl9wQAX9J7IDR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_pkLs4hCkWGLJrGA6DMniWHaS8SIJI0rOyVX9DFMu6bA&oe=61E204B7&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269872500_422396329542575_5974619038498241790_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tM3qnETl9wQAX9J7IDR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_C2hCMCtcs2qDharXU4DPaUKy_UW_YPz--Z-J-6Kqgkw&oe=61E204B7&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269872500_422396329542575_5974619038498241790_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tM3qnETl9wQAX9J7IDR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8O2x5AosBI72XNACn34F5T-vS03j6fk51i2GMCqU5Fbw&oe=61E204B7&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269872500_422396329542575_5974619038498241790_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tM3qnETl9wQAX9J7IDR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT82PuWhRPKnbk_lLJkCW49RCFEzWPVHwBKojUbKLrR1HQ&oe=61E204B7&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269872500_422396329542575_5974619038498241790_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tM3qnETl9wQAX9J7IDR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8dTZXM8MdtujXBPEzMd0UT-fPa6O8IAPnYboE01XglxQ&oe=61E204B7&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269872500_422396329542575_5974619038498241790_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tM3qnETl9wQAX9J7IDR&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_pkLs4hCkWGLJrGA6DMniWHaS8SIJI0rOyVX9DFMu6bA&oe=61E204B7&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
          },
        },
        {
          node: {
            __typename: 'GraphSidecar',
            id: '2735481328378015601',
            dimensions: {
              height: 1080,
              width: 1080,
            },
            display_url:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8QKQckRc2YS-sj9Fn3G-Fre3IC05FdVvaWFMw3jC0JKw&oe=61E6EFD7&_nc_sid=86f79a',
            display_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_ndMEumcZhTJiCFgJ6J88B_LQdl-Uk0YmztNwCnBv-pw&oe=61E6EFD7&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8GQDvIuHCiZKeqJlya37xxOivr2vjraDkW1BrtKLQYyQ&oe=61E6EFD7&_nc_sid=86f79a',
                config_width: 750,
                config_height: 750,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8QKQckRc2YS-sj9Fn3G-Fre3IC05FdVvaWFMw3jC0JKw&oe=61E6EFD7&_nc_sid=86f79a',
                config_width: 1080,
                config_height: 1080,
              },
            ],
            is_video: false,
            should_log_client_event: false,
            tracking_token:
              'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM1NDgxMzI4Mzc4MDE1NjAxIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDcyN3wyNzM1NDgxMzI4Mzc4MDE1NjAxfDUxMjAzNjAxODM0fGJkMzFiMzg5YTk5ZWQ3ZmRkYzg4Y2I5Y2VlNzZlMThlMjcwMGM5NDA2ZGRkNzU4ODFhMmRmOWM3YWM0ZWRmYjgifSwic2lnbmF0dXJlIjoiIn0=',
            edge_media_to_tagged_user: {
              edges: [],
            },
            accessibility_caption: null,
            edge_media_to_caption: {
              edges: [
                {
                  node: {
                    text: 'Dibalik kesuksesannya di dunia gadget, Apple hingga sekarang masih bergelut untuk dapat merealisasikan mobil listrik milik mereka. Info terakhir yang kita dapatkan dari perusahaan berlogo Apel ini adalah mereka memutuskan untuk mengembangkan mobil listriknya secara mandiri setelah semua perusahan mobil tidak ada yang setuju untuk berkolaborasi dengan mereka.\n\nApple sendiri juga masih belum membeberkan detail apapun dari mobil listriknya tersebut kecuali fakta mereka telah melakukan beberapa kali uji jalan untuk teknologi otonomus mereka. Namun dari beberapa paten yang telah didaftarkan oleh Apple, sebuah render spekulasi tentang bagaimana desain dari Apple Car ini akhirnya mengemuka.\n\nRender digital ini dibuat perusahaan leasing asal Inggris, Vanarama yang menyebut bahwa mereka mengambil inspirasi dari paten dan juga produk-produk Apple yang sudah ada sekarang. Bahkan, beberapa fitur yang ada di dalam gambar render ini didasarkan langsung pada paten milik Apple.\n\nSalah satunya adalah paten konstruksi tanpa pilar antara pintu depan dan belakang yang disebut merupakan ide milik Apple yang ingin mereka terapkan di mobil listriknya. Mobilnya juga memiliki 4 tempat duduk yang dapat diputar ke berbagai arah sesuai keinginan. Dan yang paling utama adalah integrasi asisten virtual milik Apple, Siri ke dalam roda kemudi dari mobil ini.\n\nJangan lupa follow kita di @momotrik.id untuk medapatkan informasi menarik lainnya seputar mobil dan motor listrik!!\n•\n•\n•\n#infomomotrik #momotrik #mobil #mobillistrik #motorlistrik #beritamobillistrik #spklu #SPBKLU #electriccar #teknologi #otomotif #tesla #duniaotomotif #beritaotomotif #beritamobil #infomobil #infootomotif #tipsotomotif #apple #appleindonesia #applecar',
                  },
                },
              ],
            },
            shortcode: 'CX2YcZjr29x',
            edge_media_to_comment: {
              count: 0,
              page_info: {
                has_next_page: false,
                end_cursor: null,
              },
              edges: [],
            },
            edge_media_to_sponsor_user: {
              edges: [],
            },
            comments_disabled: false,
            taken_at_timestamp: 1640314807,
            edge_media_preview_like: {
              count: 10,
              edges: [],
            },
            gating_info: null,
            media_preview: null,
            owner: {
              id: '44778586320',
              username: 'momotrik.id',
            },
            location: null,
            viewer_has_liked: false,
            viewer_has_saved: false,
            viewer_has_saved_to_collection: false,
            viewer_in_photo_of_you: false,
            viewer_can_reshare: true,
            thumbnail_src:
              'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_ndMEumcZhTJiCFgJ6J88B_LQdl-Uk0YmztNwCnBv-pw&oe=61E6EFD7&_nc_sid=86f79a',
            thumbnail_resources: [
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e15_s150x150&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_7W6heW3zjLlvWkK6mKq56QrhZlC45FVctMibEE-5X0A&oe=61E6EFD7&_nc_sid=86f79a',
                config_width: 150,
                config_height: 150,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e15_s240x240&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8zYc3kGCtHWe_lrdiQFbBAZBmKP5t10anFK0NA3BfGYQ&oe=61E6EFD7&_nc_sid=86f79a',
                config_width: 240,
                config_height: 240,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e15_s320x320&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9Y5lSXGWBxuUQJhQrwHVonh6imDI2qy92rhb9EpVI88w&oe=61E6EFD7&_nc_sid=86f79a',
                config_width: 320,
                config_height: 320,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e15_s480x480&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-i-mOyMBVS7BdnOCsPhrA6qpbUdrOvwxF9JdL0SmL68Q&oe=61E6EFD7&_nc_sid=86f79a',
                config_width: 480,
                config_height: 480,
              },
              {
                src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_ndMEumcZhTJiCFgJ6J88B_LQdl-Uk0YmztNwCnBv-pw&oe=61E6EFD7&_nc_sid=86f79a',
                config_width: 640,
                config_height: 640,
              },
            ],
            edge_sidecar_to_children: {
              edges: [
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2735481320350029437',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8QKQckRc2YS-sj9Fn3G-Fre3IC05FdVvaWFMw3jC0JKw&oe=61E6EFD7&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_ndMEumcZhTJiCFgJ6J88B_LQdl-Uk0YmztNwCnBv-pw&oe=61E6EFD7&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8GQDvIuHCiZKeqJlya37xxOivr2vjraDkW1BrtKLQYyQ&oe=61E6EFD7&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269959329_588609915579493_1667929871493869024_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=101&_nc_ohc=EZaz_K5sAAgAX_TU_B9&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8QKQckRc2YS-sj9Fn3G-Fre3IC05FdVvaWFMw3jC0JKw&oe=61E6EFD7&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM1NDgxMzIwMzUwMDI5NDM3Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM1NDgxMzIwMzUwMDI5NDM3fDUxMjAzNjAxODM0fDY0NjZmMDhhYmFlM2FmNGQyNmIzNDQxZGIxM2RiNzY3ZTc1ZDNlMjNhZmEyM2EyMjgzZDkzMjliN2ZkZGVmZTAifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2735481320341622596',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269793677_4815596051833470_4778766669659420073_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=MjXm8wFrMM4AX_1Y36G&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-SAWAEgpiFz3RvtHACbALFyViUK7ceQss6fF9Pg2mG-g&oe=61E5AD34&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269793677_4815596051833470_4778766669659420073_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=MjXm8wFrMM4AX_1Y36G&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8X1bwMFI7vN-D9xiKIh9RRUkwnL8XBZx2dfSvj7xukSQ&oe=61E5AD34&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269793677_4815596051833470_4778766669659420073_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=MjXm8wFrMM4AX_1Y36G&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-RYiOaoH-kSaeRjH_MZGhhCcfmyTkTIpaZO2gD6tfV5g&oe=61E5AD34&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-2.cdninstagram.com/v/t51.2885-15/269793677_4815596051833470_4778766669659420073_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_cat=106&_nc_ohc=MjXm8wFrMM4AX_1Y36G&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-SAWAEgpiFz3RvtHACbALFyViUK7ceQss6fF9Pg2mG-g&oe=61E5AD34&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM1NDgxMzIwMzQxNjIyNTk2Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM1NDgxMzIwMzQxNjIyNTk2fDUxMjAzNjAxODM0fGQ3MjNhZjNjYmQ5ZWI4ZTVjMTY2ZmU3ZTRjMWZhNGY0YThiYTZlZmJiZDBjZjBlYjZjNTY5ZmVmOGMwMzEyZWQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2735481320316594934',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269785732_298872568849804_3866325968515678352_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=ir_ttyS8lYEAX-5nwuM&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_bDxsu1eekDtQcJTX7dX-ZYxOx8sJ--NKJO3zAgA0hbw&oe=61E5FB44&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269785732_298872568849804_3866325968515678352_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=ir_ttyS8lYEAX-5nwuM&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-aBZugvnwTzBMfA36nP_S40pdHGPsI3zx3_XwIRSFgXw&oe=61E5FB44&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269785732_298872568849804_3866325968515678352_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=ir_ttyS8lYEAX-5nwuM&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-QWDwSIpwNyuD_IEbyFgPjHOiUOSO2Da99kobGi31paA&oe=61E5FB44&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269785732_298872568849804_3866325968515678352_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=ir_ttyS8lYEAX-5nwuM&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_bDxsu1eekDtQcJTX7dX-ZYxOx8sJ--NKJO3zAgA0hbw&oe=61E5FB44&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM1NDgxMzIwMzE2NTk0OTM0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM1NDgxMzIwMzE2NTk0OTM0fDUxMjAzNjAxODM0fDhhNmE3YWJjYjI0Y2QxNzE4ZDlhODE2NGY4MzlmMzNjNGQ1ZDE5ZWRjYjA0N2QwMjhiZjIzNTczNjgzYzQ3ZTQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2735481320366851830',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269810060_455274299557198_8546654152942036717_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=nSn-YW2fMwYAX-EueK5&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9GG7_8Jy6FWhqFfELqWx6B2dPYqGa6I-th4oxcX3vrmw&oe=61E5C574&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269810060_455274299557198_8546654152942036717_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=nSn-YW2fMwYAX-EueK5&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_DrjGFNfoBzFUeWQ1T1rXUI8wioSSAd9FT-xPNRO2r3g&oe=61E5C574&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269810060_455274299557198_8546654152942036717_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=nSn-YW2fMwYAX-EueK5&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_b8c8LfqWR9E8sq8OIG3kxwTORXAgcD5b9gvseHx3dPw&oe=61E5C574&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269810060_455274299557198_8546654152942036717_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=nSn-YW2fMwYAX-EueK5&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9GG7_8Jy6FWhqFfELqWx6B2dPYqGa6I-th4oxcX3vrmw&oe=61E5C574&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM1NDgxMzIwMzY2ODUxODMwIiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM1NDgxMzIwMzY2ODUxODMwfDUxMjAzNjAxODM0fDdhMDNmNjkyYzU0YmExOWMxNjNmOTA2NjIzNmU3OGE1YjM4NDliNWFiOTJkMjM0YTNkOWVhYTQyNzExNjc2ZGQifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2735481320643528304',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269951511_1303733986803106_9138604807979826262_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=KEZ9pEnZe10AX9sXbpW&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-GMEzvAI-5nGnZ50OpCC7SzjPvxILmauJutwqmNDOEXw&oe=61E6D993&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269951511_1303733986803106_9138604807979826262_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=KEZ9pEnZe10AX9sXbpW&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_DvA6H111gqsFc5DlPg9G4FDmH2kXF6eTAq7y4ZqqwPA&oe=61E6D993&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269951511_1303733986803106_9138604807979826262_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=KEZ9pEnZe10AX9sXbpW&edm=APU89FABAAAA&ccb=7-4&oh=00_AT8uS5wBPfPztnhoTvrBjcBW7az198HRLpw1YZphkhDQQA&oe=61E6D993&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269951511_1303733986803106_9138604807979826262_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=KEZ9pEnZe10AX9sXbpW&edm=APU89FABAAAA&ccb=7-4&oh=00_AT-GMEzvAI-5nGnZ50OpCC7SzjPvxILmauJutwqmNDOEXw&oe=61E6D993&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM1NDgxMzIwNjQzNTI4MzA0Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM1NDgxMzIwNjQzNTI4MzA0fDUxMjAzNjAxODM0fDI2ZjUwYjI5NmEzNzJmNGQ3YzdhMTE5ZDFiZGI5YzEwMjM2YzA1ZjRmNTdiMTJlYmFlYjllNDEzYjMxNGE1M2EifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
                {
                  node: {
                    __typename: 'GraphImage',
                    id: '2735481320358304388',
                    dimensions: {
                      height: 1080,
                      width: 1080,
                    },
                    display_url:
                      'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269832999_1578008995891130_962938443621332566_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=Pel53f3NUBQAX9V-H09&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_kvDblbfDwp0tPQfZbANILcdC3M5zYN1CRl7O1rfMLzg&oe=61E6BBFD&_nc_sid=86f79a',
                    display_resources: [
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269832999_1578008995891130_962938443621332566_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=Pel53f3NUBQAX9V-H09&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9Twi1j9uZ6EOK0Ar6jLTeCdkHHMXQ1z7OEHf2pr0KXsg&oe=61E6BBFD&_nc_sid=86f79a',
                        config_width: 640,
                        config_height: 640,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269832999_1578008995891130_962938443621332566_n.jpg?stp=dst-jpg_e35_s750x750_sh0.08&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=Pel53f3NUBQAX9V-H09&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT9pPbb4LHBC_dOLold13egF40vyrKbtIy9PercKQC4fbw&oe=61E6BBFD&_nc_sid=86f79a',
                        config_width: 750,
                        config_height: 750,
                      },
                      {
                        src: 'https://scontent-lax3-1.cdninstagram.com/v/t51.2885-15/269832999_1578008995891130_962938443621332566_n.jpg?stp=dst-jpg_e15_fr_s1080x1080&cb=9ad74b5e-7e291d1f&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=Pel53f3NUBQAX9V-H09&tn=Y1H3VNz_0fA0ctK1&edm=APU89FABAAAA&ccb=7-4&oh=00_AT_kvDblbfDwp0tPQfZbANILcdC3M5zYN1CRl7O1rfMLzg&oe=61E6BBFD&_nc_sid=86f79a',
                        config_width: 1080,
                        config_height: 1080,
                      },
                    ],
                    is_video: false,
                    should_log_client_event: false,
                    tracking_token:
                      'eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiYzQyNTk1NWJjNjBkNGQ0NGE3MmI3NTgyNzU5OTBhY2EyNzM1NDgxMzIwMzU4MzA0Mzg4Iiwic2VydmVyX3Rva2VuIjoiMTY0MjAzNzUxMDgxNXwyNzM1NDgxMzIwMzU4MzA0Mzg4fDUxMjAzNjAxODM0fDI5ZTQ4ZTc2NGUwYjAyMmQzM2Y0ZDY5NTQwYWI1MGU3ODllODI0ZjhhYzUzMjBjZDM5ZDFkMTE2NDAwYzliMmIifSwic2lnbmF0dXJlIjoiIn0=',
                    edge_media_to_tagged_user: {
                      edges: [],
                    },
                    accessibility_caption: null,
                  },
                },
              ],
            },
          },
        },
      ],
    },
  }
}

export default IndexPage

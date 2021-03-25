import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type { GetSinglePostResponse } from 'interfaces/lib/getSinglePost.interface'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Layout = dynamic(() => import('components/Layout'))
const Article = dynamic(() => import('domain/article/Article'))

import { stripHtmlTags } from 'utils/stripHtmlTags'
import { getSinglePostFetcher } from 'lib/useGetSinglePost'
import { getAllPostSlugsFetcher } from 'lib/useGetAllPostSlugs'

type Props = {
  postData: GetSinglePostResponse
}

const ArticlePage: NextPage<Props> = ({ postData }) => {
  const router = useRouter()

  // What's happening here, is that we're looking at the isFallback property
  // to determine if this page being rendered is a fallback version
  // and if it's not, but we also don't have a slug,
  // then this means we won't be able to render a page for this route.

  // Instead of showing a horrible error page,
  // we're going to return a simple paragraph with an error message in.
  if (!router.isFallback && !postData?.post.slug) {
    return <div>Looks like an error. Please reload...</div>
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  // Read more here: https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  if (router.isFallback) {
    return <div>Article is currently generated. Please wait...</div>
  }

  if (postData) {
    const { post } = postData
    return (
      <Layout
        article
        screen="md"
        title={`${post.title} | Momotrik`}
        description={stripHtmlTags(post.excerpt)}
        previewImageUrl={post.featuredImage.node.mediaItemUrl}
        slug={post.slug}
      >
        <Article postData={postData} />
      </Layout>
    )
  }

  return <p>Getting data...</p>
}

/**
 * In Next.js if we want to statically generate a page with dynamic route (e.g [slug].tsx)
 * The best result based on performance is using the built-in getStaticPaths and getStaticProps
 * without intervention from other data fetching library like React Query. (tested and compared)
 * 
 * So in this dynamic page, we use pure Next.js approach.
 * Without even worry about caching and data management (because it's basically static, duh!),
 * like we use in other non-dynamic-route page with React Query dehydratedState.
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostSlugsFetcher()

  const paths = allPosts.posts.edges.map(({ node }) => ({
    params: { slug: node.slug }
  }))

  console.log(paths)

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await getSinglePostFetcher(params?.slug)

  return {
    props: {
      postData: res,
      slug: params?.slug
    },
    revalidate: 1
  }
}

export default ArticlePage


import type { NextPage, GetStaticProps } from 'next'

import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import sanitizeHtml from 'sanitize-html'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const Layout = dynamic(() => import('components/Layout'))
import { getAllPostsFetcher, useGetAllPosts } from 'lib/useGetAllPosts'

const IndexPage: NextPage = () => {
  const { getAllPostsData } = useGetAllPosts()

  return (
    <Layout title="Momotrik | Motor, Mobil, Listrik">
      <h1 className="text-2xl font-bold tracking-wide mb-8">Posts</h1>
      {getAllPostsData.isFetching ? (
        <h1 className="font-semibold mb-4">Fetching data...</h1>
      ) : null}
      {getAllPostsData.isError ? (
        <h1 className="font-semibold mb-4">Error, gan!</h1>
      ) : null}

      {getAllPostsData.data?.posts.edges.map(({ node }) => (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6 max-w-2xl mx-auto" key={node.id}>
          <h1 className="text-3xl font-bold text-indigo-600 tracking-wide mb-4">{node.title}</h1>
          <div className="text-sm tracking-normal mb-4" dangerouslySetInnerHTML={{ __html: sanitizeHtml(node.excerpt) }} />
          <p className="text-sm font-semibold tracking-wide mb-4">{node.date}</p>
          <Link href={`/article/${encodeURIComponent(node.slug)}`}>
            <a className="text-base font-semibold text-indigo-800 cursor-pointer">Read more</a>
          </Link>
        </div>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', () => getAllPostsFetcher())

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}


export default IndexPage

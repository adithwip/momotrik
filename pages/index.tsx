import type { GetStaticProps } from 'next'
import type { GetAllPostsResponse } from '../interfaces/lib/getAllPosts.interface'

import * as React from 'react'
import { NextPage } from 'next'
import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import sanitizeHtml from 'sanitize-html'

import Layout from '../components/Layout'
import { getAllPostsFetcher, useGetAllPosts } from '../lib/useGetAllPosts'

interface Props {
  allPosts: GetAllPostsResponse
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

const IndexPage: NextPage<Props> = () => {
  const { getAllPostsData } = useGetAllPosts()

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1 className="text-2xl font-bold tracking-wide mb-8">Posts</h1>
      {getAllPostsData.isFetching ? (
        <h1 className="font-semibold mb-4">Fetching data...</h1>
      ) : null}
      {getAllPostsData.isError ? (
        <h1 className="font-semibold mb-4">Error, gan!</h1>
      ) : null}

      {getAllPostsData.data?.posts.edges.map(({ node }, index) => (
        <div className="bg-white shadow-lg rounded p-4 mb-4" key={index}>
          <h1 className="text-xl font-bold text-indigo-600 tracking-wide mb-4">{node.title}</h1>
          <div className="text-sm tracking-normal mb-4" dangerouslySetInnerHTML={{ __html: sanitizeHtml(node.excerpt) }} />
          <p className="text-sm font-semibold tracking-wide mb-4">{node.date}</p>
        </div>
      ))}
    </Layout>
  )
}

export default IndexPage

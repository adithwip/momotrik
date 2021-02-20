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
      <h1>Posts</h1>
      {getAllPostsData.isFetching ? (
        <h1>Fetching data...</h1>
      ) : null}
      {getAllPostsData.isError ? (
        <h1>Error, gan!</h1>
      ) : null}

      {getAllPostsData.data?.posts.edges.map(({ node }, index) => (
        <React.Fragment key={index}>
          <h1>{node.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(node.excerpt) }} />
          <p>{node.date}</p>
        </React.Fragment>
      ))}
    </Layout>
  )
}

export default IndexPage

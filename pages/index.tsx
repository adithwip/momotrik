import type { GetStaticProps } from 'next'
import type { GetAllPostsResponse } from '../interfaces/lib/getAllPosts.interface'

import * as React from 'react'
import { NextPage } from 'next'
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";

import Layout from '../components/Layout'
import { getAllPosts } from '../lib/getAllPosts'
interface Props {
  allPosts: GetAllPostsResponse
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', () => getAllPosts())
  // const allPosts = await getAllPosts()

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

const IndexPage: NextPage<Props> = () => {
  // const { posts: { edges } } = allPosts
  const { data, isFetching, isError } = useQuery(
    'posts',
    () => getAllPosts()
  )

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Posts</h1>
      {isFetching ? (
        <h1>Fetching data...</h1>
      ) : null}
      {isError ? (
        <h1>Error, gan!</h1>
      ) : null}

      {data?.posts.edges.map(({ node }, index) => (
        <React.Fragment key={index}>
          <h1>{node.title}</h1>
          <p>{node.excerpt}</p>
          <p>{node.date}</p>
        </React.Fragment>
      ))}
    </Layout>
  )
}

export default IndexPage

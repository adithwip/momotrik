import type { GetStaticProps } from 'next'
import type { GetAllPostsResponse } from '../interfaces/lib/getAllPosts.interface'

import * as React from 'react'
import { NextPage } from 'next'

import Layout from '../components/Layout'
import { getAllPosts } from '../lib/getAllPosts'


interface Props {
  allPosts: GetAllPostsResponse
}

const IndexPage: NextPage<Props> = ({ allPosts }) => {
  const { posts: { edges } } = allPosts

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Posts</h1>
      {edges.map(({ node }, index) => (
        <React.Fragment key={index}>
          <h1>{node.title}</h1>
          <p>{node.excerpt}</p>
          <p>{node.date}</p>
        </React.Fragment>
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts()

  return {
    props: {
      allPosts
    }
  }
}

export default IndexPage

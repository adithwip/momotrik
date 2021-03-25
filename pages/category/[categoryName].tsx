import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import type { GetPostsByCategoryNameResponse } from 'interfaces/lib/getPostsByCategoryName.interface'

import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('components/Layout'))

import { getPostsByCategoryNameFetcher } from 'lib/useGetPostsByCategoryName'

interface Props {
  posts: GetPostsByCategoryNameResponse
}

const CategoryPage: NextPage<Props> = ({ posts }) => {

  console.log('posts ?? ', posts.posts.edges)

  return (
    <Layout
      title={`Category | Momotrik`}
      description="Artikel berdasarkan kategori pilihan."
    >
      <h1>Hello</h1>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  // Hardcoded for chosen category name we want to statically generated
  // At least for now...
  return {
    paths: [
      {
        params: {
          categoryName: 'mobil-listrik'
        }
      },
      {
        params: {
          categoryName: 'motor-listrik'
        }
      }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryName = params?.categoryName 

  const res = await getPostsByCategoryNameFetcher(categoryName)

  return {
    props: { posts: res },
    revalidate: 1
  }
}

export default CategoryPage
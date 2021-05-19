import type { NextPage, GetStaticProps } from 'next'

import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('components/Layout'))
const ArticlesGrid = dynamic(() => import('domain/common/ArticlesGrid'))
const GeneralFeedback = dynamic(() => import('components/GeneralFeedback'))

import { getAllPostsFetcher, useGetAllPosts } from 'lib/useGetAllPosts'

interface Props {
  count: number
}

const AllPostsPage: NextPage<Props> = ({ count }) => {
  const { getAllPostsData: {
    data,
    isFetching,
    isError
  } } = useGetAllPosts(count)

  const renderComponent = () => {
    if (isError || !data) {
      return (
        <GeneralFeedback
          message="Terjadi kesalahan, mohon memuat ulang."
        />
      )
    }

    return (
      <ArticlesGrid postData={data?.posts.edges} />
    )
  }

  return (
    <Layout
      title="Momotrik | Semua Artikel"
      description="Halaman yang menampilkan semua artikel yang ada di Momotrik"
      updating={isFetching}
    >
      {renderComponent()}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('posts', () => getAllPostsFetcher(200))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      count: 200
    }
  }
}

export default AllPostsPage
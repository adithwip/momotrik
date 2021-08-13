import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import type { GetPostsByCategoryNameResponse } from 'interfaces/lib/getPostsByCategoryName.interface'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Layout = dynamic(() => import('components/Layout'))
const ArticlesGrid = dynamic(() => import('domain/common/ArticlesGrid'))

import { getPostsByCategoryNameFetcher } from 'lib/useGetPostsByCategoryName'

interface Props {
  postData: GetPostsByCategoryNameResponse
}

const CategoryPage: NextPage<Props> = ({ postData }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Article is currently generated. Please wait...</div>
  }

  if (postData) {
    return (
      <Layout
        title={`${router.query.name} | Momotrik`}
        description="Artikel berdasarkan kategori pilihan."
      >
        <ArticlesGrid postData={postData.posts.edges} />
      </Layout>
    )
  }

  return <p>Getting data...</p>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { name: 'mobil-listrik' } },
      { params: { name: 'motor-listrik' } },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await getPostsByCategoryNameFetcher(params?.name)

  return {
    props: {
      postData: res,
    },
    revalidate: 1,
  }
}

export default CategoryPage

import type { NextPage } from 'next'

import { useRouter } from 'next/router'
import isEmpty from 'lodash.isempty'
import dynamic from 'next/dynamic'
import { isBrowser, isMobile } from 'react-device-detect'

const Layout = dynamic(() => import('components/Layout'))
const ArticlesGrid = dynamic(() => import('domain/common/ArticlesGrid'))
const SearchError = dynamic(() => import('domain/search/SearchError'))
const MobileSearch = dynamic(() => import('domain/search/MobileSearch'))

import { useGetPostsBySearch } from 'lib/useGetPostsBySearch'

const SearchPage: NextPage = () => {
  const { query } = useRouter()
  const { getPostsBySearchData: {
    data,
    isFetching,
    isError
  } } = useGetPostsBySearch(query.q)

  const renderComponent = () => {
    if (isEmpty(query) || isEmpty(query.q) || isError) {
      if (isBrowser) {
        return (
          // TODO
          <SearchError
            errorMessage="Silahkan cari artikel dengan keyword."
          />
        )
      }

      if (isMobile) {
        return (
          <MobileSearch />
        )
      }
    }

    if (isFetching) {
      return (
        // TODO
        <SearchError
          errorMessage="Sedang memuat artikel yang dicari..."
        />
      )
    }

    if (data) {
      if (isEmpty(data.posts.edges)) {
        return (
          <SearchError
            errorMessage="Oops, coba cari keyword lain."
          />
        )
      }

      return (
        <ArticlesGrid postData={data.posts.edges} />
      )
    }

  }


  return (
    <Layout
      title={`Search Article | ${query.q}`}
      description="Artikel berdasarkan search"
      updating={isFetching}
    >
      {renderComponent()}
    </Layout>
  )
}

export default SearchPage
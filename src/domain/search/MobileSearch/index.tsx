import { useState } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'

import styles from './MobileSearch.module.css'

const MobileSearch = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    router.push(`/search?q=${searchTerm}`)
  }

  return (
    <div className="h-screen w-full px-4 pb-4 pt-10 md:hidden">
      <form
        onSubmit={handleSearch}
        className="relative flex items-center justify-center"
      >
        <input
          required
          className={styles.search}
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari artikel..."
          aria-label="Search article in momotrik"
        />

        <button
          type="submit"
          className={styles.searchButton}
          aria-controls="search"
          aria-expanded="false"
        >
          <span className="sr-only">Search article in momotrik</span>
          <figure className={styles.searchWrapper}>
            <Image
              priority
              alt="Search Icon"
              src="/assets/icons/search_icon.svg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </figure>
        </button>
      </form>
    </div>
  )
}

export default MobileSearch

import { useState } from 'react'

import { useRouter } from 'next/router'

import styles from './MobileSearch.module.css'

const MobileSearch = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    router.push(`/search?q=${searchTerm}`)
  }

  return (
    <div className="w-full h-screen flex flex-col px-4 pb-4 pt-10">
      <form
        onSubmit={handleSearch}
        className="flex relative justify-center items-center"
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
      </form>
    </div>
  )
}

export default MobileSearch
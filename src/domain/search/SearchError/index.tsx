import Image from 'next/image'

interface Props {
  errorMessage: string
}

import styles from './SearchError.module.css'

const SearchError = ({ errorMessage }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">

      <div className={styles.illustrationWrapper}>
        <Image
          priority
          alt="Search error illustration"
          src="/assets/illustrations/search/waiting.svg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <p className="text-lg font-bold tracking-normal leading-normal">
        {errorMessage}
      </p>
    </div>
  )
}

export default SearchError
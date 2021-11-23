import Image from 'next/image'
import clsx from 'clsx'

interface Props {
  message: string
  isError?: boolean
}

import styles from './GeneralFeedback.module.css'

const GeneralFeedback = ({ message, isError = false }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <figure className={styles.illustrationWrapper}>
        <Image
          priority
          alt="Search error illustration"
          src="/assets/illustrations/search/waiting.svg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </figure>

      <p
        className={clsx(
          'text-lg font-semibold tracking-normal leading-normal',
          isError && 'text-red-600'
        )}
      >
        {message}
      </p>
    </div>
  )
}

export default GeneralFeedback

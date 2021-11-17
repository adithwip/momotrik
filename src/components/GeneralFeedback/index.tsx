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

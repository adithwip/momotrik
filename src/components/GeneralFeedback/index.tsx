import Image from 'next/image'
import classnames from 'classnames'

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
        className={classnames(
          'text-lg font-bold tracking-normal leading-normal',
          {
            'text-red-600': isError,
          }
        )}
      >
        {message}
      </p>
    </div>
  )
}

export default GeneralFeedback

import React from 'react'
import clsx from 'clsx'

import styles from './SocialMediaProfile.module.css'

const SocialMediaProfile = () => {
  return (
    <div className="mb-5 flex items-center justify-between gap-1">
      <a
        className={clsx(styles.button, styles.twitter)}
        href="https://twitter.com/momotrik"
        target="_blank"
        role="button"
        rel="noreferrer"
      >
        Twitter
      </a>
      <a
        className={clsx(styles.button, styles.instagram)}
        href="https://www.instagram.com/momotrik.id/"
        target="_blank"
        role="button"
        rel="noreferrer"
      >
        Instagram
      </a>
      <a
        className={clsx(styles.button, styles.facebook)}
        href="https://www.facebook.com/momotrik.ID"
        target="_blank"
        role="button"
        rel="noreferrer"
      >
        Facebook
      </a>
    </div>
  )
}

export default SocialMediaProfile

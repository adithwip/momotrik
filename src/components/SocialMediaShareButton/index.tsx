import clsx from 'clsx'

import FacebookIcon from './FacebookIcon'
import InstagramIcon from './InstagramIcon'

import styles from './SocialMediaShareButton.module.css'

type Props =
  | { facebook: boolean; instagram?: boolean }
  | { facebook?: boolean; instagram: boolean }

const SocialMediaShareButton = ({
  facebook = false,
  instagram = false,
}: Props) => {
  const handleFacebookShare = () => {
    const currentHref = window.location.href
    const fbSharerUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentHref}`

    window.open(fbSharerUrl, '_blank', 'noreferrer')
  }

  const handleInstagramRedirection = () => {
    window.open(
      'https://www.instagram.com/momotrik.id/',
      '_blank',
      'noreferrer'
    )
  }

  const handleClick = () => {
    if (facebook) {
      handleFacebookShare()
    } else if (instagram) {
      handleInstagramRedirection()
    } else {
      return
    }
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className={clsx(
        styles.button,
        facebook && styles.facebook,
        instagram && styles.instagram,
        'md:hover:scale-105 md:transition-all'
      )}
    >
      <span className="sr-only">Button for Facebook social sharing</span>
      {facebook && (
        <>
          <FacebookIcon />
          Bagikan artikel ke Facebook
        </>
      )}
      {instagram && (
        <>
          <InstagramIcon />
          Follow Momotrik di Instagram
        </>
      )}
    </button>
  )
}

export default SocialMediaShareButton

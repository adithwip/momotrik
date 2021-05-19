import styles from './SocialMediaShareButton.module.css'

const SocialMediaShareButton = () => {
  const handleFacebookShare = () => {
    const currentHref = window.location.href
    const fbSharerUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentHref}`

    window.open(fbSharerUrl, '_blank', 'noreferrer')
  }

  return (
    <button
      onClick={handleFacebookShare}
      type="button"
      className={styles.button}
    >
      <span className="sr-only">Button for Facebook social sharing</span>
      Share to Facebook
      <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
      </svg>
    </button>
  )
}

export default SocialMediaShareButton
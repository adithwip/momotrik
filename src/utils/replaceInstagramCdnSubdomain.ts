export const replaceInstagramCdnSubdomain = (imgUrl: string) => {
  if (!imgUrl) {
    throw new Error('Please provide an image url!')
  }

  return imgUrl.replace(/^[^.]*/, 'https://scontent-lax3-2')
}

/**
 * Context about this utils:
 * https://github.com/vercel/next.js/discussions/18429#discussioncomment-989303
 */

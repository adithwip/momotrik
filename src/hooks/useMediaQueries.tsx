import { useMediaQuery } from 'react-responsive'

/**
 * Breakpoints reference:
 * https://tailwindcss.com/docs/breakpoints
 */

export const useMediaQueries = () => {
  const isMobile = useMediaQuery({ maxWidth: '767px' })
  const isDesktop = useMediaQuery({ minWidth: '768px' })

  return {
    isMobile,
    isDesktop,
  } as const
}

export const stripHtmlTags = (str: string): string => {
  const cleanStr = str.replace(/<\/?[^>]+(>|$)/g, '')

  return cleanStr
}

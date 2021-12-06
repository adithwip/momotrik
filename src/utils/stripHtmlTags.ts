export const stripHtmlTags = (str: string): string => {
  const cleanStr = str.replace(/<\/?[^>]+(>|$)/g, '').replace(/&hellip;/g, '')

  return cleanStr
}

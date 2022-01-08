export const stripHtmlTags = (str: string): string => {
  const cleanStr = str
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&hellip;/g, '')
    .replace(/&raquo/g, '')
    .replace(/Read More/g, '')

  return cleanStr
}

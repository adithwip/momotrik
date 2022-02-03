export const GTM_ID = 'GTM-P8R5FBD'

export const pageview = (url: URL) => {
  //@ts-expect-error
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  })
} 
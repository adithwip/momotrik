/**
 * We follow guides from this repo
 * Repo: https://github.com/montezume/nextjs-google-analytics
 * Medium Article: https://medium.com/frontend-digest/using-nextjs-with-google-analytics-and-typescript-620ba2359dea
 */

export const GA_TRACKING_ID = 'G-HDLMFMYRC9'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (typeof window !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

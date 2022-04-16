export const formatDate = (date: string) => {
  const event = new Date(date)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return event.toLocaleDateString('id-ID', options)
}

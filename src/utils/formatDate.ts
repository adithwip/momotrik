export const formatDate = (date: string) => {
  const event = new Date(date)

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return event.toLocaleDateString('id-ID', options)
}
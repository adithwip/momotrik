type Options = {
  year: "numeric" | "2-digit" | undefined,
  month: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined,
  day: "numeric" | "2-digit" | undefined
}

export const formatDate = (date: string) => {
  const event = new Date(date)

  const options: Options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return event.toLocaleDateString('id-ID', options)
}
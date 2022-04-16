import { formatDate } from 'utils/formatDate'

type Props = {
  date: string
}

const Date = ({ date }: Props) => {
  return (
    <time className="text-xs tracking-wide text-blue-900" dateTime={date}>
      {` ${formatDate(date)}`}
    </time>
  )
}

export default Date

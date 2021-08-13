import { formatDate } from 'utils/formatDate'

type Props = {
  date: string
}

const Date = ({ date }: Props) => {
  return (
    <p className="text-sm tracking-wide text-blue-900">
      Published:
      <time className="text-sm" dateTime={date}>
        {` ${formatDate(date)}`}
      </time>
    </p>
  )
}

export default Date

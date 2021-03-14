import { formatDate } from 'utils/formatDate'

import styles from './ArticleContent.module.css'

interface Props {
  date: string,
  authorName: string,
  title: string
}

const ArticleContent = ({ date, authorName, title }: Props) => {
  return (
    <div className={styles.articleContent}>
      <p className={styles.articleDate}>
        {`${formatDate(date)} | ${authorName}`}
      </p>
      <p className={styles.articleTitle}>
        {title}
      </p>
    </div>
  )
}

export default ArticleContent